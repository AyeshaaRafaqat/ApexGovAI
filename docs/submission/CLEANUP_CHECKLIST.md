# 🧹 APEXGOV 2.0: FINAL SUBMISSION CLEANUP CHECKLIST
*Follow these steps before Zipping and Submitting to AWC*

---

## 1. Environment & Keys
*   [ ] **Delete `.env`**: Never ship your actual `GOOGLE_GENERATIVE_AI_API_KEY`.
*   [ ] **Create `.env.example`**: Ensure the example file has all the keys but with empty values (e.g., `KAGGLE_URL=`, `GOOGLE_GENERATIVE_AI_API_KEY=`).

## 2. Temporary Files & Logs
*   [ ] **Delete `test-results/`**: Remove any local screenshots or testing artifacts.
*   [ ] **Delete `node_modules/` & `.next/`**: These will be re-installed by the judges if they run it locally.
*   [ ] **Delete `.git/`**: Unless they asked for a Git repo link, provide a clean Zip.
*   [ ] **Check `kaggle/`**: Ensure `best.pt` is either included in a clear folder or a download link is provided in the README.

## 3. Documentation Review
*   [ ] **README.md**: Verify that the **Mermaid Diagram** and the **Intro** match our project status.
*   [ ] **Docs Folder**: Ensure `docs/submission/` contains the Pitch Deck, One-Pager, and Script.

## 4. Final Sanity Checks
*   [ ] **Build Check**: Run `npm run build` locally to ensure there are no TypeScript errors that could crash the judge's environment.
*   [ ] **Demo Assets**: Place 2-3 "Sample Test Images" in a folder called `sample_data/` so judges have something to test immediately.

## 5. Submission Final Package
*   **Zip File Name:** `ApexGov_2.0_GovTech_IndusAI2026.zip`
*   **Video Link:** Hosted on Loom or Google Drive (Ensure permissions are set to "Anyone with the link").
*   **Form Submission:** Copy-paste the answers from `FORM_ANSWERS.md`.

---
🚀 **Good luck! You are submitting a world-class AI system.**
