# 🏛️ ApexGov: Sovereign AI for Autonomous Building Safety

**ApexGov** is a next-generation GovTech agent designed to automate building safety audits and regulatory compliance across Punjab. By combining custom-trained computer vision with localized regulatory RAG, ApexGov transforms a manual, high-friction process into a 10-second autonomous audit.

## 🚀 The Core Innovation: "Sovereign Audit"
Unlike generic AI wrappers, ApexGov uses a **Sovereign Engine Architecture**:
- **Localized Intelligence**: Our AI is mapped specifically to the **Punjab Building Code 2016**.
- **Edge Inference**: Heavy vision processing (YOLOv11) happens on a dedicated T4 GPU cluster (Sovereign Cloud), ensuring citizen data never leaves the government's perimeter.
- **Forensic Trust**: A built-in forensic layer audits image authenticity to prevent fraudulent penalty claims.

## 🛠️ Tech Stack
-   **Framework**: Next.js 15 (App Router) + Tailwind CSS (Vibe-Coded UI)
-   **Brain**: Custom YOLOv11 Model (Trained on 3k+ Safety Assets)
-   **Legal Engine**: Regulatory RAG (Retrieval-Augmented Generation) for Punjab Safety Acts
-   **Infrastructure**: Kaggle T4 GPU via Ngrok Sovereign Tunneling
-   **Evidence**: Cryptographic QR-Coded PDF Generation (html2pdf)

## 💎 Key Features
- **Transparency HUD**: Real-time "Audit Logs" that show the AI's internal reasoning—building trust between government and citizens.
- **Bimodal Verification**: Simultaneously checks for safety violations (Physics) and evidence manipulation (Forensics).
- **Compliance Certification**: Automatically issues "Compliance Badges" for safe sites, incentivizing good behavior.
- **Automatic Citations**: Generates legally-admissable PDF tickets with calculated fines in under 10 seconds.

## 🏃‍♂️ Getting Started
1. `npm install`
2. Configure `.env.local` with your Sovereign Kaggle URL.
3. `npm run dev`
4. Visit `localhost:3000` to launch the Command Center.

---
*Built for Indus AI Week by the ApexGov Team.*
