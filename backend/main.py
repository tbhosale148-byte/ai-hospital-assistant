import io
import os
import datetime
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from PIL import Image, ImageDraw
import numpy as np
from ultralytics import YOLO
import pydicom

# ReportLab Imports for PDF Generation
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

app = FastAPI(title="PulseAI Diagnostic Engine", version="2.0")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "yolov8n.pt"
model = YOLO(MODEL_PATH)

# In-Memory Cache for Active Scan & Detections
active_session = {
    "image_bytes": None,
    "filename": "No active scan",
    "detections": []
}

# Patient History Database (In-Memory)
records_db = [
    {
        "id": "88201",
        "filename": "Chest_XRay_Patient_A.dcm",
        "primary_findings": ["Pneumonia", "Focal Opacity"],
        "total_detections": 2
    },
    {
        "id": "88202",
        "filename": "Thoracic_CT_Scan.png",
        "primary_findings": ["Nodule"],
        "total_detections": 1
    }
]

# Imaging Library Database (In-Memory)
library_db = [
    {
        "id": "PACS-8831",
        "patient": "Eleanor Vance",
        "type": "Chest X-Ray (PA)",
        "findings": "Clear lung fields, normal cardiac silhouette",
        "date": "2026-04-12"
    },
    {
        "id": "PACS-8832",
        "patient": "Marcus Thorne",
        "type": "Brain MRI (FLAIR)",
        "findings": "Small nonspecific white matter foci",
        "date": "2026-04-14"
    }
]

# Neural Audit Database (In-Memory)
audits_db = [
    {
        "id": "AUD-901",
        "scanId": "SCAN-301",
        "model": "YOLOv8-Medical-B2",
        "confidence": "89.4%",
        "date": "2026-04-15 10:22 AM"
    },
    {
        "id": "AUD-902",
        "scanId": "SCAN-302",
        "model": "YOLOv8-Medical-B2",
        "confidence": "94.1%",
        "date": "2026-04-15 11:05 AM"
    }
]

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

def process_upload_to_pil(contents: bytes, filename: str) -> Image.Image:
    if filename.lower().endswith((".dcm", ".dicom")):
        dicom_data = pydicom.dcmread(io.BytesIO(contents))
        pixel_array = dicom_data.pixel_array.astype(float)
        scaled_image = (np.maximum(pixel_array, 0) / pixel_array.max()) * 255.0
        scaled_image = np.uint8(scaled_image)
        return Image.fromarray(scaled_image).convert("RGB")
    else:
        return Image.open(io.BytesIO(contents)).convert("RGB")

@app.get("/")
def read_root():
    return {"status": "PulseAI Neural Backend Online", "model": MODEL_PATH}

@app.get("/api/records")
def get_records():
    """Endpoint consumed by App.jsx to render Patient History"""
    return {"records": records_db}

@app.get("/api/library")
def get_imaging_library():
    """Endpoint for Imaging Library tab"""
    return {"library": library_db}

@app.get("/api/audits")
def get_neural_audits():
    """Endpoint for Saved Audits / Neural Audit Logs tab"""
    return {"audits": audits_db}

