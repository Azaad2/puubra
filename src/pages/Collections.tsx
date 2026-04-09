import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Filter, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

type SortOption = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Collections = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const query = category ? `product_type:${category}` : undefined;
        const data = await fetchShopifyProducts(50, query);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [category]);

  const sortedProducts = useMemo(() => {
    const result = [...products];
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort((a, b) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      default:
        break;
    }
    return result;
  }, [products, sortBy]);

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
    : "All Products";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{categoryTitle}</span>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-5xl font-semibold mb-3"
            >
              {categoryTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              {isLoading ? "Loading..." : `${sortedProducts.length} products`}
            </motion.p>
          </div>

          {/* Sort Toolbar */}
          <div className="flex items-center justify-end gap-4 mb-8 pb-4 border-b border-border">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="border-border min-w-[180px] justify-between"
              >
                <span className="text-sm">
                  Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </Button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-card border border-border rounded-lg shadow-lg z-10">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'text-accent font-medium' : 'text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">No products found</p>
              <p className="text-muted-foreground text-sm">
                Products added to your store will appear here automatically.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {sortedProducts.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ShopifyProductCard = ({ product }: { product: ShopifyProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    try {
      await addItem({
        product,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price,
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions,
      });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${node.handle}`}>
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-muted border border-border/50 group-hover:border-accent/30 transition-colors">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-accent text-accent" : "text-foreground"
              }`}
            />
          </button>

          {/* Quick Add */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>
      </Link>

      <div>
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-accent transition-colors line-clamp-2">
            {node.title}
          </h3>
        </Link>
        <span className="font-semibold text-foreground">
          ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
        </span>
      </div>
    </motion.div>
  );
};

export default Collections;
