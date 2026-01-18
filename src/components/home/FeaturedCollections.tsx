import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import brasCover from "@/assets/collections/bras-cover.jpg";
import topsCover from "@/assets/collections/tops-cover.jpg";
import pantyhoseCover from "@/assets/collections/pantyhose-cover.jpg";
import pajamasCover from "@/assets/collections/pajamas-cover.jpg";

const collections = [
  {
    name: "Bras",
    image: brasCover,
    href: "/collections/bras",
    description: "Comfort meets style",
  },
  {
    name: "Tops",
    image: topsCover,
    href: "/collections/tops",
    description: "Effortless elegance",
  },
  {
    name: "Pantyhose",
    image: pantyhoseCover,
    href: "/collections/pantyhose",
    description: "Seamless sophistication",
  },
  {
    name: "Pajama Sets",
    image: pajamasCover,
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
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl font-semibold mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto text-lg"
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
                className="group block relative aspect-[3/4] overflow-hidden rounded-sm border border-border/50 hover:border-accent/50 transition-colors"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground font-medium mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-foreground/60 text-sm hidden md:block">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm mt-3 group-hover:translate-x-2 transition-transform duration-300">
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
