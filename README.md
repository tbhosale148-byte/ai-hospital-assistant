# PulseAI

## AI-Assisted Medical Imaging & Clinical Decision Support System

> **Academic / Demonstration Prototype:** PulseAI is an AI-assisted medical imaging and clinical decision-support prototype. It is **not a clinically validated autonomous diagnostic product**. All AI-generated outputs must be treated as decision support and reviewed by an appropriately qualified clinician.

---

## Table of Contents

* [Overview](#overview)
* [Project at a Glance](#project-at-a-glance)
* [Problem Statement](#problem-statement)
* [Proposed Solution](#proposed-solution)
* [Objectives](#objectives)
* [Features](#features)
* [System Architecture](#system-architecture)
* [Methodology & Working](#methodology--working)
* [Computer Vision & AI Detection](#computer-vision--ai-detection)
* [Core Modules](#core-modules)
* [Technology Stack](#technology-stack)
* [API Reference](#api-reference)
* [Data Design](#data-design)
* [User Workflow](#user-workflow)
* [Clinical Guidance](#clinical-guidance)
* [PDF Reporting](#pdf-reporting)
* [Risk Analysis & Incident Management](#risk-analysis--incident-management)
* [Testing & Validation](#testing--validation)
* [Security, Privacy & Clinical Safety](#security-privacy--clinical-safety)
* [Requirements Traceability](#requirements-traceability)
* [Getting Started](#getting-started)
* [Advantages](#advantages)
* [Known Limitations](#known-limitations)
* [Future Scope](#future-scope)
* [Future Agentic Architecture](#future-agentic-architecture)
* [Documentation](#documentation)
* [Project Presentation & Viva](#project-presentation--viva)
* [Disclaimer](#disclaimer)
* [Conclusion](#conclusion)

---

# Overview

**PulseAI** is a browser-based AI-assisted medical imaging prototype designed to demonstrate how Computer Vision and Artificial Intelligence can be integrated into a clinician-oriented radiology workflow.

The system provides a unified workspace for:

* Medical image upload
* DICOM / raster image processing
* YOLOv8-based visual inference
* Bounding-box visualization
* Structured detection results
* Prototype patient records
* Imaging library
* Neural inference audit views
* Clinical guidance
* Inference settings
* PDF report generation

PulseAI follows a **client-server architecture**, separating the user interface from image processing and AI inference.

### Frontend

The React frontend manages:

* Landing page
* Login/application state
* Navigation
* Scan workspace
* Image preview
* File intake
* API communication
* Detection visualization
* Patient records
* Imaging library
* Audit views
* Inference settings
* Clinical assistant interface
* PDF report download

### Backend

The Python FastAPI backend manages:

* File validation
* DICOM processing
* Raster image processing
* RGB conversion
* YOLOv8 inference
* Detection result generation
* Active-session state
* Prototype records
* Imaging library data
* Audit information
* Clinical guidance endpoint
* PDF report generation

The supplied implementation uses `yolov8n.pt` through Ultralytics YOLO and currently stores runtime data in Python lists and dictionaries.

> **Implementation Accuracy Note:** The current `/api/chat` implementation is keyword-based. It is **not a true Retrieval-Augmented Generation (RAG) or external LLM pipeline**. Similarly, UI presentation metrics or compliance claims should not be interpreted as validated clinical results.

---

# Project at a Glance

| Dimension                      | Detail                                                    |
| ------------------------------ | --------------------------------------------------------- |
| **Project Name**               | PulseAI                                                   |
| **Domain**                     | Medical Imaging / Radiology Decision Support              |
| **Project Type**               | Academic / Demonstration Prototype                        |
| **Core AI**                    | YOLOv8 Object Detection                                   |
| **Current Model File**         | `yolov8n.pt`                                              |
| **Input Formats**              | JPG, JPEG, PNG, DCM / DICOM-compatible extensions         |
| **Output**                     | Classes, confidence values, bounding boxes and PDF report |
| **Frontend**                   | React                                                     |
| **Backend**                    | Python FastAPI                                            |
| **Image Processing**           | pydicom, Pillow, NumPy                                    |
| **Visualization**              | Browser Canvas                                            |
| **Clinical Guidance**          | Keyword-based guidance endpoint                           |
| **PDF Generation**             | ReportLab                                                 |
| **Current Storage**            | In-memory Python lists / dictionaries                     |
| **API Communication**          | HTTP / JSON / multipart form-data                         |
| **Primary Demonstration User** | Clinician / Radiologist role                              |
| **Deployment**                 | Local development environment                             |

---

# Problem Statement

Medical imaging workflows can involve several repeated activities, including:

* Reviewing medical scans
* Identifying visual findings
* Recording observations
* Consulting contextual information
* Maintaining case records
* Reviewing previous imaging
* Preparing diagnostic-style reports

These activities create opportunities for software assistance while keeping final clinical interpretation and responsibility with qualified professionals.

### Problem

> **How can Artificial Intelligence and Computer Vision assist medical imaging workflows by automating repetitive analysis and documentation tasks while keeping the final clinical decision with qualified professionals?**

PulseAI addresses this problem by combining image processing, AI detection, visualization, clinical guidance, record management, auditing and reporting into one application.

---

# Proposed Solution

PulseAI provides a unified clinical-style workspace containing:

* Scan Workspace
* YOLOv8 Vision Model
* Detection Visualization
* Patient Records
* Imaging Library
* Neural Inference Audit Logs
* Clinical Guidance Assistant
* Inference Settings
* PDF Report Export

A selected scan is sent from the React frontend to the FastAPI backend.

The backend:

1. Validates the uploaded file.
2. Determines whether it is a DICOM or raster image.
3. Processes the image.
4. Converts supported image data into an RGB representation.
5. Runs YOLOv8 inference.
6. Extracts classes, confidence values and coordinates.
7. Stores the active scan session.
8. Adds a prototype record.
9. Returns structured detection data.
10. Displays the findings in the browser.
11. Allows clinical guidance queries.
12. Generates an annotated PDF report.

---

# Objectives

The primary objectives of PulseAI are:

### 1. Clinical-Style Interface

Provide an intuitive and professional dashboard inspired by medical imaging workflows.

### 2. Medical Image Intake

Allow users to upload common raster images and DICOM/DICOM-compatible files.

### 3. DICOM Processing

Read DICOM pixel data using `pydicom` and convert it into a representation compatible with the current image-processing pipeline.

### 4. AI-Based Detection

Run YOLOv8 object detection on processed images.

### 5. Visual Localization

Display detected findings using bounding boxes rather than returning text labels alone.

### 6. Structured Findings

Expose:

* Detection class
* Confidence score
* Bounding-box coordinates
* Filename
* Detection count

### 7. Data Management

Provide prototype:

* Patient records
* Imaging library
* Audit views

### 8. Clinical Guidance

Provide finding-related guidance through the current keyword-based chat endpoint.

### 9. Automated Reporting

Generate an annotated PDF report containing scan information and detected findings.

### 10. Future Expansion

Provide a modular foundation for:

* Medical model training
* Persistent databases
* True RAG
* LLM integration
* Agentic workflows
* Authentication
* Clinical validation
* Production deployment

These objectives align with the supplied project documentation.

---

# Features

## 1. Landing Page

The landing page provides:

* PulseAI branding
* Project introduction
* AI-assisted radiology positioning
* Feature cards
* Workflow explanation
* Launch Clinical Portal action

---

## 2. Login Flow

The application supports a login-oriented interface and maintains the returned user object in React application state.

> The supplied implementation should not be considered production-grade authentication.

---

## 3. Scan Workspace

The Scan Workspace provides:

* Image upload
* Drag-and-drop styled interface
* Local preview
* Sample scan loading
* YOLOv8 analysis
* Processing indicator
* Error handling
* Detection visualization
* Detection cards
* Clinical assistant

---

## 4. Multiple Image Formats

Supported input formats include:

```text
.JPG
.JPEG
.PNG
.DCM
.DICOM-compatible files
```

Unsupported extensions are rejected by the backend.

---

## 5. DICOM Support

PulseAI uses:

```text
pydicom
```

to read DICOM pixel data.

The extracted pixel data is converted into an image representation suitable for the current inference workflow.

---

## 6. YOLOv8 Detection

The backend loads the supplied YOLO model through Ultralytics.

Current model:

```text
yolov8n.pt
```

The model produces:

* Class indices
* Confidence values
* Bounding-box coordinates

Class indices are mapped to class names through:

```python
model.names
```

---

## 7. Bounding-Box Visualization

Detection coordinates returned by the backend are mapped from the image's natural dimensions to the displayed browser dimensions.

The React frontend uses **Canvas** to render:

* Bounding rectangles
* Detection areas
* Finding information

---

## 8. Patient Records

The application exposes prototype patient/scan history through:

```text
GET /api/records
```

Records currently exist only in memory.

---

## 9. Imaging Library

The imaging library provides demonstration cases and imaging information.

Endpoint:

```text
GET /api/library
```

---

## 10. Neural Inference Audit

The audit section provides demonstration model/inference metadata.

Endpoint:

```text
GET /api/audits
```

The current audit implementation is prototype-level and does not provide a complete production audit system.

---

## 11. Clinical Assistant

The Clinical Assistant accepts finding-related questions.

Examples include:

```text
pneumonia
nodule
mass
effusion
fluid
```

The current backend uses keyword-based response logic.

It does **not** currently implement:

* Vector database
* Embeddings
* Document retrieval
* External LLM
* True RAG

---

## 12. PDF Report Generation

PulseAI can generate an annotated PDF containing:

* PulseAI title
* Report ID
* Date
* Patient ID
* Source filename
* Modality
* Detection count
* Annotated image
* Findings table
* Confidence values
* Bounding-box coordinates
* Clinical disclaimer

---

## 13. Inference Settings

The frontend provides:

* Confidence Cutoff Threshold
* NMS IoU Overlap Threshold

However, in the supplied implementation these values are stored and displayed in React state but are **not passed to the backend YOLO inference call**.

Therefore, they are currently UI controls rather than active model configuration.

---

# System Architecture

PulseAI follows a layered client-server architecture.

```text
                         PULSEAI SYSTEM
                              |
                              v
                    +--------------------+
                    |   React Frontend   |
                    +--------------------+
                              |
                     HTTP / JSON /
                  Multipart Form Data
                              |
                              v
                    +--------------------+
                    |   FastAPI Backend  |
                    +--------------------+
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
          pydicom          Pillow          NumPy
              |               |               |
              +---------------+---------------+
                              |
                              v
                    +--------------------+
                    |      YOLOv8        |
                    |   Object Detection |
                    +--------------------+
                              |
                              v
                    Detection JSON
                              |
                              v
                    +--------------------+
                    |   React Canvas     |
                    | Visualization      |
                    +--------------------+
                              |
                 +------------+------------+
                 |            |            |
                 v            v            v
             Findings     Guidance      Records
                 |            |            |
                 +------------+------------+
                              |
                              v
                       PDF Reporting
```

The technical design document describes the architecture as React → HTTP/JSON/multipart → FastAPI → pydicom/Pillow/NumPy → YOLOv8 → detection JSON → Canvas visualization → user review/report export.

---

# Methodology & Working

## Step 1 — User Opens PulseAI

The user opens the browser-based PulseAI interface.

The landing page introduces:

* Project purpose
* AI functionality
* Clinical decision-support positioning
* Available modules

---

## Step 2 — Launch Clinical Portal

The user enters the main application workspace.

The dashboard provides navigation to:

```text
Workspace
Neural Models
Records
Imaging Library
Audits
Settings
```

---

## Step 3 — Select Medical Scan

The user selects or drag-and-drops a supported image.

The frontend creates a local browser preview using:

```javascript
URL.createObjectURL()
```

---

## Step 4 — Prepare Upload

The selected file is added to:

```javascript
FormData
```

and sent to:

```text
POST /api/analyze
```

---

## Step 5 — Validate File

The FastAPI backend checks the file extension.

Supported formats include:

```text
JPG
JPEG
PNG
DCM
DICOM-compatible extensions
```

---

## Step 6 — Process Image

For DICOM files:

```text
DICOM
 ↓
pydicom
 ↓
Pixel Array
 ↓
NumPy
 ↓
RGB Representation
```

For raster images:

```text
JPG / PNG
 ↓
Pillow
 ↓
NumPy
 ↓
RGB Representation
```

---

## Step 7 — Run YOLOv8

The processed image is passed to the supplied YOLOv8 model.

The model returns:

```text
Bounding Boxes
Confidence Values
Class IDs
```

---

## Step 8 — Map Classes

Class IDs are mapped using:

```python
model.names
```

This produces structured detection information.

---

## Step 9 — Store Active Session

The backend stores:

* Image bytes
* Filename
* Detection results

inside the current active session.

---

## Step 10 — Store Prototype Record

A prototype scan record is appended to the in-memory record structure.

---

## Step 11 — Return Detection JSON

The backend returns structured information to the frontend.

Example conceptual response:

```json
{
  "status": "success",
  "filename": "sample_scan.png",
  "detection_count": 2,
  "detections": [
    {
      "class": "finding",
      "confidence": 0.89,
      "bbox": [120, 80, 420, 350]
    }
  ]
}
```

The exact response structure should be verified against the current source implementation before treating the example as an API contract.

---

## Step 12 — Visualize Findings

The React frontend receives the coordinates and draws them over the image using Canvas.

---

## Step 13 — Clinical Guidance

The user can enter a finding-related question.

The backend checks supported keywords and returns the corresponding guidance response.

---

## Step 14 — Review Records

The user can inspect:

* Patient history
* Imaging library
* Audit information

---

## Step 15 — Export Report

The user generates a PDF containing:

* Scan information
* Detection findings
* Confidence values
* Coordinates
* Annotated image
* Clinical disclaimer

---

# Computer Vision & AI Detection

## YOLOv8

PulseAI uses the **Ultralytics YOLOv8** framework for object detection.

The current supplied backend loads:

```text
yolov8n.pt
```

YOLO is used because object detection provides both:

1. **What was detected**
2. **Where it was detected**

This enables PulseAI to provide visual localization using bounding boxes.

---

## Detection Pipeline

```text
Input Image
     |
     v
Preprocessing
     |
     v
RGB Image
     |
     v
YOLOv8
     |
     +----------------+
     |                |
     v                v
Class ID          Bounding Box
     |                |
     v                v
Confidence       Coordinates
     |                |
     +--------+-------+
              |
              v
       Structured Result
```

---

## Detection Information

Each detection can contain:

| Field        | Description                   |
| ------------ | ----------------------------- |
| Class        | Detected object/finding class |
| Confidence   | Model confidence value        |
| Bounding Box | Detection coordinates         |
| Class ID     | Model-generated class index   |

---

## Important Model Limitation

The current model is:

```text
yolov8n.pt
```

The supplied documentation does not establish that this model has been trained or clinically validated for medical imaging.

Therefore:

> **PulseAI must not be presented as a medically validated diagnostic AI based solely on the current implementation.**

---

# Core Modules

## 1. Landing Module

Responsibilities:

* PulseAI branding
* Project introduction
* Feature presentation
* Workflow explanation
* Launch portal

---

## 2. Login Module

Responsibilities:

* Login interface
* User state
* Application access flow

Production authentication is part of future development.

---

## 3. Scan Workspace

Responsibilities:

* Upload scan
* Preview image
* Start AI analysis
* Display processing state
* Display errors
* Render bounding boxes
* Show detection cards
* Open Clinical Assistant

---

## 4. Neural Models

Provides a user-facing representation of the AI inference system and model-related information.

---

## 5. Patient Records

Provides access to prototype scan history and findings.

API:

```text
GET /api/records
```

---

## 6. Imaging Library

Provides demonstration imaging cases.

API:

```text
GET /api/library
```

---

## 7. Audit System

Displays prototype inference/audit information.

API:

```text
GET /api/audits
```

---

## 8. Clinical Assistant

Provides finding-related guidance.

API:

```text
POST /api/chat
```

Current implementation:

```text
Keyword-based logic
```

Future implementation:

```text
RAG + Vector Database + LLM
```

---

## 9. Reporting Engine

Creates annotated PDF reports using ReportLab.

API:

```text
GET/POST /api/export-report
```

---

# Technology Stack

## Frontend

| Technology                     | Purpose                 |
| ------------------------------ | ----------------------- |
| React                          | Frontend framework      |
| Lucide React                   | Icons                   |
| Framer Motion                  | UI animations           |
| Tailwind-style utility classes | Styling                 |
| Browser Canvas                 | Detection visualization |
| Fetch/API calls                | Backend communication   |

---

## Backend

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| Python         | Backend programming        |
| FastAPI        | REST-style API framework   |
| Uvicorn        | ASGI server                |
| Pydantic       | Data validation            |
| CORSMiddleware | Cross-origin configuration |

---

## Artificial Intelligence

| Technology   | Purpose                |
| ------------ | ---------------------- |
| Ultralytics  | YOLO framework         |
| YOLOv8       | Object detection       |
| `yolov8n.pt` | Current supplied model |

---

## Medical Image Processing

| Technology | Purpose                 |
| ---------- | ----------------------- |
| pydicom    | DICOM processing        |
| Pillow     | Raster image processing |
| NumPy      | Image-array processing  |

---

## Reporting

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| ReportLab         | PDF generation           |
| BytesIO           | In-memory PDF generation |
| StreamingResponse | PDF API response         |

The complete technology stack is documented in the supplied master document.

---

# API Reference

## Backend Health

```http
GET /
```

### Purpose

Checks whether the PulseAI backend is running.

### Response

Returns JSON containing backend status and model path information.

---

## Patient Records

```http
GET /api/records
```

### Purpose

Returns prototype patient/scan records.

### Output

```text
Records Array
```

---

## Imaging Library

```http
GET /api/library
```

### Purpose

Returns imaging library records.

### Output

```text
Library Array
```

---

## Audit Logs

```http
GET /api/audits
```

### Purpose

Returns neural inference audit information.

### Output

```text
Audit Array
```

---

## Analyze Scan

```http
POST /api/analyze
```

### Input

Multipart form-data containing an uploaded image.

### Supported Formats

```text
JPG
JPEG
PNG
DCM
DICOM-compatible extensions
```

### Processing

```text
Upload
 ↓
Validation
 ↓
DICOM / Raster Processing
 ↓
RGB Conversion
 ↓
YOLOv8
 ↓
Detection Results
```

### Output

Detection status containing information such as:

* Filename
* Detection count
* Class
* Confidence
* Bounding-box coordinates

---

## Clinical Chat

```http
POST /api/chat
```

### Input

JSON containing a message and optional conversation history.

### Output

A clinical-guidance response string.

### Current Implementation

The endpoint uses keyword-based logic.

It is **not currently a true RAG or LLM system**.

---

## Export Report

```http
GET /api/export-report
```

or

```http
POST /api/export-report
```

### Output

```text
application/pdf
```

The browser downloads:

```text
PulseAI_Diagnostic_Report.pdf
```

The supplied technical specification defines these API endpoints and their input/output responsibilities.

---

# Data Design

## Active Session

The active scan is maintained in memory.

Conceptual structure:

```text
active_session
├── image_bytes
├── filename
└── detections
```

---

## Prototype Record

Example:

```text
id
filename
primary_findings
total_detections
```

Example:

```text
ID: 88201
Filename: Chest_XRay_Patient_A.dcm
Primary Findings: Pneumonia; Focal Opacity
Total Detections: 2
```

---

## Imaging Library Record

Example:

```text
id
patient
type
findings
date
```

---

## Audit Record

Example:

```text
id
scanId
model
confidence
date
```

The master documentation provides example runtime objects for active sessions, records, imaging-library records and audit records.

---

## Current Persistence Model

The current implementation stores information using:

```text
Python Lists
Python Dictionaries
```

Therefore:

> Data is lost when the backend process restarts.

---

## Future Persistence

A production-oriented implementation should introduce:

```text
PostgreSQL / MySQL
        +
Encrypted Object Storage
        +
Controlled Retention
        +
Backup Strategy
        +
Audit Database
```

---

# User Workflow

```text
1. Open PulseAI
       ↓
2. Launch Clinical Portal
       ↓
3. Select Medical Scan
       ↓
4. Preview Scan
       ↓
5. Run YOLOv8 Analysis
       ↓
6. Backend Processes Image
       ↓
7. AI Generates Detections
       ↓
8. Display Bounding Boxes
       ↓
9. Review Class + Confidence
       ↓
10. Ask Clinical Assistant
       ↓
11. Review Records / Audit
       ↓
12. Generate PDF
       ↓
13. Download Report
```

---

# Clinical Guidance

PulseAI includes a prototype Clinical Assistant.

## Current Logic

The backend uses keyword matching.

### Pneumonia

The current response theme relates to:

* Consolidation
* Focal opacity
* Sputum culture context
* Follow-up radiograph context

### Nodule / Mass

The current response theme relates to:

* Discrete focal opacity
* High-resolution CT evaluation context

### Effusion / Fluid

The current response theme relates to:

* Costophrenic-angle blunting
* Ultrasound context
* Lateral-decubitus imaging context

### Other Queries

A general response recommends correlation with:

* Clinical history
* Vital parameters
* Appropriate professional assessment

---

## Current RAG Status

The interface may describe a Clinical RAG Agent or RAG Context Engine, but the supplied backend currently contains:

```text
NO Vector Database
NO Embedding Model
NO Document Retriever
NO External LLM
```

Instead, the current implementation uses:

```text
Keyword-Based Logic
```

True RAG is future scope.

---

# PDF Reporting

PulseAI provides automated diagnostic-style PDF generation.

## Report Generation Pipeline

```text
Active Scan
     |
     v
BytesIO Buffer
     |
     v
ReportLab Document
     |
     v
PulseAI Header
     |
     v
Patient / Scan Information
     |
     v
Annotated Image
     |
     v
Findings Table
     |
     v
Clinical Disclaimer
     |
     v
PDF Response
```

---

## Report Contents

The generated report contains:

* PulseAI title
* Report ID
* Current date
* Patient ID
* Source filename
* Modality
* Detection count
* Annotated scan
* Pathology/finding class
* Confidence
* Bounding-box coordinates
* Clinical disclaimer

---

## Download Name

```text
PulseAI_Diagnostic_Report.pdf
```

---

# Risk Analysis & Incident Management

AI-assisted medical imaging systems can introduce several risks.

## Risk 1 — False Positive

### Description

The model may identify a finding that is not actually present.

### Potential Impact

* Unnecessary investigation
* Incorrect interpretation
* Additional clinical workload

### Mitigation

* Qualified clinician review
* Medical-domain validation
* Confidence analysis
* Error analysis

---

## Risk 2 — False Negative

### Description

The model may fail to identify an actual abnormality.

### Potential Impact

Potentially significant clinical consequences.

### Mitigation

* High-quality medical datasets
* Sensitivity analysis
* External validation
* Clinician review
* Continuous model evaluation

---

## Risk 3 — Incorrect AI Output

### Description

The model can produce incorrect classes, confidence values or coordinates.

### Mitigation

* Human-in-the-loop workflow
* Model testing
* Structured validation
* Clear uncertainty handling

---

## Risk 4 — Data Loss

### Description

Current records are stored only in memory.

### Impact

Data is lost after backend restart.

### Mitigation

Future:

```text
Persistent Database
+
Backup
+
Retention Policy
```

---

## Risk 5 — Unauthorized Access

### Description

The current prototype does not demonstrate production-grade authentication and authorization.

### Mitigation

Future:

```text
Authentication
RBAC
HTTPS
Encrypted Storage
Session Management
```

---

## Risk 6 — Unsupported Diagnosis

### Description

Users may incorrectly interpret AI output as a medical diagnosis.

### Mitigation

PulseAI explicitly positions itself as:

```text
Decision Support
```

rather than:

```text
Autonomous Diagnosis
```

---

# Testing & Validation

## Functional Test Cases

| ID    | Test                | Expected Result                                                 |
| ----- | ------------------- | --------------------------------------------------------------- |
| TC-01 | Landing page        | Page loads successfully                                         |
| TC-02 | Login flow          | User reaches application                                        |
| TC-03 | PNG upload          | Preview appears and image can be analyzed                       |
| TC-04 | JPG/JPEG upload     | Backend accepts and returns inference JSON                      |
| TC-05 | DICOM upload        | Pixel data is processed and converted to RGB                    |
| TC-06 | Unsupported format  | HTTP 400 response                                               |
| TC-07 | YOLO analysis       | Loading state and detection data appear                         |
| TC-08 | Bounding boxes      | Boxes align with displayed image                                |
| TC-09 | Records             | `/api/records` works                                            |
| TC-10 | Library             | `/api/library` works                                            |
| TC-11 | Audits              | `/api/audits` works                                             |
| TC-12 | Pneumonia chat      | Finding-specific response                                       |
| TC-13 | Generic chat        | General guidance response                                       |
| TC-14 | PDF export          | PDF downloads                                                   |
| TC-15 | Backend unavailable | API error state is displayed                                    |
| TC-16 | Threshold sliders   | UI value changes but current backend behavior remains unchanged |

These functional test cases are based on the supplied testing section.

---

# Future Medical Model Evaluation

Before any real-world clinical use, the medical model should be evaluated using appropriate metrics.

### Classification / Detection Metrics

```text
Precision
Recall
F1 Score
mAP@0.5
mAP@0.5:0.95
```

### Clinical Evaluation

Where appropriate:

```text
Sensitivity
Specificity
False Positive Rate
False Negative Rate
```

### Operational Evaluation

```text
Inference Latency
Confidence Calibration
Hardware Performance
```

### Validation

A future system should include:

* Independent external validation
* Clinician review
* Structured error analysis
* Pathology-specific evaluation
* Representative datasets

---

# Acceptance Criteria

## Frontend

All primary views should render and navigation should function.

## Input

Supported image formats should be selectable and previewable.

## AI

The backend should return YOLO detection data for compatible inputs.

## Visualization

Returned bounding boxes should appear over the displayed image.

## Assistant

The chat endpoint should return responses for supported queries.

## Reporting

The PDF endpoint should return a downloadable report.

## Safety

The clinical disclaimer should remain visible and PulseAI should not be represented as autonomous diagnosis.

---

# Security, Privacy & Clinical Safety

## Current Prototype Security Considerations

PulseAI should be used only with:

* Authorized data
* De-identified demonstration data
* Appropriate test images

Avoid using real patient information in:

* Screenshots
* GitHub repositories
* Public demonstrations
* Sample datasets

---

## Production Security Roadmap

### Authentication

Implement secure identity management.

### Authorization

Implement:

```text
Role-Based Access Control
```

for roles such as:

```text
Clinician
Administrator
Reviewer
```

### Transport Security

Use:

```text
HTTPS / TLS
```

### CORS

Restrict CORS to trusted frontend origins.

### Storage

Use:

```text
Encrypted Database
Encrypted Object Storage
```

### Upload Security

Validate:

* File type
* File content
* File size
* Malware safety

### Audit

Record:

* User
* Model version
* Timestamp
* Finding
* User action
* Report state

### Retention

Implement controlled data-retention and deletion policies.

### Privacy

Use:

* De-identification
* Minimum-necessary data handling
* Controlled access

---

## Clinical Safety

PulseAI follows a human-in-the-loop philosophy.

```text
AI Detection
      ↓
AI Output
      ↓
Human Review
      ↓
Clinical Interpretation
      ↓
Final Decision
```

AI output should never silently replace qualified clinical judgment.

The master documentation explicitly states that model outputs require qualified clinical verification and that unsupported accuracy, compliance or diagnostic-performance claims should not be made.

---

# Requirements Traceability

| Requirement        | Frontend            | Backend                         | Status                |
| ------------------ | ------------------- | ------------------------------- | --------------------- |
| Landing Page       | LandingPage         | —                               | Implemented           |
| Login / Navigation | App state + views   | —                               | Partially implemented |
| Image Upload       | ScanWorkspace       | `/api/analyze`                  | Implemented           |
| DICOM Processing   | File intake         | pydicom                         | Implemented           |
| YOLO Inference     | Run Analysis        | Ultralytics YOLO                | Implemented           |
| Detection Overlay  | Canvas              | Detection coordinates           | Implemented           |
| Patient Records    | Records View        | `/api/records`                  | Implemented           |
| Imaging Library    | Library View        | `/api/library`                  | Implemented           |
| Audit Logs         | Audit View          | `/api/audits`                   | Implemented           |
| Clinical Assistant | Chat UI             | `/api/chat`                     | Keyword-based         |
| PDF Export         | Blob Download       | ReportLab                       | Implemented           |
| Threshold Controls | React sliders       | No corresponding parameters     | UI only               |
| True RAG           | UI concept          | No retriever/vector DB/LLM      | Not implemented       |
| Medical Validation | Presentation claims | No validation dataset supplied  | Not demonstrated      |
| HIPAA/Compliance   | Presentation claim  | No compliance controls supplied | Not demonstrated      |

This traceability reflects the supplied implementation documentation rather than treating future concepts as completed functionality.

---

# Getting Started

## Prerequisites

Install:

```text
Python
Node.js
npm
Git
VS Code
```

---

# Backend Setup

Navigate to the backend directory.

Create a Python virtual environment:

### macOS / Linux

```bash
python3 -m venv venv
```

Activate:

```bash
source venv/bin/activate
```

### Windows

```powershell
python -m venv venv
```

Activate:

```powershell
venv\Scripts\activate
```

---

## Install Backend Dependencies

```bash
pip install fastapi
pip install uvicorn
pip install python-multipart
pip install pillow
pip install numpy
pip install ultralytics
pip install pydicom
pip install reportlab
```

Or install them together:

```bash
pip install fastapi uvicorn python-multipart pillow numpy ultralytics pydicom reportlab
```

---

# YOLO Model

The backend requires:

```text
yolov8n.pt
```

Place the model where the backend's configured `MODEL_PATH` can resolve it.

Example:

```text
backend/
├── main.py
├── yolov8n.pt
└── ...
```

The exact model path should match the implementation.

---

# Start FastAPI

Start Uvicorn using the Python module that contains:

```python
app = FastAPI(...)
```

Example:

```bash
uvicorn main:app --reload
```

If the backend file has another name, replace `main` accordingly.

Example:

```bash
uvicorn server:app --reload
```

The supplied documentation does not establish the exact Uvicorn module filename, so use the actual filename in your repository.

---

# Verify Backend

Open:

```text
http://127.0.0.1:8000
```

The root endpoint should report that the PulseAI Neural Backend is online.

---

# Frontend Setup

Navigate to the React frontend directory.

Install dependencies:

```bash
npm install
```

Required frontend packages include:

```text
react
lucide-react
framer-motion
```

The project also uses its configured CSS/Tailwind-style utility setup.

---

# Start Frontend

Use the npm script defined in the project's `package.json`.

Common example:

```bash
npm run dev
```

or:

```bash
npm start
```

Use the actual script provided by the repository.

---

# Local Execution Sequence

```text
1. Open project in VS Code
        ↓
2. Create Python virtual environment
        ↓
3. Activate virtual environment
        ↓
4. Install backend dependencies
        ↓
5. Place yolov8n.pt
        ↓
6. Start FastAPI
        ↓
7. Verify backend
        ↓
8. Install frontend dependencies
        ↓
9. Start React application
        ↓
10. Open browser
        ↓
11. Upload sample scan
        ↓
12. Run analysis
        ↓
13. Review detections
        ↓
14. Test assistant
        ↓
15. Export PDF
```

---

# Project Structure

A recommended logical structure is:

```text
PulseAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── yolov8n.pt
│   ├── requirements.txt
│   └── ...
│
├── docs/
│   ├── Project_Proposal.docx
│   ├── SRS.docx
│   ├── TDS.docx
│   ├── FDS.docx
│   └── Project_Report.docx
│
├── README.md
└── .gitignore
```

> Adapt the structure to the actual repository. The supplied documentation confirms the frontend/backend separation but does not prescribe every physical folder or filename.

---

# Advantages

PulseAI provides several advantages as an academic prototype.

### 1. Unified Workspace

Multiple workflow functions are available in one application.

### 2. AI-Assisted Analysis

YOLOv8 provides automated object-detection output.

### 3. Visual Explainability

Bounding boxes help visualize where the model detected an object.

### 4. DICOM Support

The application demonstrates medical-image-specific file handling.

### 5. Structured API

Frontend and backend responsibilities are separated through API boundaries.

### 6. Automated Reporting

ReportLab reduces repetitive report-generation work.

### 7. Modular Architecture

Components can be replaced or upgraded independently.

### 8. Future Expandability

The architecture can evolve toward:

* Medical-domain models
* Persistent databases
* RAG
* LLMs
* Agentic AI
* Secure deployment

The documented advantages include unified workflow, local prototype feedback, DICOM/raster support, visual bounding boxes, replaceable API components and automated PDF reporting.

---

# Known Limitations

## 1. Current Model

The current model is:

```text
yolov8n.pt
```

The supplied project documentation does not establish medical-domain training or clinical validation.

---

## 2. No True RAG

The current assistant is keyword-based.

It does not currently contain:

```text
Vector Database
Embeddings
Retriever
LLM
```

---

## 3. In-Memory Storage

Records, audits and active-session information are stored in memory.

Restarting the backend removes the stored information.

---

## 4. Authentication

The current login flow should not be considered production-grade identity security.

---

## 5. Threshold Controls

Confidence and IoU sliders are currently UI-level controls and are not connected to backend inference parameters.

---

## 6. CORS

The supplied CORS configuration includes a wildcard.

Production deployment should restrict allowed origins.

---

## 7. No Persistent Patient Database

Demonstration patient/report identifiers are not connected to a persistent medical database.

---

## 8. No Clinical Validation

The current project does not demonstrate:

* Clinical validation
* Regulatory approval
* Diagnostic accuracy validation
* External medical dataset validation

---

## 9. No PACS Integration

Full PACS integration is future scope.

---

## 10. No Complete DICOM Lifecycle

The current system demonstrates DICOM pixel extraction but does not implement a complete DICOM metadata lifecycle.

These limitations are explicitly identified in the supplied master documentation.

---

# Future Scope

PulseAI can be expanded significantly.

## 1. Medical-Domain Model

Train and validate a model specifically for medical imaging.

Potential future models may be developed for appropriate datasets and pathologies.

---

## 2. Persistent Database

Replace in-memory structures with:

```text
PostgreSQL
MySQL
```

or another suitable production database.

---

## 3. True RAG

Replace keyword-based guidance with:

```text
Medical Finding
      ↓
Terminology Normalization
      ↓
Document Retrieval
      ↓
Vector Database
      ↓
Grounded LLM
      ↓
Safety Validation
      ↓
Clinician Review
```

---

## 4. LLM Integration

An LLM could generate concise, evidence-grounded explanations from approved sources.

---

## 5. Agentic AI

Multiple specialized agents can manage:

* Image perception
* Clinical terminology
* Knowledge retrieval
* Reasoning
* Safety
* Reporting

---

## 6. PACS Integration

Future versions could integrate with hospital imaging systems.

---

## 7. Advanced DICOM Support

Future versions can provide complete:

* Metadata management
* Patient association
* Study management
* Series management
* Secure storage

---

## 8. Authentication & RBAC

Implement:

```text
Clinician
Radiologist
Administrator
Reviewer
```

with role-specific permissions.

---

## 9. Cloud Deployment

Future deployment could use secure cloud infrastructure with:

* HTTPS
* Containerization
* Database
* Object storage
* Monitoring
* Logging

---

## 10. Clinical Validation

Before real-world use, the system would require formal:

* Dataset validation
* Model validation
* Clinical review
* Performance evaluation
* Safety evaluation
* Regulatory assessment where applicable

---

# Future Agentic Architecture

The future PulseAI architecture can evolve into an evidence-grounded clinical AI workflow.

```text
                    Medical Scan
                         |
                         v
                +------------------+
                | Perception Agent |
                +------------------+
                         |
                         v
                +----------------------+
                | Medical YOLO Model   |
                +----------------------+
                         |
                         v
                +----------------------+
                | Finding Normalizer   |
                +----------------------+
                         |
                         v
                +----------------------+
                | Terminology Agent    |
                +----------------------+
                         |
                         v
                +----------------------+
                | Knowledge Retrieval  |
                | Agent                |
                +----------------------+
                         |
                         v
                +----------------------+
                | Medical Vector DB    |
                +----------------------+
                         |
                         v
                +----------------------+
                | Grounded LLM         |
                +----------------------+
                         |
                         v
                +----------------------+
                | Safety Agent         |
                +----------------------+
                         |
                         v
                +----------------------+
                | Human Clinical       |
                | Review               |
                +----------------------+
                         |
                         v
                +----------------------+
                | Reporting Agent      |
                +----------------------+
                         |
                         v
                  Final Report
```

---

# Agent Responsibilities

## Perception Agent

Receives and validates image/model findings.

---

## Clinical Terminology Agent

Maps raw AI classes to controlled clinical terminology.

---

## Knowledge Retrieval Agent

Retrieves approved clinical knowledge and institutional guidelines.

---

## Reasoning / Summary Agent

Creates a concise explanation grounded in retrieved evidence.

---

## Safety Agent

Checks:

* Unsupported claims
* Uncertainty
* Clinical framing
* Safety constraints

---

## Reporting Agent

Creates a structured report draft.

---

## Human-in-the-Loop

The clinician reviews:

* AI findings
* Retrieved evidence
* Generated explanation
* Report draft

and can:

```text
Accept
Edit
Reject
Correct
Approve
```

The future architecture is designed around traceability:

```text
Model Finding
      ↓
Retrieved Evidence
      ↓
Generated Response
      ↓
Human Approval
```

The master documentation specifically defines this future architecture and emphasizes that agentic automation must assist rather than silently replace clinical judgment.

---

# Documentation

The PulseAI project documentation can be organized into the following deliverables.

## Project Proposal

Contains:

* Problem statement
* Motivation
* Objectives
* Scope
* Feasibility
* Expected outcomes

---

## SRS — Software Requirements Specification

Contains:

* Product perspective
* User classes
* Functional requirements
* Non-functional requirements
* Use cases

---

## TDS — Technical Design Specification

Contains:

* Architecture
* Frontend design
* Backend modules
* API specifications
* Processing pipeline
* PDF generation pipeline

---

## FDS — Functional Design Specification

Contains:

* Landing module
* Scan workspace
* Records
* Library
* Audits
* Model settings
* Clinical guidance

---

## Data Design

Contains:

* Active session
* Patient records
* Imaging library
* Audit records
* Persistence strategy

---

## UI / UX Design

Contains:

* Design language
* Navigation
* Dark clinical dashboard
* Interaction flow
* Screen order
* User journey

---

## Testing & Validation

Contains:

* Functional test cases
* Acceptance criteria
* Future medical-model metrics
* Validation requirements

---

## Project Report

Contains:

* Introduction
* Existing system
* Proposed system
* Technology stack
* Advantages
* Limitations
* Future scope
* Conclusion

---

## Security & Clinical Safety

Contains:

* Privacy
* Authentication
* Authorization
* HTTPS
* CORS
* Storage
* Audit
* Retention
* Clinical governance

---

# Project Presentation & Viva

## Recommended 5-Minute Demonstration

### 0:00–0:40 — Landing Page

Explain:

> "PulseAI is an AI-assisted medical imaging and clinical decision-support prototype designed to demonstrate how Computer Vision can support a radiology workflow."

---

### 0:40–1:10 — Dashboard

Explain:

> "The React frontend provides the clinician-facing interface and separates presentation from backend AI processing."

---

### 1:10–2:10 — Upload + Analyze

Upload a sample scan.

Explain:

> "The selected image is sent to the FastAPI backend, converted into an inference-ready representation and passed to the YOLOv8 model."

---

### 2:10–2:50 — AI Detections

Show:

* Bounding boxes
* Class
* Confidence
* Coordinates

Explain:

> "YOLOv8 returns object-detection information including the detected class, confidence and bounding-box coordinates."

---

### 2:50–3:30 — Clinical Assistant

Demonstrate a finding-related query.

Explain:

> "The current assistant is keyword-based. A true RAG architecture using approved clinical knowledge and an LLM is planned as future work."

---

### 3:30–4:10 — Records / Audit

Show:

* Patient records
* Imaging library
* Audit information

Explain:

> "These modules demonstrate traceability concepts using the current prototype's in-memory data structures."

---

### 4:10–4:40 — PDF Export

Generate the PDF.

Explain:

> "ReportLab generates an annotated diagnostic-style PDF containing the scan information, findings and clinical disclaimer."

---

### 4:40–5:00 — Future Work

Explain:

> "The next stages are medical-domain model training and validation, persistent storage, true RAG, security, auditability and formal clinical evaluation."

This presentation sequence follows the supplied project presentation guide.

---

# Viva Questions

## What is PulseAI?

PulseAI is an AI-assisted medical imaging and clinical decision-support prototype.

---

## Which AI model is used?

The supplied backend loads:

```text
yolov8n.pt
```

through the Ultralytics YOLO framework.

---

## Why YOLOv8?

YOLOv8 provides object-detection outputs including:

* Class
* Confidence
* Bounding-box coordinates

---

## What does the AI return?

The detection pipeline returns:

```text
Class
Confidence
Bounding Box
Coordinates
```

---

## How are DICOM files handled?

DICOM pixel data is extracted using:

```text
pydicom
```

and converted into an RGB representation for the current inference pipeline.

---

## Why FastAPI?

FastAPI provides a lightweight Python API layer between:

```text
React Frontend
```

and:

```text
AI / Image Processing Backend
```

---

## Why React?

React provides a component-based frontend architecture suitable for building the interactive clinical-style dashboard.

---

## Why Canvas?

Canvas allows bounding-box coordinates returned by the model to be rendered directly over the displayed image.

---

## Is PulseAI a true RAG system?

**No.**

The current assistant is keyword-based.

True RAG is future scope.

---

## Where is the data stored?

Currently in:

```text
Python Lists
Python Dictionaries
```

Data is therefore lost when the backend restarts.

---

## Can PulseAI diagnose a patient?

**No.**

PulseAI is an academic decision-support prototype. Its outputs require qualified clinical verification.

---

## What are the major limitations?

The major limitations include:

* Current generic YOLO model
* No demonstrated medical-domain training
* No clinical validation
* Keyword-based assistant
* In-memory persistence
* Non-production authentication
* UI-only threshold controls
* Development CORS configuration
* No full PACS integration

---

## How can the project be improved?

The project can be improved through:

```text
Medical Model Training
        +
Clinical Validation
        +
Persistent Database
        +
True RAG
        +
LLM
        +
Agentic Workflow
        +
Authentication
        +
RBAC
        +
Secure Storage
        +
Formal Auditing
```

---

# Disclaimer

> **PulseAI is an academic / demonstration prototype for AI-assisted medical imaging workflow research and education.**
>
> It is **not a clinically validated autonomous diagnostic system** and must not be used as a substitute for professional medical judgment.
>
> AI-generated detections, confidence scores, guidance and reports may be incorrect or incomplete.
>
> All outputs must be reviewed and independently verified by an appropriately qualified clinician.
>
> Do not use real patient information in public repositories or demonstrations unless appropriate authorization, privacy protection and applicable requirements are satisfied.
>
> No claims of diagnostic accuracy, regulatory approval, HIPAA compliance, clinical performance or autonomous diagnosis should be made without supporting evidence.

---

# Conclusion

PulseAI demonstrates an end-to-end prototype for integrating Artificial Intelligence and Computer Vision into a medical imaging workflow.

The implemented system combines:

```text
React
  +
FastAPI
  +
pydicom
  +
Pillow
  +
NumPy
  +
YOLOv8
  +
Canvas
  +
ReportLab
```

into a unified workflow.

The strongest implemented capabilities are:

* React clinical-style workspace
* Image upload
* DICOM/raster processing
* YOLOv8 inference
* Visual bounding-box rendering
* Structured detection results
* Prototype records
* Imaging library
* Audit views
* Keyword-based clinical guidance
* Automated PDF report generation

The project also provides a foundation for future development.

The major next steps are:

1. Train and validate a medical-domain AI model.
2. Implement persistent database storage.
3. Connect inference settings to the backend.
4. Replace keyword guidance with grounded RAG.
5. Integrate an appropriate LLM.
6. Implement agentic workflow components.
7. Add secure authentication and authorization.
8. Improve auditability and traceability.
9. Integrate secure medical-image infrastructure.
10. Conduct formal clinical and technical evaluation.

PulseAI should therefore be presented as:

> **An AI-assisted medical imaging and clinical decision-support prototype — not an autonomous diagnostic system.**

---

# Project Status

```text
┌──────────────────────────────────────────┐
│              PULSEAI STATUS              │
├──────────────────────────────────────────┤
│ React Frontend             IMPLEMENTED   │
│ FastAPI Backend            IMPLEMENTED   │
│ Image Upload               IMPLEMENTED   │
│ DICOM Processing           IMPLEMENTED   │
│ YOLOv8 Inference           IMPLEMENTED   │
│ Bounding Boxes             IMPLEMENTED   │
│ Patient Records            PROTOTYPE     │
│ Imaging Library            PROTOTYPE     │
│ Audit Logs                 PROTOTYPE     │
│ Clinical Assistant         KEYWORD-BASED │
│ PDF Reporting              IMPLEMENTED   │
│ Persistent Database        FUTURE        │
│ True RAG                   FUTURE        │
│ LLM Integration            FUTURE        │
│ Agentic AI                 FUTURE        │
│ Medical Validation         FUTURE        │
│ Production Security        FUTURE        │
└──────────────────────────────────────────┘
```

---

# Source & Implementation Basis

This README is based on the supplied **PulseAI Expanded Master Project Documentation**, which consolidates:

* Technical Design Specification
* Software Requirements Specification
* Functional Design Specification
* Project Proposal
* Project Report
* Data Design
* UI/UX Design
* Testing & Validation
* Future Architecture
* Security & Clinical Safety
* Requirements Traceability
* Setup & Deployment
* Presentation & Viva Guide

The documentation explicitly distinguishes between functionality confirmed in the supplied implementation and future/presentation concepts.

---

# PulseAI

### AI-Assisted Medical Imaging & Clinical Decision Support System

**Academic Prototype • Computer Vision • Medical Imaging • YOLOv8 • FastAPI • React • Clinical Decision Support**
