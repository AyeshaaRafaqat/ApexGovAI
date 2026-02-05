# ⚙️ APEXGOV 2.0: TECH DEPLOYMENT GUIDE
*Locking the system for the Indus AI Week Judges*

## 1. Frontend Deployment (Vercel)
*   **Status**: Mandatory for "Live Product" credibility.
*   **Steps**:
    1.  Push your code to GitHub.
    2.  Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
    3.  Import your GitHub repo.
    4.  **Environment Variables**: Add your `NEXT_PUBLIC_...` variables (Location, etc.). 
    5.  **Crucial**: Add `KAGGLE_URL` as an env variable so the deployed app knows where the brain is.

## 2. Sovereign AI Bridge (Kaggle + Ngrok)
*   **Status**: Demo Critical.
*   **Steps**:
    1.  Ensure your Kaggle Notebook is running Cell 2 (Server) and Cell 3 (Ngrok).
    2.  Copy the Ngrok URL (e.g., `https://...ngrok-free.app`).
    3.  If this link changes, you MUST update the Vercel Env Variable and re-deploy (or use a local fallback demo for the video).

## 3. High-Performance Determinism
*   **Status**: Rubric Focus (Robustness).
*   **Action**: Ensure `src/app/actions/analyze-rag.ts` has:
    ```typescript
    temperature: 0.1,
    topP: 0.3,
    ```
    This prevents the AI from "yapping" and keeps it focused on building regulations.

## 4. Demo Mode Toggles
*   **Action**: If the Kaggle GPU is crowded, use the `demoScenario` state we added to show the "Winning" PPE violation detection instantly.
