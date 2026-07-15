# Fix SEO for Google Indexing - Implementation Plan


**Goal:** Make all pages (Home, Our Roots, Initiatives, Field Log) properly indexed by Google with correct titles and descriptions, by fixing the SPA client-side rendering problem and correcting meta tags.

**Architecture:** The root cause is that this is a client-side rendered Vite SPA — Google sees only an empty `index.html` shell for every route. The fix is two-fold: (1) add prerendering so each route returns real HTML with correct meta tags to crawlers, and (2) fix the per-page titles and descriptions to match what the user wants.

**Tech Stack:** Vite + React 19, `vite-plugin-prerender` for static HTML generation, `react-helmet-async` for runtime meta tags, Vercel for deployment.

---

## Final Confirmed Meta Tags

| Page | Route | Title (Google) | Description (Google) |
|------|-------|----------------|---------------------|
| Home | `/` | `Tiani Pekins Foundation` | A grassroots engineering foundation in Buea, Cameroon — engineering the offline systems that keep digital literacy, agriculture, and community care running. |
| Our Roots | `/about` | `Our Roots \| Tiani Pekins Foundation` | From school construction to community teaching, donations to orphanages, and meetings with farmers — the full story of our work across communities. |
| Initiatives | `/initiatives` | `Initiatives \| Tiani Pekins Foundation` | Independent projects we've built or incubated from local gig economy platforms to smart infrastructure and offline biometric systems. |
| Field Log | `/field-log` | `Field Log \| Tiani Pekins Foundation` | Every visit, donation, and conversation — logged as it happens. Tracking community impact from Buea to the wider region. |

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `apps/frontend/package.json` | Modify | Add `vite-plugin-prerender` dependency |
| `apps/frontend/vite.config.ts` | Modify | Configure prerender plugin with all routes |
| `apps/frontend/index.html` | Modify | Update static meta tags to match Home page |
| `apps/frontend/src/pages/Home.tsx` | Modify | Fix title and description |
| `apps/frontend/src/pages/AboutUs.tsx` | Modify | Fix title to "Our Roots" and description |
| `apps/frontend/src/components/SEO.tsx` | Modify | Handle site name as title without redundancy; update Field Log description |
| `apps/frontend/src/components/FieldLog.tsx` | Modify | Update description |
| `apps/frontend/public/sitemap.xml` | No change | Already correct |
| `apps/frontend/vercel.json` | No change | SPA rewrite still works for prerendered paths |

---

### Task 1: Install Prerender Plugin

**Files:**
- Modify: `apps/frontend/package.json`

- [ ] **Step 1: Add vite-plugin-prerender dependency**

Run in `apps/frontend`:
```bash
cd apps/frontend && npm install --save-dev vite-plugin-prerender
```

This plugin generates static HTML files for each specified route at build time, so Google crawlers receive real HTML with meta tags instead of an empty shell.

- [ ] **Step 2: Verify installation**

Run:
```bash
cd apps/frontend && cat package.json | findstr prerender
```
Expected: `vite-plugin-prerender` appears in devDependencies.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/package.json apps/frontend/yarn.lock
git commit -m "chore: add vite-plugin-prerender for SEO"
```

---

### Task 2: Configure Prerender Plugin

**Files:**
- Modify: `apps/frontend/vite.config.ts`

- [ ] **Step 1: Add prerender import and configuration**

Replace the contents of `apps/frontend/vite.config.ts` with:

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import prerender from 'vite-plugin-prerender';

export default defineConfig(() => {
  return {
    root: __dirname,
    build: {
      outDir: './dist',
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      prerender({
        routes: ['/', '/about', '/initiatives', '/field-log'],
        staticDir: path.resolve(__dirname, 'public'),
        outDir: path.resolve(__dirname, 'dist'),
        baseUrl: 'https://tianipekins.org',
        prettify: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
```

**Key configuration:**
- `routes`: All 4 pages that need to be indexed
- `baseUrl`: The production domain for canonical URLs
- `outDir`: Matches the existing build output directory

- [ ] **Step 2: Verify config syntax**

Run:
```bash
cd apps/frontend && npx tsc -b --noEmit
```
Expected: No errors (or only pre-existing errors unrelated to vite.config.ts).

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/vite.config.ts
git commit -m "feat: configure prerender plugin for all routes"
```

---

### Task 3: Fix Home Page SEO

**Files:**
- Modify: `apps/frontend/src/pages/Home.tsx`
- Modify: `apps/frontend/index.html`

- [ ] **Step 1: Update Home.tsx SEO component**

In `apps/frontend/src/pages/Home.tsx`, change lines 13-17 from:

```tsx
<SEO
  title="Home"
  description="From the cocoa farm to the classroom, we're proving that technology and agriculture can grow together. Our roots, mission, and the school we built from scratch - digital literacy, agriculture, and community care."
  path="/"
