// Product images — existing
import wirelessBraRed from "@/assets/products/wireless-bra-red.png";
import wirelessBraNude from "@/assets/products/wireless-bra-nude.png";
import wirelessBraMauve from "@/assets/products/wireless-bra-mauve.png";
import wirelessBraOlive from "@/assets/products/wireless-bra-olive.png";
import wirelessBraPink from "@/assets/products/wireless-bra-pink.png";
import wirelessBraBlack from "@/assets/products/wireless-bra-black.png";
import jellyBraNude from "@/assets/products/jelly-bra-nude.png";
import jellyBraWhite from "@/assets/products/jelly-bra-white.png";
import jellyBraOlive from "@/assets/products/jelly-bra-olive.png";
import jellyBraRose from "@/assets/products/jelly-bra-rose.png";
import jellyBraBlack from "@/assets/products/jelly-bra-black.png";

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
  supplierSku?: string;
  bundleWith?: string;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  productIds: [string, string];
  bundlePrice: number;
  originalTotal: number;
  saving: number;
  badge: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "stary-bliss-jelly-bra",
    name: "Stary Bliss Super Soft Jelly Bra",
    slug: "stary-bliss-jelly-bra",
    price: 24,
    originalPrice: 28,
    description: "Ultra-soft jelly bra featuring our innovative thin-under-thick mold cup technology. Wire-free design provides exceptional comfort and natural shaping. The super soft jelly material feels like a second skin — lift and support without a single poke or dig.",
    features: ["Super Soft Jelly Material","Wire-Free Design","Thin Under Thick Mold Cup","Breathable All-Day Construction","Seamless — Invisible Under Clothes","Adjustable Straps"],
    specifications: {"Mold Cup":"Thin Under Thick","Support Type":"Wire Free","Pattern":"Solid","Fabric":"Nylon + Spandex","Sizes":"S, M, L, XL, XXL"},
    images: [jellyBraNude, jellyBraWhite, jellyBraOlive, jellyBraRose, jellyBraBlack],
    colors: [
      { name: "Nude",  value: "#E8C4B8", image: jellyBraNude  },
      { name: "White", value: "#F5F5F0", image: jellyBraWhite },
      { name: "Olive", value: "#6B7B6B", image: jellyBraOlive },
      { name: "Rose",  value: "#C08B7C", image: jellyBraRose  },
      { name: "Black", value: "#1a1a1a", image: jellyBraBlack }
    ],
    sizes: ["S","M","L","XL","XXL"],
    rating: 4.7, reviewCount: 89, category: "bras",
    tags: ["jelly","wire-free","seamless","bestseller","new"],
    isNew: true, supplierSku: "668", bundleWith: "w-strip-jelly-lift-bra"
  },
  {
    id: "w-strip-jelly-lift-bra",
    name: "W-Strip Jelly Lift Bra",
    slug: "w-strip-jelly-lift-bra",
    price: 32,
    originalPrice: 38,
    description: "Our most advanced wire-free bra. The W-strip design cradles and lifts naturally, smoothing back and underarm while staying perfectly in place all day. Ultra-soft stretchy fabric moves with your body — comfort that actually works.",
    features: ["W-Strip Lift Technology","Smooths Back & Underarm","Stays in Place All Day","Ultra-Soft Stretchy Fabric","Wire-Free Support","Seamless Construction","Inclusive Sizing S–3XL"],
    specifications: {"Support Type":"Wire-Free W-Strip","Closure":"Mid Back Fixed","Fabric":"52% Nylon + 48% Spandex","Pads":"Removable","Sizes":"S, M, L, XL, XXL, 3XL"},
    images: [jellyBraNude, jellyBraBlack, jellyBraRose],
    colors: [
      { name: "Light Brown", value: "#C9A48A", image: jellyBraNude  },
      { name: "Light Skin",  value: "#E8C4B8", image: jellyBraRose  },
      { name: "Black",       value: "#1a1a1a", image: jellyBraBlack }
    ],
    sizes: ["S","M","L","XL","XXL","3XL"],
    rating: 4.8, reviewCount: 0, category: "bras",
    tags: ["jelly","wire-free","w-strip","lift","new","bestseller"],
    isNew: true, supplierSku: "WLGb61012-BN07/SK04/BK01", bundleWith: "stary-bliss-jelly-bra"
  },
  {
    id: "silk-comfort-seamless-bralette",
    name: "Silk Comfort Seamless Bralette",
    slug: "silk-comfort-seamless-bralette",
    price: 28,
    originalPrice: 34,
    description: "Premium 95% Nylon construction with a buttery-soft feel. Adjustable straps, removable pads, and high-back hook closure deliver an elevated fit. The bralette that blurs the line between lingerie and everyday comfort.",
    features: ["95% Nylon Premium Fabric","Removable Pads","Adjustable Straps","High-Back Hook Closure","Seamless Design","All-Day Comfort"],
    specifications: {"Fabric":"95% Nylon + 5% Spandex","Pads":"Removable","Closure":"Hook, High Back","Straps":"Adjustable","Sizes":"S, M, L, XL, XXL"},
    images: [wirelessBraNude, wirelessBraBlack, wirelessBraMauve, wirelessBraPink],
    colors: [
      { name: "Nude",  value: "#E8C4B8", image: wirelessBraNude  },
      { name: "Black", value: "#1a1a1a", image: wirelessBraBlack },
      { name: "Brown", value: "#8B6355", image: wirelessBraMauve },
      { name: "White", value: "#F5F5F0", image: wirelessBraPink  }
    ],
    sizes: ["S","M","L","XL","XXL"],
    rating: 4.9, reviewCount: 0, category: "bras",
    tags: ["premium","bralette","seamless","wireless","new"],
    isNew: true, supplierSku: "NY230015-BK1/BN6/WH1/SK1", bundleWith: "w-strip-jelly-lift-bra"
  },
  {
    id: "wireless-bra-comfort-lift",
    name: "Wireless Bra — Comfort & Lift",
    slug: "wireless-bra-comfort-lift",
    price: 23,
    description: "Experience ultimate comfort with our wireless bra designed for all-day wear. Features a seamless one-piece design with adjustable straps and back closure for the perfect fit.",
    features: ["Wire-Free Support","Seamless One-Piece Design","3/4 Cup Natural Shape","Adjustable Straps","Back Closure","Premium Nylon Material"],
    specifications: {"Cup Shape":"3/4 Cup","Support":"Wire Free","Closure":"Back Hook","Fabric":"Nylon + Spandex"},
    images: [wirelessBraRed, wirelessBraNude, wirelessBraMauve, wirelessBraOlive, wirelessBraPink, wirelessBraBlack],
    colors: [
      { name: "Red",   value: "#C41E3A", image: wirelessBraRed   },
      { name: "Nude",  value: "#E8C4B8", image: wirelessBraNude  },
      { name: "Mauve", value: "#7A6B6B", image: wirelessBraMauve },
      { name: "Olive", value: "#6B7B6B", image: wirelessBraOlive },
      { name: "Pink",  value: "#FFB6C1", image: wirelessBraPink  },
      { name: "Black", value: "#1a1a1a", image: wirelessBraBlack }
    ],
    sizes: ["S","M","L","XL","XXL"],
    rating: 4.8, reviewCount: 156, category: "bras",
    tags: ["wireless","comfort","seamless"],
    bundleWith: "double-layer-low-back-bra"
  },
  {
    id: "double-layer-low-back-bra",
    name: "Double-Layer Low Back Bra",
    slug: "double-layer-low-back-bra",
    price: 26,
    originalPrice: 32,
    description: "Engineered with double-layer 92% Nylon construction for a sleek, smooth silhouette under any outfit. The adjustable low-back design and fixed pads deliver all-day shape without bulk.",
    features: ["Double-Layer Nylon Construction","Adjustable Low Back","Fixed Shaping Pads","Seamless Silhouette","Adjustable Straps","Extended Size Range XS–3XL+"],
    specifications: {"Fabric":"92% Nylon + 8% Spandex","Layers":"Double Layer","Closure":"Adjustable Low Back","Pads":"Fixed","Sizes":"S–3XL and extended"},
    images: [wirelessBraBlack, wirelessBraNude, wirelessBraMauve, wirelessBraPink],
    colors: [
      { name: "Black",      value: "#1a1a1a", image: wirelessBraBlack },
      { name: "Dark Skin",  value: "#8B6355", image: wirelessBraNude  },
      { name: "Light Skin", value: "#E8C4B8", image: wirelessBraMauve },
      { name: "White",      value: "#F5F5F0", image: wirelessBraPink  }
    ],
    sizes: ["S","M","L","XL","XXL","3XL"],
    rating: 4.6, reviewCount: 0, category: "bras",
    tags: ["seamless","low-back","double-layer","wireless","new"],
    isNew: true, supplierSku: "NY240013-BK1/SK3/SK4/WH1", bundleWith: "wireless-bra-comfort-lift"
  },
  {
    id: "ice-silk-summer-wireless-bra",
    name: "Ice Silk Summer Wireless Bra",
    slug: "ice-silk-summer-wireless-bra",
    price: 22,
    originalPrice: 26,
    description: "When warmth hits, this is the bra you reach for. Ultra-high stretch ice-silk fabric keeps you cool and dry all day. Wire-free, seamless, and breathable — the summer bra that disappears under your favourite tops.",
    features: ["Ice-Silk Cool Fabric","High-Stretch Spandex Blend","Wire-Free Comfort","Seamless — No Lines","Moisture-Wicking","Lightweight Construction"],
    specifications: {"Fabric":"51.1% Nylon + 48.9% Spandex","Feel":"Ice-Silk Cool","Support":"Wire Free","Season":"Summer / Year-Round"},
    images: [wirelessBraPink, wirelessBraOlive, wirelessBraBlack, wirelessBraNude],
    colors: [
      { name: "Blue",  value: "#7EB5D6", image: wirelessBraPink  },
      { name: "Green", value: "#6B7B6B", image: wirelessBraOlive },
      { name: "Black", value: "#1a1a1a", image: wirelessBraBlack },
      { name: "Ivory", value: "#F5F0E8", image: wirelessBraNude  }
    ],
    sizes: ["S","M","L","XL","XXL"],
    rating: 4.5, reviewCount: 0, category: "bras",
    tags: ["summer","ice-silk","wireless","breathable","new"],
    isNew: true, supplierSku: "20004", bundleWith: "cool-sense-summer-thin-bra"
  },
  {
    id: "mask-fabric-ultra-light-bralette",
    name: "Ultra-Light Second-Skin Bralette",
    slug: "mask-fabric-ultra-light-bralette",
    price: 22,
    originalPrice: 28,
    description: "Made from facial-mask-grade fabric — the softest material you will ever wear. Double-layer stretch construction with built-in elastic bands for gentle support. Wire-free, pad-free, second-skin comfort from XXS to 3XL.",
    features: ["Facial-Mask Grade Fabric","Double-Layer Stretch Construction","Built-In Elastic Support Bands","Wire-Free & Pad-Free","Widened Shoulder Straps","XXS–3XL Inclusive Sizing"],
    specifications: {"Fabric":"74% Nylon + 26% Spandex","Pads":"None","Closure":"Fixed Low Back","Straps":"Adjustable, Wide","Sizes":"XXS–3XL"},
    images: [wirelessBraNude, wirelessBraMauve, wirelessBraBlack, wirelessBraPink, wirelessBraOlive],
    colors: [
      { name: "Dark Brown",  value: "#5C3A2E", image: wirelessBraMauve },
      { name: "Black",       value: "#1a1a1a", image: wirelessBraBlack },
      { name: "Dark Skin",   value: "#8B6355", image: wirelessBraNude  },
      { name: "Light Beige", value: "#E8D5C0", image: wirelessBraPink  },
      { name: "Pink",        value: "#F4C0D1", image: wirelessBraRed   }
    ],
    sizes: ["XXS","XS","S","M","L","XL","XXL","3XL"],
    rating: 4.6, reviewCount: 0, category: "bras",
    tags: ["ultra-light","second-skin","wireless","inclusive","new"],
    isNew: true, supplierSku: "NY240011-BN6/BK1/SK3/SK8/PK5", bundleWith: "wide-back-w-band-wireless-bra"
  },
  {
    id: "cool-sense-summer-thin-bra",
    name: "Cool Sense Thin Cup Wireless Bra",
    slug: "cool-sense-summer-thin-bra",
    price: 24,
    originalPrice: 28,
    description: "High-performance 77% Nylon fabric for a premium, cool-touch feel. Thin cup design sits flat under anything while keeping you fresh all day. Available in 5 seasonal colours — the perfect everyday bra for warm-weather dressing.",
    features: ["77% Nylon Premium Cool-Touch Fabric","Thin Cup — Invisible Under Clothes","Wire-Free All-Day Support","5 Seasonal Colours","Seamless Construction","Adjustable Straps"],
    specifications: {"Fabric":"77.7% Nylon + 22.3% Spandex","Cup":"Thin, Seamless","Support":"Wire Free","Sizes":"S, M, L, XL, XXL"},
    images: [wirelessBraPink, wirelessBraOlive, wirelessBraNude, wirelessBraBlack, wirelessBraMauve],
    colors: [
      { name: "Blue",   value: "#7EB5D6", image: wirelessBraPink  },
      { name: "Yellow", value: "#F5E642", image: wirelessBraOlive },
      { name: "Cream",  value: "#F5F0E8", image: wirelessBraNude  },
      { name: "Purple", value: "#9B7FD4", image: wirelessBraMauve },
      { name: "Ivory",  value: "#FAF7F0", image: wirelessBraBlack }
    ],
    sizes: ["S","M","L","XL","XXL"],
    rating: 4.5, reviewCount: 0, category: "bras",
    tags: ["summer","cool-sense","wireless","thin-cup","new"],
    isNew: true, supplierSku: "20006", bundleWith: "ice-silk-summer-wireless-bra"
  },
  {
    id: "wide-back-w-band-wireless-bra",
    name: "Wide-Back W-Band Wireless Bra",
    slug: "wide-back-w-band-wireless-bra",
    price: 24,
    originalPrice: 30,
    description: "Engineered for fuller figures. The wide back W-shaped band smooths back fat and underarm bulge while providing firm, all-day support. No pads, no wires — just clean, confident comfort from S to 3XL.",
    features: ["Wide Back W-Shaped Band","Smooths Back & Underarm","Wire-Free & Pad-Free","Adjustable Straps","81% Nylon Premium Fabric","S–3XL Inclusive"],
    specifications: {"Fabric":"81% Nylon + 19% Spandex","Back":"Wide W-Band, Mid Back","Pads":"None","Straps":"Fixed","Sizes":"S, M, L, XL, XXL, 3XL"},
    images: [wirelessBraNude, wirelessBraBlack, wirelessBraMauve, wirelessBraPink],
    colors: [
      { name: "Pink",       value: "#F4C0D1", image: wirelessBraPink  },
      { name: "Black",      value: "#1a1a1a", image: wirelessBraBlack },
      { name: "Brown",      value: "#8B6355", image: wirelessBraMauve },
      { name: "Light Skin", value: "#E8C4B8", image: wirelessBraNude  }
    ],
    sizes: ["S","M","L","XL","XXL","3XL"],
    rating: 4.6, reviewCount: 0, category: "bras",
    tags: ["wide-back","plus-size","wireless","inclusive","new"],
    isNew: true, supplierSku: "NY250002-PK5/BK1/BN7/SK3", bundleWith: "mask-fabric-ultra-light-bralette"
  }
];

