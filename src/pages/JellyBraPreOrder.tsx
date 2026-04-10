import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Shield, RotateCcw, Truck, Clock, Star, Zap, Heart, Package } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { trackViewContent, trackAddToCart, trackInitiateCheckout } from "@/hooks/useMetaPixel";

// Product images
import jellyBraNude from "@/assets/products/jelly-bra-nude.png";
import jellyBraWhite from "@/assets/products/jelly-bra-white.png";
import jellyBraOlive from "@/assets/products/jelly-bra-olive.png";
import jellyBraRose from "@/assets/products/jelly-bra-rose.png";
import jellyBraBlack from "@/assets/products/jelly-bra-black.png";

const JELLY_PRODUCT_HANDLE = "stary-bliss-jelly-bra";

const colorOptions = [
  { name: "Nude",  swatch: "#E8C4B8", image: jellyBraNude  },
  { name: "White", swatch: "#F0EDEA", image: jellyBraWhite },
  { name: "Olive", swatch: "#6B7B6B", image: jellyBraOlive },
  { name: "Rose",  swatch: "#C08B7C", image: jellyBraRose  },
  { name: "Black", swatch: "#1a1a1a", image: jellyBraBlack },
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Bio-Jelly Gel Support",
    desc: "W-shaped jelly bands replace underwire — lift and contour without a single poke or pressure point.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Second-Skin Comfort",
    desc: "Ultra-soft seamless fabric adapts to every movement, from morning meetings to midnight lounging.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Invisible Under Anything",
    desc: "Deep-V seamless design stays flat under your tightest tops. Zero lines. Zero bulge.",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "All Sizes Welcome",
    desc: "S to XXL with wide side wings and extender clasp. Designed for every body, every shape.",
  },
];

const reviews = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    initials: "SM",
    text: "I threw out every underwire bra I owned after trying this. It feels like wearing nothing but supports everything. Life-changing.",
    product: "Nude / M",
    verified: true,
  },
  {
    name: "Tanisha R.",
    location: "Toronto, CA",
    initials: "TR",
    text: "First wireless bra that actually holds everything in place at my size. The side wings are a total game changer. Already ordered two more.",
    product: "Black / XL",
    verified: true,
  },
  {
    name: "Mia L.",
    location: "Vancouver, BC",
    initials: "ML",
    text: "Saw it trending on TikTok and almost didn't believe it. Wore it 14 hours yesterday and forgot I had it on. This is my everyday bra now.",
    product: "Rose / S",
    verified: true,
  },
];

const tickerItems = [
  "\"The most comfortable bra I've ever owned\" — Sarah M.",
  "Free shipping on orders over $50",
  "Jelly bra — 500% search growth since May 2025",
  "\"Invisible under every single top I own\" — Jessica L.",
  "Ships to US & Canada · 30-day hassle-free returns",
  "\"Game changer for my wardrobe\" — Priya K., Toronto",
  "Buy 2 Save 15% · Buy 5 Save 30%",
];

