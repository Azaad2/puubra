

## Plan: Fix Add to Cart Functionality Across All Pages

### Problem Summary
1. The Shopify store currently has **0 products** - this is why no products appear on pages that fetch from Shopify
2. The **Collections page** (`/collections/bras`, etc.) still uses mock data from `src/data/products.ts` and has a non-functional "Quick Add" button
3. The **BestSellers** and **ProductDetail** pages are correctly wired to Shopify but show empty states due to missing products

---

### Phase 1: Create Shopify Products

Create two products in the Shopify store to match the mock data:

**Product 1: Wireless Bra - Comfort & Lift for Women**
- Price: $23.00
- Colors: Red, Nude, Mauve, Olive, Pink, Black
- Sizes: S, M, L, XL, XXL
- Images: Upload from `src/assets/products/wireless-bra-*.png`

**Product 2: Stary Bliss Super Soft Jelly Bra**
- Price: $24.00
- Colors: Nude, White, Olive, Rose, Black
- Sizes: S, M, L, XL, XXL
- Images: Upload from `src/assets/products/jelly-bra-*.png`

---

### Phase 2: Update Collections Page to Use Shopify Data

Refactor `src/pages/Collections.tsx` to:

1. **Replace mock data import** - Remove `import { products, Product } from "@/data/products"` and use Shopify API
2. **Add Shopify fetching** - Use `fetchShopifyProducts()` from `src/lib/shopify.ts` with `useEffect` and loading state
3. **Update ProductCard component** - Accept `ShopifyProduct` type and display Shopify data structure
4. **Wire Quick Add button** - Connect to `useCartStore().addItem()` with proper variant handling
5. **Update filters** - Modify size/color filters to work with Shopify product options

---

### Phase 3: Technical Changes

| File | Change |
|------|--------|
| Shopify Store | Create 2 products with variants and images |
| `src/pages/Collections.tsx` | Replace mock data with Shopify API fetching, wire Quick Add to cart store |
| `src/data/products.ts` | Keep as fallback reference only (no active usage) |

---

### Collections.tsx Changes (Detail)

```text
1. Import changes:
   - Remove: import { products, Product } from "@/data/products"
   - Add: import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify"
   - Add: import { useCartStore } from "@/stores/cartStore"
   - Add: import { toast } from "sonner"

2. State changes:
   - Add: const [products, setProducts] = useState<ShopifyProduct[]>([])
   - Add: const [isLoading, setIsLoading] = useState(true)
   - Add: const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null)

3. Data fetching:
   - Add useEffect to call fetchShopifyProducts() on mount
   - Handle loading and error states

4. ProductCard updates:
   - Change prop type from Product to ShopifyProduct
   - Map Shopify data structure (product.node.title, etc.)
   - Add handleQuickAdd function that:
     a. Gets first available variant
     b. Calls addItem() from cart store
     c. Shows toast notification

5. Filter updates:
   - Extract sizes from product.node.options
   - Extract colors from product.node.options
   - Filter products by checking selectedOptions
```

---

### Expected Result

After implementation:
1. Products created in Shopify will appear on Home, Collections, and Product Detail pages
2. "Quick Add" button adds the first available variant to cart
3. "Add to Cart" button on Product Detail page adds selected variant to cart
4. Cart badge updates immediately after adding items
5. Checkout redirects to Shopify's secure checkout