@app.post("/api/analyze")
async def analyze_scan(file: UploadFile = File(...)):
    valid_extensions = (".jpg", ".jpeg", ".png", ".dcm", ".dicom")
    if not file.filename.lower().endswith(valid_extensions):
        raise HTTPException(status_code=400, detail="Please upload a JPG, PNG, or DICOM file.")

    try:
        contents = await file.read()
        image = process_upload_to_pil(contents, file.filename)
        img_np = np.array(image)

        results = model(img_np)
        detections = []

        for result in results:
            boxes = result.boxes
            for box in boxes:
                coords = box.xyxy[0].tolist()
                conf = float(box.conf[0])
                cls_idx = int(box.cls[0])
                cls_name = model.names[cls_idx]

                detections.append({
                    "box": [round(c, 1) for c in coords],
                    "confidence": round(conf, 4),
                    "class": cls_name
                })

        # Cache active session data in-memory
        active_session["image_bytes"] = contents
        active_session["filename"] = file.filename
        active_session["detections"] = detections

        # Append new scan to history database automatically
        new_record = {
            "id": str(88200 + len(records_db) + 1),
            "filename": file.filename,
            "primary_findings": list(set([d["class"] for d in detections])) if detections else ["No clear pathology"],
            "total_detections": len(detections)
        }
        records_db.insert(0, new_record)

        return {
            "status": "success",
            "filename": file.filename,
            "total_detections": len(detections),
            "detections": detections
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

@app.post("/api/chat")
async def clinical_chat(request: ChatRequest):
    user_query = request.message.lower()
    if "pneumonia" in user_query:
        response = "Clinical Finding: Consolidation or focal opacity observed. Recommend sputum culture and follow-up radiograph in 4-6 weeks."
    elif "nodule" in user_query or "mass" in user_query:
        response = "Clinical Finding: Discrete focal opacity. Recommend high-resolution CT evaluation per Fleischner guidelines."
    elif "effusion" in user_query or "fluid" in user_query:
        response = "Clinical Finding: Blunting of costophrenic angle. Recommend ultrasound or lateral decubitus radiograph."
    else:
        response = f"PulseAI Decision Support: Regarding '{request.message}', correlate findings with full medical history and vital parameters."

    return {"response": response}

@app.post("/api/export-report")
@app.get("/api/export-report")
async def export_report():
    try:
        pdf_buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            pdf_buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        
        primary_color = colors.HexColor("#6B21A8")
        secondary_color = colors.HexColor("#9333EA")
        dark_neutral = colors.HexColor("#1F2937")
        light_bg = colors.HexColor("#F9FAFB")
        border_color = colors.HexColor("#E5E7EB")

        title_style = ParagraphStyle(
            'ReportTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=primary_color
        )
        
        subtitle_style = ParagraphStyle(
            'ReportSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#6B7280")
        )

        section_heading = ParagraphStyle(
            'SectionHeading',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=16,
            textColor=primary_color,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            'ReportBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=dark_neutral
        )

        body_bold = ParagraphStyle(
            'ReportBodyBold',
            parent=body_style,
            fontName='Helvetica-Bold'
        )

        story = []

        # 1. Header Banner Block
        header_data = [
            [
                Paragraph("<b>PulseAI Diagnostic Decision Support</b>", title_style),
                Paragraph(f"<b>REPORT ID:</b> #PAI-88204<br/><b>DATE:</b> {datetime.date.today().strftime('%b %d, %Y')}", subtitle_style)
            ]
        ]
        header_table = Table(header_data, colWidths=[360, 180])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ]))
        story.append(header_table)
        story.append(Spacer(1, 8))
        story.append(HRFlowable(width="100%", thickness=1.5, color=secondary_color, spaceAfter=12))

        # 2. Patient & Scan Overview Cards
        filename = active_session.get("filename", "active_session_scan.jpg")
        detections = active_session.get("detections", [])

        info_data = [
            [
                Paragraph("<b>Patient ID:</b> PT-9042", body_style),
                Paragraph(f"<b>Source File:</b> {filename}", body_style)
            ],
            [
                Paragraph("<b>Modality:</b> Radiography / DICOM", body_style),
                Paragraph(f"<b>Pathologies Detected:</b> {len(detections)}", body_style)
            ]
        ]
        info_table = Table(info_data, colWidths=[270, 270])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), light_bg),
            ('BOX', (0, 0), (-1, -1), 0.5, border_color),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 14))

        # 3. Process Image with Bounding Boxes
        story.append(Paragraph("Diagnostic Image Visualizer", section_heading))
        
        if active_session["image_bytes"]:
            raw_img = process_upload_to_pil(active_session["image_bytes"], filename)
            draw = ImageDraw.Draw(raw_img)

            for det in detections:
                box = det.get("box")
                if box and len(box) == 4:
                    draw.rectangle(box, outline="#9333EA", width=4)

            annotated_img_io = io.BytesIO()
            raw_img.save(annotated_img_io, format="JPEG")
            annotated_img_io.seek(0)

            img_flowable = RLImage(annotated_img_io, width=320, height=220)
            img_flowable.hAlign = 'CENTER'
            story.append(img_flowable)
        else:
            story.append(Paragraph("<i>No scan image active in memory for rendering.</i>", body_style))

        story.append(Spacer(1, 14))

        # 4. Neural Network Findings Table
        story.append(Paragraph("YOLOv8 Neural Network Findings", section_heading))

        table_rows = [
            [
                Paragraph("<b>Pathology Class</b>", body_bold),
                Paragraph("<b>Confidence Score</b>", body_bold),
                Paragraph("<b>Bounding Box [xmin, ymin, xmax, ymax]</b>", body_bold)
            ]
        ]

        if detections:
            for det in detections:
                box_str = f"[{', '.join(map(str, det['box']))}]" if det.get('box') else "N/A"
                conf_percent = f"{det['confidence'] * 100:.1f}%"
                table_rows.append([
                    Paragraph(det['class'], body_style),
                    Paragraph(conf_percent, body_style),
                    Paragraph(box_str, body_style)
                ])
        else:
            table_rows.append([
                Paragraph("No pathologic opacities flagged", body_style),
                Paragraph("N/A", body_style),
                Paragraph("N/A", body_style)
            ])

        findings_table = Table(table_rows, colWidths=[180, 120, 240])
        findings_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#F3E8FF")),
            ('TEXTCOLOR', (0, 0), (-1, 0), primary_color),
            ('BOX', (0, 0), (-1, -1), 0.5, border_color),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, border_color),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(findings_table)

        story.append(Spacer(1, 14))

        # 5. Disclaimer Box
        disclaimer_text = (
            "<b>Clinical Disclaimer:</b> PulseAI Decision Support Infrastructure generates probabilistic visual "
            "evaluations based on trained YOLO neural models. Results must be verified by a licensed Radiologist "
            "or qualified physician before determining diagnostic course or therapeutic intervention."
        )
        disclaimer_p = Paragraph(disclaimer_text, ParagraphStyle('Disc', parent=body_style, fontSize=8, textColor=colors.HexColor("#4B5563")))
        
        disc_table = Table([[disclaimer_p]], colWidths=[540])
        disc_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FEF3C7")),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#F59E0B")),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ]))
        story.append(disc_table)

        doc.build(story)
        pdf_buffer.seek(0)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": "inline; filename=PulseAI_Diagnostic_Report.pdf"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Generation error: {str(e)}")
    