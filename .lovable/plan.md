

## Plan: Move Products Right Below the Hero Banner

### Goal
Reduce visitor friction by showing products immediately after the hero section, so users can see products, hit "Add to Cart," and convert without scrolling through category cards and other content first.

### Current Homepage Order
1. Hero Section
2. Featured Collections (Shop by Category)
3. Best Sellers (products)
4. Promo Banner
5. Brand Story
6. Blog Preview
7. Customer Reviews
8. UGC Gallery
9. Trust Badges

### New Homepage Order
1. Hero Section
2. **Best Sellers (products) -- moved up**
3. **Promo Banner -- moved up (reinforces purchase intent)**
4. Featured Collections (Shop by Category)
5. Brand Story
6. Blog Preview
7. Customer Reviews
8. UGC Gallery
9. Trust Badges

### What Changes

**File: `src/pages/Index.tsx`**
- Reorder the components so `<BestSellers />` and `<PromoBanner />` come immediately after `<HeroSection />`
- `<FeaturedCollections />` moves below the promo banner
- Everything else stays in the same order

This is a single-file change -- just reordering the JSX elements. No new components or logic needed.

### Why This Works
- Products appear above the fold on most screens, catching visitors immediately
- The promo banner ("Spend $75, get a free gift") sits right after products to encourage adding more to cart
- Category browsing is still available but comes after the initial product hook

### Technical Details

The only file modified is `src/pages/Index.tsx`. The `<main>` section changes from:

```text
<HeroSection />
<FeaturedCollections />
<BestSellers />
<PromoBanner />
<BrandStory />
...
```

To:

```text
<HeroSection />
<BestSellers />
<PromoBanner />
<FeaturedCollections />
<BrandStory />
...
```

No styling, logic, or component changes required.
