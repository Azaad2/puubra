import { motion } from "framer-motion";
import { Truck, RefreshCw, Shield, Clock } from "lucide-react";

const trustBadges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Shipped within 24 hours",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-14 md:py-20 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <badge.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-medium text-base md:text-lg mb-1 text-foreground">
                {badge.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
