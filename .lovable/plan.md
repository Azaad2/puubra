## Mark Categories as Coming Soon

Update the "Shop by Category" section on the homepage so **Tops**, **Pantyhose**, and **Pajama Sets** display as "Coming Soon" while **Bras** remains shoppable.

### Changes

**File: `src/components/home/FeaturedCollections.tsx`**

1. Add a `comingSoon: true` flag to the Tops, Pantyhose, and Pajama Sets entries (Bras stays clickable).
2. For coming-soon cards:
   - Render a non-clickable `<div>` instead of a `<Link>` (cursor stays default, no navigation).
   - Add a "Coming Soon" badge overlay (top-right, rose-gold/accent styling consistent with the dark luxury theme).
   - Slightly dim the image (e.g. `opacity-60`) and replace the "Shop Now →" CTA text with "Coming Soon".
   - Disable the hover scale/border effects so it reads clearly as inactive.

### Out of Scope

- The `/collections/tops`, `/collections/pantyhose`, `/collections/pajama-sets` routes still exist via `Collections.tsx`. If a user types the URL directly they'll still load. Let me know if you want those routes to also show a "Coming Soon" page — happy to add that as a follow-up.
- Header navigation links to these categories (if any) are not changed in this scope.
