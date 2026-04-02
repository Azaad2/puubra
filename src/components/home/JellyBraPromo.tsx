import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import jellyBraNude from "@/assets/products/jelly-bra-nude.png";
import jellyBraRose from "@/assets/products/jelly-bra-rose.png";
import jellyBraBlack from "@/assets/products/jelly-bra-black.png";

const images = [jellyBraNude, jellyBraRose, jellyBraBlack];

export const JellyBraPromo = () => {
  return (
    <section className="py-0 overflow-hidden border-y border-border">
      <div className="grid md:grid-cols-2 min-h-[500px]">

        {/* Left — images collage */}
        <div className="relative bg-muted overflow-hidden flex items-center justify-center min-h-[320px] md:min-h-full">
          <div className="relative w-full h-full min-h-[320px] flex items-center justify-center">
            {/* Main center image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-20 w-48 md:w-56 rounded-sm overflow-hidden shadow-2xl border border-border"
            >
              <img src={jellyBraNude} alt="Jelly Bra Nude" className="w-full object-cover" />
            </motion.div>

            {/* Left offset image */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 w-32 md:w-40 rounded-sm overflow-hidden border border-border shadow-lg"
            >
              <img src={jellyBraRose} alt="Jelly Bra Rose" className="w-full object-cover" />
            </motion.div>

            {/* Right offset image */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 w-32 md:w-40 rounded-sm overflow-hidden border border-border shadow-lg"
            >
              <img src={jellyBraBlack} alt="Jelly Bra Black" className="w-full object-cover" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-30 bg-background/90 backdrop-blur-sm border border-border rounded-sm px-3 py-2 text-xs font-medium flex items-center gap-2"
            >
              🔥 Trending on TikTok
            </motion.div>

            {/* Stars badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 bg-background/90 backdrop-blur-sm border border-border rounded-sm px-3 py-2 text-xs flex items-center gap-1.5"
            >
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="font-medium">4.7</span>
              <span className="text-muted-foreground">· 89 reviews</span>
            </motion.div>
          </div>
        </div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 bg-card"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent">
              Just Launched
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            The Jelly Bra
            <span className="block text-accent italic font-normal">is here.</span>
          </h2>

          <p className="text-muted-foreground font-light leading-relaxed mb-6 max-w-md">
            Bio-jelly gel strips replace underwire entirely. Wire-free lift, seamless fit, invisible under anything. The bra you've been waiting for.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: <Zap className="w-3 h-3" />, text: "Jelly-gel support" },
              { icon: null, text: "Wire-free" },
              { icon: null, text: "Sizes S–XXL" },
              { icon: null, text: "5 colors" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs bg-background border border-border rounded-sm px-3 py-1.5 text-muted-foreground"
              >
                {icon && <span className="text-accent">{icon}</span>}
                {text}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-serif text-2xl font-bold">$24.00</span>
            <span className="bg-accent/15 text-accent text-xs font-medium px-2 py-1 rounded-sm">
              15% off pre-order
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/jelly-bra">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-sm font-medium btn-elegant shadow-rose group">
                Pre-Order Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/product/stary-bliss-jelly-bra">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-foreground/5 hover:border-accent/50 px-8 py-6 text-sm font-medium btn-elegant"
              >
                View Details
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
