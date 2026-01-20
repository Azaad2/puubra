import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero/hero-lingerie.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 40%, hsl(var(--background) / 0.3) 70%, transparent 100%), 
            url('${heroImage}')`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            New Collection 2026
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6"
          >
            Confidence,
            <span className="block text-gradient-rose mt-2">Refined.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/70 text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
          >
            Discover our premium collection of comfortable, elegant lingerie 
            designed to make you feel confident and beautiful every day.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-base font-medium btn-elegant shadow-rose"
              onClick={() => window.location.href = '/collections/bras'}
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground/50 px-10 py-7 text-base font-medium btn-elegant"
              onClick={() => window.location.href = '/collections/bras'}
            >
              View Lookbook
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === 0 ? "bg-accent w-10" : "bg-foreground/20 hover:bg-foreground/40 w-2"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
