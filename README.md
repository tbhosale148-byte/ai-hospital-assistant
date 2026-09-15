  # PulseAI

**AI-Assisted Medical Imaging & Clinical Decision Support System**

> Academic / demonstration prototype. PulseAI is not a clinically validated autonomous diagnostic product, and outputs must be treated as decision support only, reviewed by a qualified clinician.

---

## Overview

PulseAI is a browser-based AI-assisted medical imaging prototype that demonstrates how computer vision can be integrated into a clinician-oriented radiology workspace. It combines image upload, DICOM/raster processing, YOLOv8 inference, visual bounding-box overlays, structured detection results, a clinical guidance chat, prototype records, audit views, and PDF report export.

The system follows a client-server architecture:
- A **React** frontend manages the UI, navigation, scan preview, API communication, and report download.
- A **Python FastAPI** backend receives uploaded files, converts them into an inference-ready representation, runs the supplied YOLO model, stores active-session information in memory, responds to guidance requests, and generates a PDF report.

> **Implementation accuracy note:** the backend loads `yolov8n.pt` and performs generic YOLO inference. The `/api/chat` logic is keyword-based, not a true vector-database RAG or LLM pipeline. UI claims such as precision or compliance metrics are presentation elements and are not substantiated by the supplied code — they should not be presented as validated results.

## Project at a Glance

| Dimension | Detail |
|---|---|
| Domain | Medical imaging / radiology decision support |
| Core AI | YOLOv8 object detection |
| Input | JPG, JPEG, PNG, DCM/DICOM-compatible extensions |
| Output | Classes, confidence values, bounding boxes, PDF report |
| Frontend | React web application |
| Backend | FastAPI REST-style service |
| Image Processing | pydicom, Pillow, NumPy, Canvas |
| Guidance | Keyword-based clinical guidance endpoint |
| Persistence | Prototype in-memory lists/dictionaries |
| Primary Users | Clinician/radiologist demonstration role; project demonstrator |

## Features

- **Landing module** — product positioning, feature cards (YOLOv8 Vision Model, Clinical RAG Agent concept, Audit Export Engine), and workflow overview.
- **Scan workspace** — upload/drag-and-drop intake, quick-load sample X-ray/CT scans, YOLOv8 analysis, Canvas overlay visualization, detection cards, and a clinical assistant chat with suggested questions.
- **Records, library and audit views** — patient diagnostic history, imaging library, and neural inference audit logs, each backed by a dedicated API endpoint.
- **Model configuration panel** — confidence cutoff and NMS IoU overlap threshold sliders (currently UI-only; not yet wired to backend inference parameters).
- **PDF export** — generates an annotated, diagnostic-style report with findings table and clinical disclaimer.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React |
| UI / Icons | Lucide React |
| Animation | Framer Motion |
| Styling | Tailwind-style utility classes in JSX |
| Backend Framework | FastAPI |
| Language | Python |
| Deep Learning | Ultralytics YOLOv8 |
| Image Processing | Pillow, NumPy |
| Medical Imaging | pydicom |
| PDF | ReportLab |
| API Transport | HTTP/JSON + multipart form-data |
| Current Persistence | In-memory lists/dictionaries |

## Architecture

```
React Browser → HTTP / JSON / multipart-form data → FastAPI Backend →
pydicom / Pillow / NumPy → YOLOv8 → Detection JSON → React Canvas →
User Review → PDF Export
```

**Frontend components:** `App` (landing/login/application state, navigation, records/library/audits, settings, report download) · `LandingPage` · `ScanWorkspace` (intake, preview, analysis, overlays, chat) · Dashboard navigation (sidebar + main content; `DashboardLayout` is an alternate/earlier implementation).

**Backend modules:** FastAPI + CORSMiddleware · Pydantic validation and file-extension checks · pydicom (DICOM) · Pillow/NumPy (image conversion) · Ultralytics YOLO (inference) · ReportLab Platypus/StreamingResponse (PDF) · in-memory dictionaries/lists (state).