/>
```

To:

```tsx
<SEO
  title="Tiani Pekins Foundation"
  description="A grassroots engineering foundation in Buea, Cameroon — engineering the offline systems that keep digital literacy, agriculture, and community care running."
  path="/"
/>
```

- [ ] **Step 2: Update index.html meta tags to match Home page**

In `apps/frontend/index.html`, update the meta tags to match what the Home page SEO component will render. This ensures Google sees consistent content even before JavaScript executes.

Replace the `<title>` tag (line 6):

```html
<title>Tiani Pekins Foundation - Ground to Signal</title>
```

With:

```html
<title>Tiani Pekins Foundation</title>
```

Replace the `<meta name="description">` tag (line 7):

```html
<meta name="description" content="A grassroots engineering foundation in Buea, Cameroon - building smart infrastructure, teaching digital literacy, and documenting community impact from ground to signal." />
```

With:

```html
<meta name="description" content="A grassroots engineering foundation in Buea, Cameroon — engineering the offline systems that keep digital literacy, agriculture, and community care running." />
```

Also update the OG title (line 16), OG description (line 17), Twitter title (line 25), and Twitter description (line 26) to match.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/src/pages/Home.tsx apps/frontend/index.html
git commit -m "fix: update Home page title and meta description for SEO"
```

---

### Task 4: Fix Our Roots Page SEO

**Files:**
- Modify: `apps/frontend/src/pages/AboutUs.tsx`

- [ ] **Step 1: Update AboutUs.tsx SEO component**

In `apps/frontend/src/pages/AboutUs.tsx`, change lines 18-22 from:

```tsx
<SEO
  title="About Us"
  description="Our roots, mission, and the school we built from scratch - digital literacy, agriculture, and community care."
  path="/about"
/>
```

To:

```tsx
<SEO
  title="Our Roots"
  description="From school construction to community teaching, donations to orphanages, and meetings with farmers — the full story of our work across communities."
  path="/about"
/>
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/AboutUs.tsx
git commit -m "fix: rename Our Roots page title from 'About Us' to 'Our Roots' and update description"
```

---

### Task 5: Fix SEO Component Title Logic

**Files:**
- Modify: `apps/frontend/src/components/SEO.tsx`

The current logic on line 30 always appends `| SITE_NAME` when a title is provided. This creates redundancy when the page title IS the site name (Home page). We need to handle this case.

- [ ] **Step 1: Update the fullTitle logic**

In `apps/frontend/src/components/SEO.tsx`, change line 30 from:

```tsx
const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Ground to Signal`;
```

To:

```tsx
const fullTitle = title
  ? title === SITE_NAME
    ? SITE_NAME
    : `${title} | ${SITE_NAME}`
  : `${SITE_NAME} - Ground to Signal`;
```

**Logic:**
- If no title → `Tiani Pekins Foundation - Ground to Signal` (fallback)
- If title equals site name → `Tiani Pekins Foundation` (no redundancy)
- If title is different → `Title | Tiani Pekins Foundation` (normal format)

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/components/SEO.tsx
git commit -m "fix: handle site name as page title without redundancy"
```

---

### Task 6: Update Field Log Description

**Files:**
- Modify: `apps/frontend/src/components/FieldLog.tsx`

- [ ] **Step 1: Update FieldLog.tsx SEO component**

In `apps/frontend/src/components/FieldLog.tsx`, change lines 275-279 from:

```tsx
<SEO
  title="Field Log"
  description="Every visit, donation, and conversation - logged as it happens. A running record of community impact in Buea, Cameroon."
  path="/field-log"
/>
```

To:

```tsx
<SEO
  title="Field Log"
  description="Every visit, donation, and conversation — logged as it happens. Tracking community impact from Buea to the wider region."
  path="/field-log"
/>
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/components/FieldLog.tsx
git commit -m "fix: update Field Log description to reflect wider regional impact"
```

---

### Task 7: Build and Verify Prerendered Output

**Files:**
- No file changes — verification only

- [ ] **Step 1: Build the project**

Run:
```bash
cd apps/frontend && npm run build
```

Expected: Build succeeds with prerender plugin generating static HTML files.

