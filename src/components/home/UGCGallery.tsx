import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const ugcImages = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1597614042011-fdf56f9e7c87?q=80&w=400&auto=format&fit=crop",
    username: "@sarah_style",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=400&auto=format&fit=crop",
    username: "@emilyrose",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop",
    username: "@jessica_joy",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop",
    username: "@amanda_k",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1615196534519-c3e7fc93e7af?q=80&w=400&auto=format&fit=crop",
    username: "@mia_fashion",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=400&auto=format&fit=crop",
    username: "@olivia_m",
  },
];

export const UGCGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Instagram className="h-5 w-5 text-accent" />
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              @shapesilk
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
          >
            Styled by You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Share your ShapeSilk moments with #ShapeSilkStyle for a chance to be featured
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
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={item.image}
                alt={`User generated content by ${item.username}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <Instagram className="h-6 w-6 mx-auto mb-2" />
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
          className="text-center mt-8"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};
