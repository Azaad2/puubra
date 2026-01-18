import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-charcoal text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/20 rounded-full">
              <Gift className="h-8 w-8 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold flex items-center gap-2">
                Unlock a Free Gift
                <Sparkles className="h-5 w-5 text-gold" />
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Spend $75 or more and receive a free surprise gift with your order
              </p>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-gold hover:bg-gold-light text-charcoal font-medium px-8 whitespace-nowrap"
          >
            Shop Now & Unlock
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
