// Product images
import wirelessBraRed from "@/assets/products/wireless-bra-red.png";
import wirelessBraNude from "@/assets/products/wireless-bra-nude.png";
import wirelessBraMauve from "@/assets/products/wireless-bra-mauve.png";
import wirelessBraOlive from "@/assets/products/wireless-bra-olive.png";
import wirelessBraPink from "@/assets/products/wireless-bra-pink.png";
import wirelessBraBlack from "@/assets/products/wireless-bra-black.png";
import jellyBraWhite from "@/assets/products/jelly-bra-white.png";
import jellyBraPinkBlue from "@/assets/products/jelly-bra-pink-blue.png";
import jellyBraBlack from "@/assets/products/jelly-bra-black.png";
import jellyBraWhiteDetail from "@/assets/products/jelly-bra-white-detail.png";

export interface ProductColor {
  name: string;
  value: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: "wireless-bra-comfort-lift",
    name: "Wireless Bra - Comfort & Lift for Women",
    slug: "wireless-bra-comfort-lift",
    price: 23,
    description: "Experience ultimate comfort with our wireless bra designed for all-day wear. Features a seamless one-piece design with adjustable straps and back closure for the perfect fit. The 3/4 cup shape provides natural lift and support without the discomfort of underwire.",
    features: [
      "Wire Free Support",
      "Seamless One-piece Design",
      "3/4 Cup Shape",
      "Adjustable Straps",
      "Back Closure",
      "Premium Nylon Material"
    ],
    specifications: {
      "Mold Cup Thickness": "Middle Mold Cup",
      "Pattern Type": "Solid",
      "Support Type": "Wire Free",
      "Style": "Sexy",
      "Closure Type": "Back Closure",
      "Strap Type": "Adjustable, Non-Convertible",
      "Cup Shape": "Three Quarters (3/4 Cup)",
      "Bra Style": "Seamless, One-piece",
      "Material": "Nylon"
    },
    images: [
      wirelessBraRed,
      wirelessBraNude,
      wirelessBraMauve,
      wirelessBraOlive,
      wirelessBraPink,
      wirelessBraBlack
    ],
    colors: [
      { name: "Red", value: "#C41E3A", image: wirelessBraRed },
      { name: "Nude", value: "#E8C4B8", image: wirelessBraNude },
      { name: "Mauve", value: "#7A6B6B", image: wirelessBraMauve },
      { name: "Olive", value: "#6B7B6B", image: wirelessBraOlive },
      { name: "Pink", value: "#FFB6C1", image: wirelessBraPink },
      { name: "Black", value: "#1a1a1a", image: wirelessBraBlack }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 156,
    category: "bras",
    tags: ["wireless", "comfort", "seamless"],
    isSale: false
  },
  {
    id: "stary-bliss-jelly-bra",
    name: "Stary Bliss Super Soft Jelly Bra",
    slug: "stary-bliss-jelly-bra",
    price: 24,
    description: "Ultra-soft jelly bra featuring our innovative thin under thick mold cup technology. This wire-free design provides exceptional comfort and natural shaping, perfect for everyday wear. The super soft jelly material feels like a second skin.",
    features: [
      "Super Soft Jelly Material",
      "Wire Free Design",
      "Thin Under Thick Mold Cup",
      "Solid Pattern",
      "Comfortable All-Day Wear",
      "Breathable Construction"
    ],
    specifications: {
      "Mold Cup Thickness": "Thin Under Thick Mold Cup",
      "Model Number": "668",
      "Pattern Type": "Solid",
      "Support Type": "Wire Free",
      "Decoration": "None"
    },
    images: [
      jellyBraWhite,
      jellyBraPinkBlue,
      jellyBraBlack,
      jellyBraWhiteDetail
    ],
    colors: [
      { name: "White", value: "#F5F5F0", image: jellyBraWhite },
      { name: "Pink/Blue", value: "#8BA4B4", image: jellyBraPinkBlue },
      { name: "Black", value: "#1a1a1a", image: jellyBraBlack },
      { name: "White Detail", value: "#FFFAF0", image: jellyBraWhiteDetail }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 89,
    category: "bras",
    tags: ["jelly", "soft", "wireless"],
    isNew: true
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => 
  products.find(p => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined => 
  products.find(p => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] => 
  products.filter(p => p.category === category);

export const getAllProducts = (): Product[] => products;