// Countdown hook (24h from first visit)
function useCountdown() {
  const getEnd = () => {
    try {
      const stored = localStorage.getItem("puubra_preorder_end");
      if (stored) return parseInt(stored);
      const end = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("puubra_preorder_end", String(end));
      return end;
    } catch {
      return Date.now() + 24 * 60 * 60 * 1000;
    }
  };

  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, getEnd() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(Math.max(0, getEnd() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(timeLeft / 3_600_000);
  const m = Math.floor((timeLeft % 3_600_000) / 60_000);
  const s = Math.floor((timeLeft % 60_000) / 1_000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const JellyBraPreOrder = () => {
  const { toast } = useToast();
  const timer = useCountdown();
  const formRef = useRef<HTMLDivElement>(null);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [country, setCountry]     = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize]   = useState("");
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitted, setSubmitted]         = useState(false);

  // Shopify product
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  // Fetch Shopify product on mount
  useEffect(() => {
    fetchProductByHandle(JELLY_PRODUCT_HANDLE)
      .then((p) => {
        if (p) {
          setShopifyProduct(p);
          const firstVariant = p.variants?.edges?.[0]?.node;
          if (firstVariant) setSelectedVariantId(firstVariant.id);
          trackViewContent({
            content_name: p.title,
            content_ids: [p.id],
            content_type: "product",
            value: parseFloat(p.priceRange.minVariantPrice.amount),
            currency: p.priceRange.minVariantPrice.currencyCode,
          });
        }
      })
      .catch(() => {/* fallback to static data */});
  }, []);

  // Sync variant when size changes
  useEffect(() => {
    if (!shopifyProduct || !selectedSize) return;
    const match = shopifyProduct.variants?.edges?.find(
      (e) => e.node.selectedOptions?.some((o) => o.name === "Size" && o.value === selectedSize)
    );
    if (match) setSelectedVariantId(match.node.id);
  }, [selectedSize, shopifyProduct]);

  const price = shopifyProduct
    ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount).toFixed(2)
    : "24.00";

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) { toast({ title: "Please enter your full name.", variant: "destructive" }); return false; }
    if (!email.trim() || !email.includes("@"))  { toast({ title: "Please enter a valid email.", variant: "destructive" }); return false; }
    if (!country)                               { toast({ title: "Please select your country.", variant: "destructive" }); return false; }
    if (!selectedSize)                          { toast({ title: "Please select a size.", variant: "destructive" }); return false; }
    return true;
  };

  const handlePreOrder = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // Add to Shopify cart if variant available
      if (shopifyProduct && selectedVariantId) {
        await addItem({
          product: { node: shopifyProduct } as ShopifyProduct,
          variantId: selectedVariantId,
          variantTitle: `${selectedColor.name} / ${selectedSize}`,
          price: shopifyProduct.priceRange.minVariantPrice,
          quantity: 1,
          selectedOptions: [
            { name: "Color", value: selectedColor.name },
            { name: "Size",  value: selectedSize },
          ],
        });

        trackAddToCart({
          content_name: shopifyProduct.title,
          content_ids: [shopifyProduct.id],
          content_type: "product",
          value: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
          currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
        });

        trackInitiateCheckout({
          content_ids: [shopifyProduct.id],
          num_items: 1,
          value: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
          currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
        });
      }

      // Save lead data (hook to Klaviyo/Mailchimp here)
      console.info("Puubra pre-order lead:", {
        firstName, lastName, email, country,
        color: selectedColor.name,
        size: selectedSize,
        ts: new Date().toISOString(),
      });

      setSubmitted(true);

      // Redirect to checkout after brief moment
      setTimeout(() => {
        const checkoutUrl = getCheckoutUrl();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          toast({ title: "Checkout is being prepared. Please try again in a moment.", variant: "destructive" });
        }
      }, 1800);

    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">

        {/* ── COUNTDOWN BANNER ── */}
        <div className="bg-accent text-accent-foreground py-3 px-4 text-center text-sm tracking-wide flex items-center justify-center gap-3 flex-wrap">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>
            Pre-order special — <strong>15% off</strong> + priority shipping.&nbsp;
            Offer ends in <strong className="font-mono tracking-widest">{timer}</strong>
          </span>
          <span className="hidden md:inline text-accent-foreground/70">·</span>
          <span className="hidden md:inline text-accent-foreground/80">Only 47 spots left at launch price</span>
        </div>

        {/* ── HERO ── */}
        <section className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — image carousel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden bg-muted aspect-[3/4]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.name}
                  src={selectedColor.image}
                  alt={`Puubra Jelly Bra — ${selectedColor.name}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* NEW badge */}
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-sm tracking-wider uppercase">
                New 2026
              </div>

              {/* Trending badge */}
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-sm px-3 py-2 text-xs font-medium">
                🔥 Trending on TikTok
              </div>
            </div>

            {/* Color thumbnails */}
            <div className="flex gap-2 mt-4 justify-center">
              {colorOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                    selectedColor.name === c.name ? "border-accent scale-105" : "border-border opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent">
                New Collection 2026
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Comfort,{" "}
              <em className="not-italic text-accent">Refined.</em>
            </h1>

            <p className="text-muted-foreground font-light leading-relaxed mb-6 max-w-md">
              The Puubra Jelly Bra — wire-free support powered by bio-jelly gel strips. Lifts, shapes, and disappears completely under anything you wear.
            </p>

            {/* Stars + review count */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.7 · 89 reviews</span>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Wire-free jelly gel", "Seamless under tees", "S – XXL inclusive", "US & Canada shipping"].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-xs bg-muted border border-border rounded-sm px-3 py-1.5 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {p}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-serif text-3xl font-bold">${price}</span>
              <span className="text-muted-foreground line-through text-lg">${(parseFloat(price) * 1.18).toFixed(2)}</span>
              <span className="bg-accent/15 text-accent text-xs font-medium px-2 py-1 rounded-sm">15% OFF</span>
            </div>

            {/* ── FORM ── */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-accent/30 bg-accent/10 rounded-sm p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">You're in!</h3>
                  <p className="text-muted-foreground text-sm">
                    Redirecting you to checkout with your <span className="text-accent font-medium">15% pre-order discount</span> applied…
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-4">

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1.5">
                        First name
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className="bg-card border-border focus:border-accent focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1.5">
                        Last name
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="bg-card border-border focus:border-accent focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1.5">
                      Email address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="bg-card border-border focus:border-accent focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1.5">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 appearance-none"
                    >
                      <option value="">Select your country</option>
                      <option value="US">🇺🇸 United States</option>
                      <option value="CA">🇨🇦 Canada</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Size
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {sizeOptions.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`min-w-[46px] px-3 py-2.5 text-sm rounded-sm border transition-all duration-150 ${
                            selectedSize === sz
                              ? "bg-accent text-accent-foreground border-accent font-medium"
                              : "bg-card border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Color — <span className="text-foreground normal-case tracking-normal">{selectedColor.name}</span>
                    </label>
                    <div className="flex gap-2.5">
                      {colorOptions.map((c) => (
                        <button
                          key={c.name}
                          title={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`relative w-8 h-8 rounded-full transition-all duration-150 border-2 ${
                            selectedColor.name === c.name
                              ? "border-accent scale-110"
                              : "border-border hover:border-accent/50"
                          }`}
                          style={{ backgroundColor: c.swatch }}
                        >
                          {selectedColor.name === c.name && (
                            <Check className={`absolute inset-0 m-auto w-3.5 h-3.5 ${c.name === "White" || c.name === "Nude" ? "text-foreground" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={handlePreOrder}
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-medium tracking-wide btn-elegant group mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Processing…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Pre-Order Now — ${price}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>

                  {/* Trust row */}
                  <div className="flex items-center justify-center gap-6 pt-1 flex-wrap">
                    {[
                      { icon: <Shield className="w-3.5 h-3.5" />, text: "Secure checkout" },
                      { icon: <RotateCcw className="w-3.5 h-3.5" />, text: "30-day returns" },
                      { icon: <Truck className="w-3.5 h-3.5" />, text: "US & CA shipping" },
                    ].map(({ icon, text }) => (
                      <span key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {icon} {text}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── TICKER ── */}
        <div className="border-y border-border py-3 overflow-hidden bg-card">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                <span className="text-accent text-[10px]">✦</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── STATS ── */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { num: "50K+",  label: "Happy customers" },
                { num: "4.9",   label: "Average rating" },
                { num: "100+",  label: "Products in store" },
              ].map(({ num, label }) => (
                <div key={label} className="py-12 text-center">
                  <div className="font-serif text-4xl font-bold text-accent mb-2">{num}</div>
                  <div className="text-sm text-muted-foreground tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent block mb-3">Why the Jelly Bra</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">
                Where Comfort Meets{" "}
                <em className="not-italic text-accent">Transformation</em>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden">
              {features.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ backgroundColor: "hsl(var(--card))" }}
                  className="bg-background p-8 group"
                >
                  <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/20 transition-colors">
                    {icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="py-20 md:py-28 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent block mb-3">Customer Love</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-14">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">Based on 2,500+ verified reviews</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.name} className="bg-background border border-border rounded-sm p-7 relative">
                  <span className="absolute top-4 left-6 font-serif text-6xl leading-none text-accent/15 font-bold select-none">"</span>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm leading-relaxed text-foreground/80 mb-4">{r.text}</p>
                  <p className="text-xs text-accent tracking-wide font-medium uppercase mb-4">{r.product}</p>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-semibold text-accent">
                      {r.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        {r.verified && <Check className="w-3 h-3 text-accent" />}
                        Verified · {r.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent block mb-4">Limited Availability</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5">
              Ready to feel the{" "}
              <em className="not-italic text-accent">difference?</em>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-10">
              Join thousands of puubra women who've already pre-ordered. Only 47 spots remaining at launch pricing.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-base font-medium tracking-wide btn-elegant group inline-flex items-center gap-2"
            >
              Pre-Order Now — ${price}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              15% off · Secure Shopify checkout · Ships in 7–14 days
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default JellyBraPreOrder;
