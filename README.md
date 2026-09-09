# 🚀 SafeSkill AI: Intelligent Worker Safety & Performance Monitoring System

## Overview
SafeSkill AI is an advanced, centralized enterprise software platform designed to bridge the gap between factory floor security camera streams and production database records. Built to address critical manufacturing challenges, the system proactively combats unreported safety hazards (such as near-misses near forklift paths) and undetected skill drift (gradual drops in worker efficiency and rising error rates). By integrating real-time computer vision with machine learning risk analytics and agentic AI recommendations, SafeSkill AI transforms traditional factory monitoring into predictive worker support.  

## Core Architecture & Technology Stack
SafeSkill AI utilizes a robust, multi-layered architecture:  

* **Layer 1 (Data Ingestion):** Captures live security camera feeds, video files, and shift production data uploads.  
* **Layer 2 (Analytics Engine):** Powered by YOLOv8 vision processing and machine learning models for real-time hazard tracking and worker risk scoring.  
* **Layer 3 (Orchestration):** AI-powered assistant tools that synthesize safety and performance records to build custom training plans in under 3 seconds.  
* **Layer 4 (Application Server):** Python Flask backend managing secure REST API endpoints.  
* **Layer 5 (Storage):** Relational database storage using MySQL 8.0 / SQLite 3 alongside media file storage.  

## Key Features & Functional Modules
* **Live Safety Detection (FR-CV-01):** Automatically monitors workers, machinery, and restricted danger zones, instantly triggering alerts for rule violations (e.g., entering forbidden forklift routes).  
* **Skill & Performance Risk Prediction (FR-ML-02):** Evaluates historical work logs to assign comprehensive worker Risk Scores ranging from 0.0 to 1.0.  
* **AI Action Recommendations (FR-AG-03):** Dynamically merges safety incident logs with productivity metrics to generate personalized remediation and training strategies.  
* **Role-Based Access Control (NFR-SEC-03):** Secures employee records and sensitive camera clips across dedicated user classes including Safety Managers, Plant Operations Managers, and HR Training Specialists.