## API Reference

| Method | Endpoint | Purpose | Input / Output |
|---|---|---|---|
| GET | `/` | Backend health/status | JSON status + model path |
| GET | `/api/records` | Fetch patient history | Records array |
| GET | `/api/library` | Fetch imaging library | Library array |
| GET | `/api/audits` | Fetch inference audits | Audit array |
| POST | `/api/analyze` | Analyze uploaded scan | Multipart file → status, filename, detections |
| POST | `/api/chat` | Clinical guidance | JSON message + optional history → response string |
| GET/POST | `/api/export-report` | Generate diagnostic-style PDF | Active session → `application/pdf` |

### Scan processing pipeline

1. User selects a scan in the React workspace.
2. Frontend creates a local preview via `URL.createObjectURL()`.
3. Selected file is appended to `FormData`.
4. Frontend sends `POST /api/analyze`.
5. Backend validates the file extension.
6. DICOM files are read through pydicom; raster images are opened with Pillow.
7. Image data is normalized into RGB and converted through NumPy.
8. YOLO inference produces boxes, confidence values, and class indices.
9. Class indices are mapped through `model.names`.
10. Backend stores image bytes, filename, and detections in `active_session`.
11. A prototype record is appended to `records_db`.
12. Detection JSON is returned to the frontend.
13. Canvas scales natural image coordinates to displayed coordinates and renders overlays.

## Getting Started

### Backend requirements
- Python environment / virtual environment
- FastAPI, Uvicorn, python-multipart
- Pillow, NumPy
- Ultralytics, pydicom
- ReportLab
- YOLO model file (`yolov8n.pt`) at the path resolved by `MODEL_PATH`

### Frontend requirements
- Node.js and npm
- React project dependencies
- `lucide-react`, `framer-motion`
- Project CSS / Tailwind-style setup

### Local execution sequence

1. Open the project in your editor of choice.
2. Create / activate a Python virtual environment.
3. Install backend dependencies.
4. Place `yolov8n.pt` where the backend can resolve it.
5. Start FastAPI using the module containing `app = FastAPI(...)`.
6. Verify the root endpoint reports `PulseAI Neural Backend Online`.
7. Install frontend dependencies with `npm install`.
8. Start the React development server.
9. Ensure the frontend origin matches the backend CORS settings.
10. Open the browser and test upload → analysis → export.

> **Source-based note:** exact npm versions, `package.json` scripts, login component implementation, and the Uvicorn module filename are not fixed by this documentation — confirm those values against the actual repository before deployment.

## Advantages

- Unified clinical-style workspace.
- Fast local prototype feedback loop.
- Supports raster images and DICOM input.
- Visual explanation through bounding boxes.
- Structured API boundaries make components replaceable.
- Automated PDF export reduces repetitive documentation.
- Clear separation between frontend interaction and backend inference.

## Known Limitations

- The current model file is `yolov8n.pt`; supplied code does not document medical-domain training.
- The clinical assistant is keyword-based, not a verified RAG/LLM system.
- Records and audit information are stored only in memory (no persistent database).
- Authentication is not demonstrated as production-grade security.
- Frontend threshold sliders are not wired to backend inference parameters.
- Supplied CORS configuration includes a wildcard and should be restricted for deployment.
- Demonstration patient/report identifiers are not connected to a persistent patient database.
- This is a prototype and must not be represented as a clinically validated diagnostic product.

## Disclaimer

PulseAI is documented as an academic AI-assisted radiology workflow prototype for demonstration purposes. It is **not** a clinically validated autonomous diagnostic product. All generated findings require verification by a licensed radiologist or qualified physician before any clinical use.

## Documentation

This README is derived from the PulseAI Master Project Documentation (v2.0), which also includes the full Project Proposal, SRS, TDS, FDS, Data Design, UI/UX Design, Testing & Validation, Future Architecture, Security & Clinical Safety, Requirements Traceability, and Presentation Guide.
