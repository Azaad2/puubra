import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const BrandStory = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Video Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-border/50">
              <img
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1740&auto=format&fit=crop"
                alt="ShapeSilk brand story"
                className="w-full h-full object-cover"
              />
              {/* Video Play Button Overlay */}
              <button className="absolute inset-0 flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors group">
                <div className="w-20 h-20 rounded-full bg-gradient-rose flex items-center justify-center group-hover:scale-110 transition-transform shadow-rose">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </button>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8"
          >
            <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Where Comfort Meets
              <span className="block text-gradient-rose mt-2">Transformation</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                At ShapeSilk, we believe every woman deserves to feel confident, 
                comfortable, and beautiful in her own skin. Our journey began with 
                a simple mission: to create lingerie that doesn't compromise on 
                comfort or style.
              </p>
              <p>
                Each piece is thoughtfully designed using premium materials and 
                innovative techniques, ensuring a perfect fit that moves with you 
                throughout your day.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 my-10 py-10 border-y border-border">
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl font-semibold text-gradient-rose">50K+</span>
                <span className="text-sm text-muted-foreground">Happy Customers</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl font-semibold text-gradient-rose">4.9</span>
                <span className="text-sm text-muted-foreground">Average Rating</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl font-semibold text-gradient-rose">100+</span>
                <span className="text-sm text-muted-foreground">Products</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 shadow-rose"
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
