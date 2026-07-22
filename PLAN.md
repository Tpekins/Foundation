# Mobile Hamburger Menu & Responsive Fixes

## Context
The website looks proper on desktop but has mobile view issues:
1. **Navigation**: Items (HOME, OUR ROOTS, INITIATIVES, FIELD LOG) wrap awkwardly on small screens - no hamburger menu exists
2. **Footer**: Columns are left-aligned on mobile instead of being properly stacked/centered

The goal is to add a hamburger menu on mobile (like Image 2 from open-dreams.org) while keeping the desktop view completely unchanged.

## Changes

### 1. Update `Header.tsx` - Add hamburger menu
**File:** `apps/frontend/src/components/Header.tsx`

- Add React state (`useState`) for menu open/close toggle
- Add a hamburger button (3-line icon) visible only on mobile (`md:hidden`)
- Hide the existing `<nav>` on mobile (`hidden md:flex`) and show it in the hamburger overlay
- Create a full-screen overlay menu that slides in when hamburger is clicked:
  - Dark/soil-colored background matching the footer
  - Navigation links stacked vertically, centered, with horizontal divider lines
  - Close (X) button in top-right corner (yellow/ochre square like Image 2)
  - Each nav link styled: uppercase, white/paper text, centered, with a thin border-bottom separator
- On desktop (`md:` and above), the header stays exactly as it is now - no changes

### 2. Update `Footer.tsx` - Fix mobile layout
**File:** `apps/frontend/src/components/Footer.tsx`

- On mobile, center-align all footer columns (currently left-aligned)
- Ensure proper spacing and stacking on small screens
- Center the copyright/tagline row on mobile

### 3. Add mobile menu animation to `index.css`
**File:** `apps/frontend/src/index.css`

- Add CSS for the mobile menu slide-in/slide-out transition (optional, can also use Tailwind)

## Files to Modify
1. `apps/frontend/src/components/Header.tsx` - Major changes (hamburger + overlay menu)
2. `apps/frontend/src/components/Footer.tsx` - Minor responsive fixes
3. `apps/frontend/src/index.css` - Only if needed for animation

## Verification
- Run `npm run dev` or `yarn dev` in the frontend directory
- Test on desktop: header and footer should look exactly the same as before
- Test on mobile (or browser DevTools responsive mode): hamburger icon appears, opens overlay menu, links work, close button dismisses menu
- Test footer on mobile: columns should be centered and properly stacked
