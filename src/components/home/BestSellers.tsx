import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { trackAddToCart } from "@/hooks/useMetaPixel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const BestSellers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchShopifyProducts(8);
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl font-semibold mb-3"
            >
              Best Sellers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Our most loved pieces, chosen by you
            </motion.p>
          </div>
          <Link to="/collections/bras">
            <Button variant="link" className="text-accent hover:text-accent/80 mt-4 md:mt-0 text-base">
              View All →
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No products available yet.</p>
            <p className="text-sm text-muted-foreground">Products will appear here once they're added to the store.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  const productNode = product.node;
  const firstImage = productNode.images?.edges?.[0]?.node?.url;
  const price = parseFloat(productNode.priceRange.minVariantPrice.amount);
  const currencyCode = productNode.priceRange.minVariantPrice.currencyCode;
  const firstVariant = productNode.variants?.edges?.[0]?.node;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product unavailable", { description: "This product has no available variants." });
      return;
    }

    if (!firstVariant.availableForSale) {
      toast.error("Out of stock", { description: "This variant is currently out of stock." });
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItem({
        product,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price,
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions || [],
      });
      toast.success("Added to cart!", { 
        description: `${productNode.title} has been added to your cart.`,
        position: "top-center"
      });
      trackAddToCart({
        content_name: productNode.title,
        content_ids: [firstVariant.id],
        content_type: 'product',
        value: parseFloat(firstVariant.price.amount),
        currency: firstVariant.price.currencyCode,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart", { description: "Please try again." });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${productNode.handle}`}>
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-muted border border-border/50 group-hover:border-accent/30 transition-colors">
          {firstImage ? (
            <img
              src={firstImage}
              alt={productNode.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary">
              <span className="text-muted-foreground">No image</span>
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
              disabled={isAddingToCart || !firstVariant?.availableForSale}
            >
              {isAddingToCart ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {firstVariant?.availableForSale ? "Quick Add" : "Out of Stock"}
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div>
        <Link to={`/product/${productNode.handle}`}>
          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-accent transition-colors line-clamp-2">
            {productNode.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {currencyCode === 'USD' ? '$' : currencyCode} {price.toFixed(2)}
          </span>
        </div>

        {/* Variant count indicator */}
        {productNode.variants.edges.length > 1 && (
          <p className="text-xs text-muted-foreground mt-1">
            {productNode.variants.edges.length} variants available
          </p>
        )}
      </div>
    </motion.div>
  );
};