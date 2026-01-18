import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Silk Comfort Bralette",
    price: 42,
    originalPrice: 56,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 234,
    colors: ["#F5E6D3", "#2D2D2D", "#B87E6E"],
    isSale: true,
  },
  {
    id: "2",
    name: "Lace Detail Bra",
    price: 48,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 189,
    colors: ["#F5E6D3", "#8B7355"],
    isNew: true,
  },
  {
    id: "3",
    name: "Seamless T-Shirt Bra",
    price: 38,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 312,
    colors: ["#F5E6D3", "#2D2D2D", "#8B7355", "#B87E6E"],
  },
  {
    id: "4",
    name: "Push-Up Plunge Bra",
    price: 52,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 156,
    colors: ["#2D2D2D", "#8B7355"],
    isSale: true,
  },
];

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
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-semibold mb-2"
            >
              Best Sellers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Our most loved pieces, chosen by you
            </motion.p>
          </div>
          <Button variant="link" className="text-accent hover:text-accent/80 mt-4 md:mt-0">
            View All →
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-charcoal text-white text-xs px-2 py-1">New</Badge>
          )}
          {product.isSale && (
            <Badge className="bg-accent text-accent-foreground text-xs px-2 py-1">Sale</Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-accent text-accent" : "text-charcoal"
            }`}
          />
        </button>

        {/* Quick Add */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-white/95 transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Button className="w-full bg-charcoal hover:bg-charcoal/90 text-white text-sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              aria-label={`Color ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
