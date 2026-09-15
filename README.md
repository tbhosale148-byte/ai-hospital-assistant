# PulseAI

## AI-Assisted Medical Imaging & Clinical Decision Support System

> **Academic / Demonstration Prototype:** PulseAI is not a clinically validated autonomous diagnostic product. Its outputs must be treated as decision support only and reviewed by a qualified clinician.

---

## Table of Contents

- [Overview](#overview)
- [Project at a Glance](#project-at-a-glance)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Objectives](#objectives)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Methodology & Working](#methodology--working)
- [Computer Vision & AI Detection](#computer-vision--ai-detection)
- [Core Modules](#core-modules)
- [Technology Stack](#technology-stack)
- [API Reference](#api-reference)
- [Data Design](#data-design)
- [User Workflow](#user-workflow)
- [Clinical Guidance](#clinical-guidance)
- [PDF Reporting](#pdf-reporting)
- [Risk Analysis & Incident Management](#risk-analysis--incident-management)
- [Testing & Validation](#testing--validation)
- [Security, Privacy & Clinical Safety](#security-privacy--clinical-safety)
- [Requirements Traceability](#requirements-traceability)
- [Getting Started](#getting-started)
- [Advantages](#advantages)
- [Known Limitations](#known-limitations)
- [Future Scope](#future-scope)
- [Future Agentic Architecture](#future-agentic-architecture)
- [Documentation](#documentation)
- [Project Presentation & Viva](#project-presentation--viva)
- [Disclaimer](#disclaimer)
- [Conclusion](#conclusion)

---

# Overview

PulseAI is a **browser-based AI-assisted medical imaging prototype** that demonstrates how Computer Vision can be integrated into a clinician-oriented radiology workspace.

The system combines:

- Medical image upload
- DICOM / raster image processing
- YOLOv8 inference
- Visual bounding-box overlays
- Structured detection results
- Clinical guidance
- Prototype patient records
- Imaging library
- Neural inference audit views
- PDF report generation

PulseAI follows a **client-server architecture**.

### Frontend

The React frontend manages:

- User interface
- Navigation
- Scan preview
- File intake
- API communication
- Detection visualization
- Report download

### Backend

The Python FastAPI backend manages:

- File validation
- DICOM processing
- Image conversion
- YOLOv8 inference
- Detection results
- Active-session state
- Prototype records
- Clinical guidance
- Audit information
- PDF report generation

> **Implementation Accuracy Note:** The supplied backend loads `yolov8n.pt` and performs generic YOLO inference. The current `/api/chat` implementation is keyword-based and is **not a true vector-database RAG or LLM pipeline**. Any precision, compliance, or clinical-performance claims shown in UI elements are presentation elements and are not validated results.

---

# Project at a Glance

| Dimension | Detail |
|---|---|
| **Project Name** | PulseAI |
| **Domain** | Medical Imaging / Radiology Decision Support |
| **Core AI** | YOLOv8 Object Detection |
| **Input** | JPG, JPEG, PNG, DCM / DICOM-compatible extensions |
| **Output** | Classes, confidence values, bounding boxes and PDF report |
| **Frontend** | React Web Application |
| **Backend** | Python FastAPI |
| **Image Processing** | pydicom, Pillow, NumPy |
| **Visualization** | Browser Canvas |
| **Guidance** | Keyword-based clinical guidance endpoint |
| **Reporting** | ReportLab |
| **Persistence** | In-memory Python lists / dictionaries |
| **Primary Users** | Clinician / Radiologist demonstration role; Project Demonstrator |

---

# Problem Statement

Medical imaging workflows can involve repeated activities such as:

- Reviewing medical images
- Identifying visual findings
- Recording observations
- Consulting contextual information
- Maintaining case records
- Preparing reports

These activities create opportunities for software assistance while keeping clinical interpretation and responsibility with qualified professionals.

### Problem

> **How can Artificial Intelligence and Computer Vision assist medical imaging workflows by automating repetitive analysis and documentation tasks while keeping the final clinical decision with qualified professionals?**

PulseAI addresses this problem by combining image processing, AI detection, visualization, clinical guidance, record management and reporting into a single workspace.

---

# Proposed Solution

PulseAI provides a unified medical imaging workspace containing:

- Scan workspace
- YOLOv8 vision inference
- Detection visualization
- Patient records
- Imaging library
- Audit logs
- Clinical guidance assistant
- Inference settings
- PDF report export

### Overall Workflow

```text
Medical Scan
     |
     v
Image Upload
     |
     v
File Validation
     |
     v
DICOM / Raster Processing
     |
     v
RGB Image Conversion
     |
     v
YOLOv8 AI Inference
     |
     v
Detection Results
     |
     +-------------------+
     |                   |
     v                   v
Bounding Boxes       Structured Findings
     |                   |
     +---------+---------+
               |
               v
       Clinical Guidance
               |
               v
        Records / Audit
               |
               v
          PDF Report