- [ ] **Step 2: Verify prerendered HTML files exist**

Run:
```bash
dir apps\frontend\dist
```

Expected to see:
- `dist/index.html` (Home page)
- `dist/about/index.html` (Our Roots page)
- `dist/initiatives/index.html` (Initiatives page)
- `dist/field-log/index.html` (Field Log page)

- [ ] **Step 3: Verify meta tags in prerendered Home page**

Run:
```bash
type apps\frontend\dist\index.html | findstr "<title>"
type apps\frontend\dist\index.html | findstr "description"
```

Expected: Correct title and description appear in the static HTML (not empty).

- [ ] **Step 4: Verify meta tags in prerendered subpages**

Run:
```bash
type apps\frontend\dist\about\index.html | findstr "<title>"
type apps\frontend\dist\about\index.html | findstr "description"
type apps\frontend\dist\initiatives\index.html | findstr "<title>"
type apps\frontend\dist\field-log\index.html | findstr "<title>"
```

Expected: Each page has its own unique title and description in the static HTML.

- [ ] **Step 5: Local preview test**

Run:
```bash
cd apps/frontend && npx vite preview
```

Then manually check `http://localhost:4173/`, `http://localhost:4173/about`, `http://localhost:4173/initiatives`, `http://localhost:4173/field-log` — each should show correct title in browser tab.

---

### Task 8: Deploy and Verify on Production

**Files:**
- No file changes — deployment and verification only

- [ ] **Step 1: Push to trigger Vercel deployment**

```bash
git push origin main
```

Wait for Vercel deployment to complete (check Vercel dashboard).

- [ ] **Step 2: Verify production HTML serves correct meta tags**

Visit each URL and view page source (Ctrl+U) to confirm the static HTML contains the correct meta tags:

- `https://tianipekins.org/` — should show "Tiani Pekins Foundation" title and description
- `https://tianipekins.org/about` — should show "Our Roots" title and description
- `https://tianipekins.org/initiatives` — should show "Initiatives" title and description
- `https://tianipekins.org/field-log` — should show "Field Log" title and description

- [ ] **Step 3: Verify Google can fetch the pages**

Use Google's Rich Results Test or URL Inspection tool in Google Search Console for each URL. The tool should now see the actual meta tags and page content.

---

### Task 9: Submit to Google Search Console for Re-indexing

**Files:**
- No file changes — Google Search Console actions only

- [ ] **Step 1: Verify sitemap is accessible**

Visit `https://tianipekins.org/sitemap.xml` — confirm it lists all 4 pages with correct URLs.

- [ ] **Step 2: Submit sitemap in Google Search Console**

1. Go to Google Search Console → Sitemaps
2. Enter `sitemap.xml` and click Submit

- [ ] **Step 3: Request indexing for each page**

In Google Search Console → URL Inspection:
1. Enter `https://tianipekins.org/` → Request Indexing
2. Enter `https://tianipekins.org/about` → Request Indexing
3. Enter `https://tianipekins.org/initiatives` → Request Indexing
4. Enter `https://tianipekins.org/field-log` → Request Indexing

- [ ] **Step 4: Monitor indexing status**

Check back in 2-3 days to verify pages appear in Google search results with correct titles and descriptions.

---

## Post-Implementation Checklist

After all tasks are complete, verify:

- [ ] Home page title shows `Tiani Pekins Foundation` in Google (no "Home", no suffix)
- [ ] Home page description: "A grassroots engineering foundation in Buea, Cameroon — engineering the offline systems that keep digital literacy, agriculture, and community care running."
- [ ] Our Roots page title shows `Our Roots | Tiani Pekins Foundation` in Google
- [ ] Our Roots page description: "From school construction to community teaching, donations to orphanages, and meetings with farmers — the full story of our work across communities."
- [ ] Initiatives page appears in Google search results with correct description
- [ ] Field Log page appears in Google search results with correct description
- [ ] No redundant "Home" or "About Us" in any page title

---

## Notes

- **Prerendering limitation:** Prerendering generates static HTML at build time. If page content changes (e.g., new field log entries), the prerendered HTML will show the content from build time. The React app will still hydrate and show fresh content to users — but crawlers see the build-time snapshot. This is acceptable for SEO since the meta tags are what matter most.
- **Vercel SPA rewrite:** The existing `vercel.json` rewrite `/(.*) -> /` will still serve the prerendered HTML files since they exist as actual files in `dist/`. The rewrite only catches routes that don't have a corresponding file.
