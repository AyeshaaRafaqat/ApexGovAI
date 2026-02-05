# Testing Checklist & Launch Plan

## IMMEDIATE TESTING (Next 2 Hours)

### Test 1: Upload Flow
- [ ] Open http://localhost:3000
- [ ] Click "Tap to Scan"
- [ ] Upload test image
- [ ] **Expected**: Preview shows, location badge appears, "Analyze" button enabled
- [ ] **If fails**: Check console errors, verify location permissions

### Test 2: Analysis Accuracy
**Test Images** (Download these):
1. Google: "exposed wiring pakistan building" → Save first result
2. Google: "building cracks structural" → Save first result
3. Google: "fire exit blocked" → Save first result

**For Each Image**:
- [ ] Upload → Click Analyze
- [ ] Wait 3-10 seconds
- [ ] **Check**:
  - Confidence score shows (0-100%)
  - At least 1 issue detected
  - Urdu summary appears
  - Regulation citation included (e.g., "Punjab Fire Safety Ordinance 2016")
- [ ] **Record**: Issue title, severity, accuracy (is it correct?)

**Success Criteria**: 
- ✅ 70%+ accuracy on obvious violations
- ✅ No crashes
- ✅ Urdu text displays properly

### Test 3: PDF Generation
- [ ] After analysis, click "Download Official Ticket"
- [ ] **Expected**: PDF downloads with:
  - Ticket ID
  - QR code
  - Violations table
  - Urdu summary
- [ ] **If fails**: Check console, try different browser

### Test 4: Security Features
- [ ] Upload same image 4 times
- [ ] **Expected**: 4th upload shows "Upload limit reached" error
- [ ] Clear browser storage: `localStorage.clear()` in console
- [ ] Try again → Should work

### Test 5: Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (mobile view)
- [ ] **Check**:
  - Camera button is large enough to tap
  - Text is readable
  - No horizontal scroll
  - Buttons don't overlap

---

## DEPLOYMENT TESTING (Before Submission)

### Step 1: Deploy to Vercel
```bash
# In your project folder
npm install -g vercel
vercel login
vercel --prod
```

**Expected output**: 
```
✅ Deployed to https://apex-gov-xyz.vercel.app
```

### Step 2: Test Live URL
- [ ] Open deployed URL on phone
- [ ] Try camera capture (not just upload)
- [ ] **Expected**: Native camera opens
- [ ] Take photo of your desk → Upload
- [ ] **If fails**: Check Vercel logs

### Step 3: Environment Variables
- [ ] In Vercel dashboard, add:
  - `GOOGLE_GENERATIVE_AI_API_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL` (if using)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Redeploy: `vercel --prod`

---

## STRESS TESTING (Optional but Recommended)

### Test 1: Large Images
- [ ] Upload 10MB image
- [ ] **Expected**: Works (we set max to 10MB)
- [ ] Upload 15MB image
- [ ] **Expected**: Error "Image must be less than 10MB"

### Test 2: Concurrent Uploads
- [ ] Open 3 browser tabs
- [ ] Upload different images simultaneously
- [ ] **Expected**: All process independently
- [ ] Check API costs (Gemini dashboard)

### Test 3: Offline Behavior
- [ ] Disconnect internet
- [ ] Try to upload
- [ ] **Expected**: Clear error message (not frozen)

---

## DEMO REHEARSAL CHECKLIST

### Before the Pitch
- [ ] Charge laptop/phone to 100%
- [ ] Download backup screencast (in case live demo fails)
- [ ] Have 3 pre-selected test images ready
- [ ] Clear browser cache (fresh demo)

### During the Pitch
**Opening** (30 sec):
> "9 people died in Lahore fires last year. Buildings had violations for years but inspectors were overwhelmed. Watch this—"

**Demo** (60 sec):
1. [ ] Show homepage: "This is ApexGov AI"
2. [ ] Upload cracked building photo
3. [ ] Point to location badge: "Privacy-safe GPS fuzzing"
4. [ ] Click Analyze → Watch animated progress
5. [ ] Show violations: "See—3 High severity issues, Urdu summary, real Punjab regulations cited"
6. [ ] Download PDF: "Inspector gets this ticket with QR for Rescue 1122"

**Closer** (30 sec):
> "We're not replacing inspectors. We help them prioritize. 50,000 buildings in Lahore. 20 inspectors. We make them 40x more effective. Next: Pilot with one Union Council. Seeking Rs. 2M seed for 6-month pilot."

---

## FINAL PRE-SUBMISSION CHECKLIST

### Code Quality
- [ ] No console.errors in production build
- [ ] All TypeScript errors resolved
- [ ] `.env` file excluded from Git (check `.gitignore`)
- [ ] README.md updated with setup instructions

### Documentation
- [ ] ARCHITECTURE.md complete
- [ ] EDGE_CASES.md reviewed
- [ ] DESIGN_PATTERNS.md finalized
- [ ] TEST_IMAGES_GUIDE.md accessible

### Application Form
- [ ] Demo link added (Vercel URL)
- [ ] Pitch deck link added (Google Slides public link)
- [ ] Unique value prop finalized
- [ ] Responsible AI section complete

### Backup Plan
- [ ] Screencast recorded (2 min max)
- [ ] Screenshots saved (5-10 images)
- [ ] Offline HTML version of slide deck
- [ ] Printed handout (1-pager with QR to demo)

---

## TROUBLESHOOTING GUIDE

### "Module not found: ai/rsc"
**Solution**: We already fixed this—using `analyze-rag.ts` instead

### "Rate limit exceeded" (Gemini API)
**Solution**: 
1. Check quota in Google AI Studio
2. Use free tier quota carefully (15 requests/min)
3. Add error handling to show friendly message

### "Location not available"
**Solution**:
1. Check HTTPS (location needs secure context)
2. Allow location permissions in browser
3. Fallback: Let user manually enter area

### PDF not downloading
**Solution**:
1. Check browser popup blocker
2. Try different browser (Chrome works best)
3. Use `window.open()` alternative

### Urdu text shows as "???"
**Solution**:
1. Add Urdu font in `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
body { font-family: 'Noto Nastaliq Urdu', sans-serif; }
```

---

## SUCCESS METRICS (Track During Testing)

| Metric | Target | Actual |
|--------|--------|--------|
| Upload success rate | 95%+ | ___ |
| Analysis accuracy (obvious violations) | 70%+ | ___ |
| Analysis speed | <10 sec | ___ |
| PDF generation success | 100% | ___ |
| Mobile usability | Works on 3+ devices | ___ |
| False positive rate | <30% | ___ |

---

## POST-LAUNCH MONITORING

### Day 1-3 After Submission
- [ ] Monitor Vercel analytics (pageviews, errors)
- [ ] Check Gemini API costs
- [ ] Read judge feedback (if any)

### If Selected for Finals
- [ ] Prepare extended 10-min demo
- [ ] Practice Q&A (potential questions below)

**Potential Judge Questions**:
1. "How do you handle false positives?"
   → **Answer**: Confidence scores + inspector feedback loop
   
2. "Why won't inspectors just ignore this?"
   → **Answer**: They already use manual triage. We make it data-driven.
   
3. "What's your moat?"
   → **Answer**: Local regulation data + validated training dataset + govt partnerships
   
4. "How do you make money?"
   → **Answer**: Freemium (citizens) + B2G SaaS (Rs. 100k/month per city)
   
5. "Can this work outside Pakistan?"
   → **Answer**: Yes—Bangladesh, Sri Lanka have similar codes. Strategy pattern lets us swap regulations.

---

**START WITH TEST 1-2 NOW. Takes 30 minutes total. Report back with results!**
