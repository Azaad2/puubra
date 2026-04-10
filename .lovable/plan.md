

## Problem

Your domain `puubra.com` currently points to Shopify's default storefront theme (the page in your screenshot), not your Lovable-built website. This is a DNS/domain configuration issue.

Additionally, there's a fallback URL in the code that redirects users to the raw Shopify store.

## What Needs to Happen

### 1. Domain Configuration (outside Lovable)
Your domain `puubra.com` is currently configured to serve the Shopify default theme. You have two options:

- **Option A**: Point `puubra.com` to your Lovable site instead of Shopify. You can set up a custom domain for your Lovable project through the publish settings. Shopify would then only act as the backend (API + checkout).
- **Option B**: Keep `puubra.com` on Shopify but customize that Shopify theme to match your Lovable design (not recommended since you're building here).

### 2. Code Fix
Remove the fallback redirect to `myshopify.com/cart` in `JellyBraPreOrder.tsx` so users are never sent to the Shopify-hosted storefront.

**File**: `src/pages/JellyBraPreOrder.tsx`
- Replace the fallback `window.location.href = "https://peuvfx-1e.myshopify.com/cart"` with a user-friendly error message or redirect to the Lovable site's cart.

## Technical Details

| Task | Scope |
|------|-------|
| Remove Shopify store fallback URL | `src/pages/JellyBraPreOrder.tsx` line 234 |
| Set up custom domain for Lovable | Publish settings (no code change) |

