import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Minus, Plus, ChevronLeft, ChevronRight, Check, Truck, RotateCcw, Shield, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const cartIsLoading = useCartStore((state) => state.isLoading);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const shopifyProduct = await fetchProductByHandle(id);
        setProduct(shopifyProduct);
        setSelectedImage(0);
        setSelectedVariantIndex(0);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/collections/bras">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges?.map(e => e.node) || [];
  const variants = product.variants?.edges?.map(e => e.node) || [];
  const selectedVariant = variants[selectedVariantIndex];
  const price = selectedVariant 
    ? parseFloat(selectedVariant.price.amount) 
    : parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % Math.max(images.length, 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % Math.max(images.length, 1));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    if (!selectedVariant.availableForSale) {
      toast.error("This variant is out of stock");
      return;
    }

    setIsAddingToCart(true);
    try {
      // Create the ShopifyProduct wrapper format expected by cart store
      const productWrapper: ShopifyProduct = {
        node: product
      };

      await addItem({
        product: productWrapper,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity,
        selectedOptions: selectedVariant.selectedOptions || [],
      });

      toast.success("Added to cart!", { 
        description: `${product.title} has been added to your cart.`,
        position: "top-center"
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart", { description: "Please try again." });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections/bras" className="hover:text-accent transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-secondary/30 rounded-lg overflow-hidden group">
                <AnimatePresence mode="wait">
                  {images[selectedImage] ? (
                    <motion.img
                      key={selectedImage}
                      src={images[selectedImage].url}
                      alt={images[selectedImage].altText || product.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <span className="text-muted-foreground">No image available</span>
                    </div>
                  )}
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? "border-accent" 
                          : "border-transparent hover:border-accent/50"
                      }`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.altText || `View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-accent">
                  {currencyCode === 'USD' ? '$' : currencyCode} {price.toFixed(2)}
                </span>
                {!selectedVariant?.availableForSale && (
                  <span className="text-sm text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              {variants.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Variant: <span className="text-muted-foreground">{selectedVariant?.title}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantIndex(index)}
                        disabled={!variant.availableForSale}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedVariantIndex === index
                            ? "border-accent bg-accent text-accent-foreground"
                            : variant.availableForSale
                            ? "border-border hover:border-accent text-foreground"
                            : "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {variant.title}
                        {!variant.availableForSale && " (Sold Out)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Options Display */}
              {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-3">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isSelected = selectedVariant?.selectedOptions?.some(
                            opt => opt.name === option.name && opt.value === value
                          );
                          return (
                            <span
                              key={value}
                              className={`px-3 py-1 text-sm rounded border ${
                                isSelected 
                                  ? "border-accent bg-accent/10 text-accent" 
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              {value}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-4 pt-4">
                <Button 
                  className="flex-1 h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-lg rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25"
                  disabled={!selectedVariant?.availableForSale || isAddingToCart || cartIsLoading}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart || cartIsLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : selectedVariant?.availableForSale ? (
                    "Add to Cart"
                  ) : (
                    "Out of Stock"
                  )}
                </Button>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? "border-accent bg-accent/10" 
                      : "border-border hover:border-accent"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-accent text-accent" : "text-foreground"}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">2-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;