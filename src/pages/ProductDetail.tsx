import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Minus, Plus, ChevronLeft, ChevronRight, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const productData = {
  id: "1",
  name: "Signature Silk Bralette",
  price: 89,
  originalPrice: 129,
  rating: 4.8,
  reviewCount: 247,
  description: "Experience unparalleled comfort with our signature silk bralette. Crafted from premium mulberry silk with delicate rose gold hardware, this piece offers the perfect blend of luxury and support.",
  features: [
    "100% Mulberry Silk",
    "Rose gold hardware accents",
    "Wireless comfort design",
    "Adjustable straps",
    "Hand wash recommended"
  ],
  images: [
    "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80",
    "https://images.unsplash.com/photo-1564203492257-8ce9aa4361e9?w=800&q=80",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80"
  ],
  colors: [
    { name: "Rose Blush", value: "#E8C4B8" },
    { name: "Midnight Black", value: "#1a1a1a" },
    { name: "Champagne", value: "#F5E6D3" },
    { name: "Deep Burgundy", value: "#722F37" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"]
};

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely stunning quality",
    content: "The silk is so soft and the fit is perfect. I've never felt more confident. Worth every penny!",
    verified: true
  },
  {
    id: 2,
    author: "Emma L.",
    rating: 5,
    date: "1 month ago",
    title: "My new favorite",
    content: "Beautiful design and incredibly comfortable. The rose gold details are gorgeous. Already ordered two more colors!",
    verified: true
  },
  {
    id: 3,
    author: "Jessica R.",
    rating: 4,
    date: "1 month ago",
    title: "Great quality, runs slightly small",
    content: "Love the quality and look. Just note it runs a bit small - I'd recommend sizing up if you're between sizes.",
    verified: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <span className="hover:text-rose-gold cursor-pointer transition-colors">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-rose-gold cursor-pointer transition-colors">Bralettes</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{productData.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-secondary/30 rounded-lg overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={productData.images[selectedImage]}
                    alt={productData.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-gold hover:text-background"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-gold hover:text-background"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-rose-gold text-background px-3 py-1 text-sm font-medium rounded">
                  SALE
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-rose-gold" 
                        : "border-transparent hover:border-rose-gold/50"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">
                  {productData.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(productData.rating) ? "fill-rose-gold text-rose-gold" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {productData.rating} ({productData.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-rose-gold">${productData.price}</span>
                <span className="text-lg text-muted-foreground line-through">${productData.originalPrice}</span>
                <span className="text-sm text-rose-gold font-medium">
                  Save ${productData.originalPrice - productData.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {productData.description}
              </p>

              {/* Color Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Color: <span className="text-muted-foreground">{productData.colors[selectedColor].name}</span>
                </label>
                <div className="flex gap-3">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === index 
                          ? "border-rose-gold scale-110" 
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor === index && (
                        <Check className={`w-4 h-4 ${color.value === "#1a1a1a" ? "text-white" : "text-background"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground">Size</label>
                  <button className="text-sm text-rose-gold hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-3">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-rose-gold bg-rose-gold text-background"
                          : "border-border hover:border-rose-gold text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

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
                  className="flex-1 h-14 bg-rose-gold hover:bg-rose-gold/90 text-background font-medium text-lg rounded-lg transition-all hover:shadow-lg hover:shadow-rose-gold/25"
                  disabled={!selectedSize}
                >
                  {selectedSize ? "Add to Cart" : "Select a Size"}
                </Button>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? "border-rose-gold bg-rose-gold/10" 
                      : "border-border hover:border-rose-gold"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-rose-gold text-rose-gold" : "text-foreground"}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-5 h-5 text-rose-gold" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-gold" />
                  <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="w-5 h-5 text-rose-gold" />
                  <span className="text-xs text-muted-foreground">2-Year Warranty</span>
                </div>
              </div>

              {/* Features */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Features</h3>
                <ul className="space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-rose-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-rose-gold text-rose-gold" />
                  ))}
                </div>
                <span className="text-foreground font-medium">{productData.rating}</span>
                <span className="text-muted-foreground">({productData.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-secondary/30 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? "fill-rose-gold text-rose-gold" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-foreground">{review.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-background">
                View All Reviews
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
