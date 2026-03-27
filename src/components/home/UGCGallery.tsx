import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import ugc1 from "@/assets/ugc/ugc-1.jpg";
import ugc2 from "@/assets/ugc/ugc-2.jpg";
import ugc3 from "@/assets/ugc/ugc-3.jpg";
import ugc4 from "@/assets/ugc/ugc-4.jpg";
import ugc5 from "@/assets/ugc/ugc-5.jpg";
import ugc6 from "@/assets/ugc/ugc-6.jpg";

const ugcImages = [
  {
    id: "1",
    image: ugc1,
    username: "@sarah_style",
  },
  {
    id: "2",
    image: ugc2,
    username: "@emilyrose",
  },
  {
    id: "3",
    image: ugc3,
    username: "@jessica_joy",
  },
  {
    id: "4",
    image: ugc4,
    username: "@amanda_k",
  },
  {
    id: "5",
    image: ugc5,
    username: "@mia_fashion",
  },
  {
    id: "6",
    image: ugc6,
    username: "@olivia_m",
  },
];

export const UGCGallery = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Instagram className="h-5 w-5 text-accent" />
            <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase">
              @puubra
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-semibold mb-4"
          >
            Styled by You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto text-lg"
          >
            Share your puubra moments with #puubraStyle for a chance to be featured
          </motion.p>
        </div>

        {/* UGC Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4"
        >
          {ugcImages.map((item, index) => (
            <motion.a
              key={item.id}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-sm border border-border/50 hover:border-accent/50 transition-colors"
            >
              <img
                src={item.image}
                alt={`User generated content by ${item.username}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-foreground">
                  <Instagram className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="text-sm font-medium">{item.username}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors text-lg"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};
