# ApexGov AI - Architecture & Technology Stack

## Executive Summary
ApexGov AI is designed as a **high-speed, mobile-first Safety Wrapper** for citizen reporting. The architecture prioritizes **latency (Demo Momentum)**, **accessibility (Mobile/Urdu)**, and **zero-cost deployment** (Hackathon constraints).

## Technology Stack & Rationale

### 1. Framework: Next.js 14+ (App Router)
*   **Why**: Industry standard for modern React. The **App Router** allows us to use **React Server Components (RSC)**.
*   **Benefit**: We can render the initial UI instantly while streaming the heavy AI analysis results. It eliminates the need for a separate backend server (Node/Python), as we can run backend logic in "Server Actions".

### 2. Styling: Tailwind CSS v4
*   **Why**: The "Mobile-First" constraint.
*   **Benefit**: Standard CSS (like BEM) is slow to refactor. Tailwind allows us to build a layout that looks perfect on a phone (the primary demo device) and acceptable on desktop in minutes.
*   **Key Decision**: Using utility classes for "Glassmorphism" to give that "Premium/GovTech" aesthetic without heavy assets.

### 3. AI Inference: Vercel AI SDK + Google Gemini 1.5 Flash
*   **Why**: **Speed and Cost**.
    *   **Vercel AI SDK**: Provides a unified way to handle "streaming" text to the UI. It manages the complex state of a chat/completion stream automatically.
    *   **Gemini 1.5 Flash**: It is currently the *fastest* and *cheapest* (Free Tier available) multimodal model good enough for vision analysis. GPT-4o is expensive; local models are too slow for a browser demo.
*   **Logic**: The user takes a photo -> Browser compresses it -> Sends to Server Action -> Server sends to Gemini -> Gemini streams text back -> UI updates token-by-token. This feels "alive" compared to a spinning loader.

### 4. Database: Supabase (PostgreSQL + pgvector)
*   **Why**: We need to store reports and acts/regulations for RAG (Retrieval Augmented Generation).
*   **Benefit**: Supabase provides a full Postgres DB for free. `pgvector` allows us to search for "Fire safety regulations" that match the *meaning* of the image analysis, not just keywords.

### 5. Client-Side Generation: `html2pdf.js` & `qrcode.react`
*   **Why**: Reliability.
*   **Logic**: Instead of generating PDFs on the server (which can timeout or require paid libraries like Puppeteer), we render the ticket as HTML on the user's phone and "screenshot" it into a PDF using JavaScript. This works offline and costs nothing.

## Architectural Flow (The "Narrow Slice")

1.  **Frontend (Client)**: User opens app. `ImageUploader` component accesses Native Camera via `<input type="file" capture="environment">`.
2.  **Submission**: Image is converted to Base64 and sent to `analyzeImage` (Server Action).
3.  **Backend (Server Action)**:
    *   **Step A (Vision)**: Send image to Gemini. Prompt: "Identify safety hazards."
    *   **Step B (RAG - *Coming Soon*)**: Take hazards -> Search Supabase for matching Punjab Regulations -> Append specific laws to the prompt.
    *   **Step C (Response)**: Stream the structured JSON (Issues, Confidence, Urdu Summary) back to client.
4.  **Frontend (Display)**: `ReportView` parses the JSON stream.
    *   Displays hazards with red/orange warnings.
    *   Shows logic: "Why is this unsafe?"
5.  **Action**: "Download Ticket" button renders a hidden HTML template with the data and downloads it immediately.

## Directory Structure Logic
*   `src/app/actions`: Backend logic (keeping it away from clean UI code).
*   `src/components/features`: Feature-based grouping (Camera, Report) makes it easy to delete/swap features without breaking the whole app.

## 🚀 Resilience Strategy (The "Nuclear" Fix)

### Hydration & SSR Handling
To prevent **Hydration Mismatches** caused by browser extensions (like Dark Reader) or undefined client APIs (`localStorage`, `geolocation`), we implemented a **Client-Side Only (CSO)** rendering strategy for interactive components:

```tsx
const ImageUploader = dynamic(
  () => import('@/components/features/Camera/ImageUploader'),
  { ssr: false } // Completely bypass server rendering
);
```

**Why this wins hackathons**:
1.  **Zero server-client mismatches**: The server sends a blank loader; the client renders the full app.
2.  **Robustness**: Browser extensions modifying the DOM can't break the app because hydration is skipped.
3.  **Speed**: Initial HTML payload is tiny.

### Rate Limit Architecture
*   **Client**: `localStorage` tracks usage (Token Bucket algorithm).
*   **Bypass**: `DEV_MODE` flag allows 999 uploads/day for development, defaulting to 3/day for production.
*   **Security**: Server-side validation (Supabase) acts as the real enforcement (planned for V2).
