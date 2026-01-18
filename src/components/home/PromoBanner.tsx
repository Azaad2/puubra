import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoBanner = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-rose text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Gift className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold flex items-center gap-2">
                Unlock a Free Gift
                <Sparkles className="h-6 w-6 text-white/80" />
              </h3>
              <p className="text-white/80 text-base mt-1">
                Spend $75 or more and receive a free surprise gift with your order
              </p>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 font-medium px-10 py-6 whitespace-nowrap"
          >
            Shop Now & Unlock
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