export const bundles: Bundle[] = [
  {
    id: "comfort-duo",
    name: "The Comfort Duo",
    slug: "comfort-duo",
    tagline: "Two wire-free icons. One unbeatable pair.",
    productIds: ["stary-bliss-jelly-bra", "w-strip-jelly-lift-bra"],
    bundlePrice: 52, originalTotal: 56, saving: 4,
    badge: "Best seller", isNew: true
  },
  {
    id: "summer-set",
    name: "The Summer Set",
    slug: "summer-set",
    tagline: "Stay cool, look effortless. All season long.",
    productIds: ["ice-silk-summer-wireless-bra", "cool-sense-summer-thin-bra"],
    bundlePrice: 40, originalTotal: 46, saving: 6,
    badge: "Summer drop", isNew: true
  },
  {
    id: "everyday-essential",
    name: "The Everyday Essential",
    slug: "everyday-essential",
    tagline: "Your two new daily bras. Done.",
    productIds: ["mask-fabric-ultra-light-bralette", "wide-back-w-band-wireless-bra"],
    bundlePrice: 42, originalTotal: 46, saving: 4,
    badge: "Best margin", isNew: true
  },
  {
    id: "jelly-bra-starter-pack",
    name: "The Jelly Bra Starter Pack",
    slug: "jelly-bra-starter-pack",
    tagline: "One lifestyle. Two jelly bras. No looking back.",
    productIds: ["stary-bliss-jelly-bra", "silk-comfort-seamless-bralette"],
    bundlePrice: 48, originalTotal: 52, saving: 4,
    badge: "New", isNew: true
  }
];

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string): Product[] =>
  products.filter(p => p.category === category);
export const getAllProducts = (): Product[] => products;
export const getNewProducts = (): Product[] => products.filter(p => p.isNew);
export const getSaleProducts = (): Product[] => products.filter(p => p.isSale);
export const getBundleById = (id: string): Bundle | undefined =>
  bundles.find(b => b.id === id);
export const getBundleProducts = (bundle: Bundle): [Product | undefined, Product | undefined] => [
  getProductById(bundle.productIds[0]),
  getProductById(bundle.productIds[1])
];
export const getAllBundles = (): Bundle[] => bundles;
export const getJellyBraProducts = (): Product[] =>
  products.filter(p => p.tags.includes("jelly"));
