

## Plan: Fix Navigation and Scroll Behavior

### Problem Summary
When clicking navigation links (e.g., Bras, Tops, Pantyhose), the page doesn't scroll to the top. Users end up viewing the new page at the same scroll position they were on the previous page, making it seem like navigation isn't working properly.

### Root Cause
React Router doesn't automatically scroll to the top of the page when navigating between routes. This is expected behavior in single-page applications (SPAs) but creates a poor user experience for e-commerce sites where each page should start at the top.

### Solution: Add ScrollToTop Component

Create a simple component that listens for route changes and scrolls the window to the top automatically.

---

## Implementation Steps

### Step 1: Create ScrollToTop Component
Create a new file `src/components/layout/ScrollToTop.tsx` that:
- Uses React Router's `useLocation` hook to detect route changes
- Calls `window.scrollTo(0, 0)` whenever the pathname changes
- Renders nothing (returns `null`) - it's a behavior-only component

### Step 2: Add ScrollToTop to App.tsx
Import and place the `ScrollToTop` component inside the `BrowserRouter` wrapper in `src/App.tsx`, before the `Routes` component. This ensures it activates on every route change throughout the app.

### Step 3: Verify Consistent Header/Layout
Ensure all pages properly account for the sticky header:
- The header uses `sticky top-0` positioning
- Pages correctly use `pt-24` padding on their main content
- This is already in place for most pages

---

## Technical Details

**ScrollToTop Component Code:**
```text
src/components/layout/ScrollToTop.tsx

- Import useEffect from React
- Import useLocation from react-router-dom
- Get current pathname from useLocation()
- useEffect runs on pathname change
- Calls window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
- Returns null (no visual output)
```

**App.tsx Change:**
```text
Before:
<BrowserRouter>
  <AppContent />
</BrowserRouter>

After:
<BrowserRouter>
  <ScrollToTop />
  <AppContent />
</BrowserRouter>
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/layout/ScrollToTop.tsx` | Create new component |
| `src/App.tsx` | Import and add ScrollToTop component |

---

## Expected Result
After this change:
- Clicking any navigation link (Bras, Tops, Pantyhose, etc.) will immediately scroll to the top of the page
- Users will always see the page header and main content when landing on a new page
- Back/forward browser navigation will also scroll to top (consistent behavior)

