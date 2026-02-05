# Test Images for ApexGov AI Demo

## Quick Test Images (Use Right Now)

### Option 1: Google Image Search Queries
Copy these exact searches into Google Images:

1. **Fire Safety Violations**:
   - `"fire exit blocked" building pakistan`
   - `"fire extinguisher missing" construction site`
   - `"emergency exit signs" violations`

2. **Electrical Hazards**:
   - `"exposed wiring" pakistan building`
   - `"electrical spider web" lahore`
   - `"loose cables" construction site`

3. **Structural Issues**:
   - `"building cracks" lahore`
   - `"structural damage" apartment building`
   - `"spalling concrete" construction`

4. **General Construction Violations**:
   - `"construction safety violations" site:dawn.com`
   - `"building collapse" lahore investigation`
   - `"unsafe scaffolding" construction`

### Option 2: Free Stock Photo Sites

**Pexels** (pexels.com):
- Search: "construction site", "old building", "building inspection"
- Download 10-15 high-res images

**Unsplash** (unsplash.com):
- Search: "construction safety", "electrical wiring", "building damage"

### Option 3: Public Datasets

1. **OSHA Violations Database** (USA):
   - Visit: www.osha.gov
   - Search: Construction violations with photos
   - Download sample images (public domain)

2. **OpenImages Dataset**:
   - Visit: storage.googleapis.com/openimages/web/index.html
   - Search: "building", "construction", "electrical"
   - Filter: CC BY license

---

## Best Option: Take Your Own Photos (If Doing Serious Testing)

### Safe & Legal Locations in Lahore

1. **Public Streets** (Perfectly Legal):
   - **Anarkali Bazaar**: Old buildings with visible wiring
   - **Liberty Market backside**: Commercial building violations
   - **Jail Road construction sites**: Active projects (from public sidewalk)
   - **Gulberg Main Boulevard**: Mixed old/new buildings

2. **What to Photograph** (30 min walk):
   - Exposed electrical boxes on building exteriors
   - Visible cracks in building facades
   - Construction sites (from the street, don't enter)
   - Old apartment buildings with rusted fire escapes
   - Commercial buildings with blocked emergency exits (visible from outside)

3. **Photography Tips**:
   - Take photos in daylight (better AI accuracy)
   - Get clear, straight-on shots (not angled)
   - Include context (full building, not just closeup)
   - Take 3-5 photos per building (different angles)

### IMPORTANT: Safety & Ethics
- ❌ DO NOT enter private property
- ❌ DO NOT photograph people's homes (privacy)
- ✅ DO photograph commercial buildings from public spaces
- ✅ DO get permission if entering construction sites

---

## Recommended Test Set (For Hackathon Demo)

### Curated Image List (20 Photos):
1. **5 Fire Safety Issues**: Blocked exits, missing extinguishers
2. **5 Electrical Hazards**: Exposed wires, overloaded panels
3. **5 Structural Concerns**: Cracks, spalling concrete
4. **5 General Compliance**: Missing signage, unsafe scaffolding

### Where to Find Them:
- **10 from Google Images** (use searches above)
- **10 from Your Own Photos** (Lahore street walk)

### How to Organize:
Create folders:
```
test-images/
  ├── high-risk/        (Should trigger High severity)
  ├── medium-risk/      (Should trigger Medium severity)
  ├── low-risk/         (Should trigger Low severity)
  └── safe-buildings/   (Should return few/no issues - control test)
```

---

## Quick Links (Copy-Paste Ready)

**Google Image Searches**:
1. https://www.google.com/search?q=exposed+wiring+building+pakistan&tbm=isch
2. https://www.google.com/search?q=building+cracks+structural+damage&tbm=isch
3. https://www.google.com/search?q=construction+safety+violations&tbm=isch

**Stock Photos**:
1. https://www.pexels.com/search/construction%20site/
2. https://unsplash.com/s/photos/building-inspection

**Public Datasets**:
1. https://www.osha.gov/data
2. https://storage.googleapis.com/openimages/web/index.html

---

## Expected AI Results (For Testing)

### High Severity (Should Detect):
- Exposed live electrical wires
- Large structural cracks (>5mm)
- Blocked fire exits with heavy objects
- Missing fire safety equipment in commercial buildings

### Medium Severity (Should Detect):
- Loose hanging cables (may/may not be live)
- Minor cracks in non-load-bearing walls
- Rusted fire escapes
- Incomplete safety signage

### Low Severity (Should Detect):
- Dirty electrical covers
- Minor paint peeling
- Faded safety signs
- Clutter in non-emergency areas

### False Positives to Watch For (AI Mistakes):
- Decorative lighting flagged as "exposed wiring"
- Intentional architectural features flagged as "cracks"
- Art installations flagged as "hazards"

**If you see lots of false positives, update the prompt in `analyze-rag.ts` to be more careful.**

---

**Ready to test? Start with 5 Google Images, then take 5 of your own photos for authentic testing.**
