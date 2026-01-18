import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, Product } from "@/data/products";

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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const displayImage = product.colors[selectedColorIndex]?.image || product.images[0];

  return (
    <motion.div
      variants={itemVariants}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-muted border border-border/50 group-hover:border-accent/30 transition-colors">
          <img
            src={displayImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-foreground text-background text-xs px-2 py-1">New</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-accent text-accent-foreground text-xs px-2 py-1">Sale</Badge>
            )}
          </div>

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
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color, i) => (
            <button
              key={i}
              onClick={() => setSelectedColorIndex(i)}
              className={`w-4 h-4 rounded-full border transition-transform hover:scale-110 ${
                selectedColorIndex === i ? 'border-accent ring-1 ring-accent ring-offset-1 ring-offset-background' : 'border-border hover:border-accent'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
