# 📐 APEXGOV 2.0: TECHNICAL DIAGRAMS (Mermaid.js)
*Use these codes in the Mermaid Live Editor (mermaid.live) to generate high-res images for your Miro board/Deck.*

---

## 1. High-Level Architecture (The Ecosystem)
```mermaid
graph LR
    subgraph "Edge Device (Inspector)"
        U[Next.js App] --> HUD[Transparency HUD]
        U --> AD[Forensic Audit Badge]
    end

    subgraph "Sovereign AI Network (Kaggle/Ngrok)"
        F[FastAPI Gateway] --> Y[Custom YOLOv8 PPE Detector]
        F --> M[Moondream2 Vision-LLM]
        F --> RG[Regulation Engine]
    end

    subgraph "Data Layer"
        P[Punjab Building Act 2016 JSON] --> RG
    end

    U -- "HTTPS / Base64" --> F
    F -- "JSON Audit" --> U
    U -- "Generate" --> PDF[Official PDF Ticket]
```

## 2. Sequence Diagram (The Audit Cycle)
```mermaid
sequenceDiagram
    participant I as Inspector
    participant F as Frontend (Next.js)
    participant B as Backend (Sovereign AI)
    participant L as Legal DB (Punjab Code)

    I->>F: Upload Site Photo
    F->>F: Generate Forensic Hash & Metadata Check
    F->>B: Send Evidence Payload
    par Parallel Processing
        B->>B: YOLOv8 Spatial Analysis (Hazards/PPE)
        B->>B: Vision-LLM Context Reasoning
    end
    B->>L: Query Regulation Mapping (RAG)
    L-->>B: Return Clause & Fine Amount
    B-->>F: Return Structured Violation Data
    F->>I: Show Transparency HUD & Results
    F->>I: Generate PDF Ticket + Urdu Audio
```

## 3. The "Reliability" Data Flow
```mermaid
graph TD
    IN[Image Input] --> VH{Forensic Check}
    VH -- Failed --> ERR[REJECT: Suspected Fraud]
    VH -- Success --> INF[Bimodal Inference]
    INF --> CF{Confidence > 70%?}
    CF -- No --> HITL[FLAG: Manual Human Review]
    CF -- Yes --> REG[Apply Punjab Building Code]
    REG --> OUT[Issue Validated Ticket]
    
    style HITL fill:#ff9999,stroke:#333
    style OUT fill:#99ff99,stroke:#333
```
