import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } = useShopifyProduct(id || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.node.images.edges.map(e => e.node);
  const variants = product.node.variants.edges.map(e => e.node);
  const selectedVariant = variants[selectedVariantIndex];
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const currency = selectedVariant?.price.currencyCode || 'USD';

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart!", { description: `${product.node.title} has been added to your cart.`, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections/bras" className="hover:text-accent transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.node.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-secondary/30 rounded-lg overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]?.url || '/placeholder.svg'}
                    alt={images[selectedImage]?.altText || product.node.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-accent" : "border-transparent hover:border-accent/50"}`}>
                      <img src={image.url} alt={image.altText || `View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">{product.node.title}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-accent">{currency === 'USD' ? '$' : currency}{price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.node.description}</p>

              {/* Variant/Option Selector */}
              {product.node.options.map((option) => (
                <div key={option.name} className="space-y-3">
                  <label className="text-sm font-medium text-foreground">{option.name}</label>
                  <div className="flex flex-wrap gap-3">
                    {option.values.map((value) => {
                      const variantIndex = variants.findIndex(v => v.selectedOptions.some(o => o.name === option.name && o.value === value));
                      const isSelected = selectedVariant?.selectedOptions.some(o => o.name === option.name && o.value === value);
                      return (
                        <button
                          key={value}
                          onClick={() => { if (variantIndex >= 0) setSelectedVariantIndex(variantIndex); }}
                          className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${isSelected ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent text-foreground"}`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-lg rounded-lg" onClick={handleAddToCart} disabled={cartLoading || !selectedVariant?.availableForSale}>
                  {cartLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                </Button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-all ${isWishlisted ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}>
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-accent text-accent" : "text-foreground"}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2"><Truck className="w-5 h-5 text-accent" /><span className="text-xs text-muted-foreground">Free Shipping</span></div>
                <div className="flex flex-col items-center text-center gap-2"><RotateCcw className="w-5 h-5 text-accent" /><span className="text-xs text-muted-foreground">30-Day Returns</span></div>
                <div className="flex flex-col items-center text-center gap-2"><Shield className="w-5 h-5 text-accent" /><span className="text-xs text-muted-foreground">2-Year Warranty</span></div>
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
