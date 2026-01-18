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
    <section className="py-12 md:py-16 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <badge.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-medium text-sm md:text-base mb-1">
                {badge.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
