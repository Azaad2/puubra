import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collections = [
  {
    name: "Bras",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1635&auto=format&fit=crop",
    href: "/collections/bras",
    description: "Comfort meets style",
  },
  {
    name: "Tops",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1740&auto=format&fit=crop",
    href: "/collections/tops",
    description: "Effortless elegance",
  },
  {
    name: "Pantyhose",
    image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1665&auto=format&fit=crop",
    href: "/collections/pantyhose",
    description: "Seamless sophistication",
  },
  {
    name: "Pajama Sets",
    image: "https://images.unsplash.com/photo-1615196534519-c3e7fc93e7af?q=80&w=1664&auto=format&fit=crop",
    href: "/collections/pajama-sets",
    description: "Luxurious loungewear",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FeaturedCollections = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Explore our curated collections designed for every mood and moment
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {collections.map((collection) => (
            <motion.div key={collection.name} variants={itemVariants}>
              <Link
                to={collection.href}
                className="group block relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl text-white font-medium mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-white/70 text-sm hidden md:block">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm mt-2 group-hover:translate-x-2 transition-transform duration-300">
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
