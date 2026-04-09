import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Filter, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { products, Product } from "@/data/products";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
];

const allSizes = ["S", "M", "L", "XL", "XXL"];

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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Get unique colors from all products
  const allColors = useMemo(() => {
    const colorMap = new Map<string, { name: string; value: string }>();
    products.forEach(product => {
      product.colors.forEach(color => {
        if (!colorMap.has(color.name)) {
          colorMap.set(color.name, { name: color.name, value: color.value });
        }
      });
    });
    return Array.from(colorMap.values());
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(product =>
        selectedSizes.some(size => product.sizes.includes(size))
      );
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(product =>
        selectedColors.some(colorName =>
          product.colors.some(c => c.name === colorName)
        )
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [selectedSizes, selectedColors, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0;

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
              {filteredProducts.length} products
            </motion.p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden border-border">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-accent text-accent-foreground text-xs">
                      {selectedSizes.length + selectedColors.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background">
                <SheetHeader>
                  <SheetTitle className="font-serif">Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar
                  allSizes={allSizes}
                  allColors={allColors}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  toggleSize={toggleSize}
                  toggleColor={toggleColor}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </SheetContent>
            </Sheet>

            {/* Desktop Filter Summary */}
            <div className="hidden md:flex items-center gap-2">
              {hasActiveFilters && (
                <>
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedSizes.map(size => (
                    <Badge
                      key={size}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => toggleSize(size)}
                    >
                      {size} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedColors.map(color => (
                    <Badge
                      key={color}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => toggleColor(color)}
                    >
                      {color} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </>
              )}
            </div>

            {/* Sort Dropdown */}
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

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
              <FilterSidebar
                allSizes={allSizes}
                allColors={allColors}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                toggleSize={toggleSize}
                toggleColor={toggleColor}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products match your filters</p>
                  <Button onClick={clearFilters} variant="outline" className="border-accent text-accent">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface FilterSidebarProps {
  allSizes: string[];
  allColors: { name: string; value: string }[];
  selectedSizes: string[];
  selectedColors: string[];
  toggleSize: (size: string) => void;
  toggleColor: (colorName: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterSidebar = ({
  allSizes,
  allColors,
  selectedSizes,
  selectedColors,
  toggleSize,
  toggleColor,
  clearFilters,
  hasActiveFilters,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-8 py-4">
      {/* Size Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 rounded-lg border-2 font-medium text-sm transition-all ${
                selectedSizes.includes(size)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-4">Color</h3>
        <div className="space-y-3">
          {allColors.map(color => (
            <label
              key={color.name}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedColors.includes(color.name)}
                onCheckedChange={() => toggleColor(color.name)}
                className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {color.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          Clear All Filters
        </Button>
      )}
    </div>
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

export default Collections;
