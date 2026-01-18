import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Minus, Plus, ChevronLeft, ChevronRight, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getProductById, Product } from "@/data/products";

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely stunning quality",
    content: "So comfortable and the fit is perfect. I've never felt more confident. Worth every penny!",
    verified: true
  },
  {
    id: 2,
    author: "Emma L.",
    rating: 5,
    date: "1 month ago",
    title: "My new favorite",
    content: "Beautiful design and incredibly comfortable. Already ordered two more colors!",
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
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      // Try to find by slug first, then by id
      const foundProduct = getProductBySlug(id) || getProductById(id);
      setProduct(foundProduct || null);
      setSelectedImage(0);
      setSelectedColor(0);
      setSelectedSize(null);
    }
  }, [id]);

  // When color changes, update the selected image to show the color's image
  useEffect(() => {
    if (product && product.colors[selectedColor]) {
      const colorImage = product.colors[selectedColor].image;
      const imageIndex = product.images.indexOf(colorImage);
      if (imageIndex !== -1) {
        setSelectedImage(imageIndex);
      }
    }
  }, [selectedColor, product]);

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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
            <Link to="/collections/bras" className="hover:text-accent transition-colors">Bras</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-secondary/30 rounded-lg overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
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

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <div className="bg-foreground text-background px-3 py-1 text-sm font-medium rounded">
                      NEW
                    </div>
                  )}
                  {product.isSale && (
                    <div className="bg-accent text-accent-foreground px-3 py-1 text-sm font-medium rounded">
                      SALE
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
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
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-accent">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    <span className="text-sm text-accent font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Color: <span className="text-muted-foreground">{product.colors[selectedColor].name}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === index 
                          ? "border-accent scale-110" 
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor === index && (
                        <Check className={`w-4 h-4 ${color.value === "#1a1a1a" || color.value === "#C41E3A" ? "text-white" : "text-background"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground">Size</label>
                  <button className="text-sm text-accent hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent text-foreground"
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
                  className="flex-1 h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-lg rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25"
                  disabled={!selectedSize}
                >
                  {selectedSize ? "Add to Cart" : "Select a Size"}
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

              {/* Features */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Specifications</h3>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex text-sm">
                      <dt className="w-1/2 text-muted-foreground">{key}</dt>
                      <dd className="w-1/2 text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
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
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-foreground font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
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
                          className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
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
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
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
