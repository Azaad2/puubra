## Problem

On the product detail page, clicking a variant updates the selection (and price/title) but the main image gallery stays on whatever image the user was viewing. Users expect the gallery to jump to the image that matches the selected variant (e.g. the color they picked).

## Root Cause

In `src/pages/ProductDetail.tsx`, `selectedVariantIndex` and `selectedImage` are independent state values. There is no logic that maps a variant to its corresponding product image, so changing the variant has no visual effect on the gallery.

Shopify's Storefront API exposes the variant→image mapping via `variant.image { url, altText }` (and `id`), but our current `PRODUCT_BY_HANDLE_QUERY` (in `src/lib/shopify.ts`) does not request the `image` field on variants.

## Fix

### 1. `src/lib/shopify.ts`
- Extend `PRODUCT_BY_HANDLE_QUERY` (and optionally `PRODUCTS_QUERY`) so each variant returns its `image { url, altText }` field.
- Update the `ShopifyProduct` TypeScript interface to include the optional `image` on each variant node.

### 2. `src/pages/ProductDetail.tsx`
- When the user clicks a variant, look up the matching image in the product's `images` array (match by URL, since the Storefront API doesn't always expose image IDs on the gallery edges).
- If a match is found, call `setSelectedImage(matchedIndex)` so the gallery animates to that image.
- Fallback: if the variant has no image or no match is found, leave the current image untouched.
- Also do this on initial load: when the product first loads, if the default selected variant has an image, sync `selectedImage` to it.

### Out of scope
- No changes to cart logic, pricing, or the rest of the page.
- No changes to the collection grid (only the detail page).

## Technical Details

| File | Change |
|------|--------|
| `src/lib/shopify.ts` | Add `image { url altText }` to variants in `PRODUCT_BY_HANDLE_QUERY`; update `ShopifyProduct` type |
| `src/pages/ProductDetail.tsx` | New `handleVariantSelect(index)` helper that updates `selectedVariantIndex` AND `selectedImage`; called from the variant buttons and from the initial load effect |
