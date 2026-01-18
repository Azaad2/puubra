import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  product: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    date: "2 weeks ago",
    title: "The most comfortable bra I've ever owned!",
    content: "I've been searching for the perfect everyday bra for years, and I finally found it. The silk comfort bralette is incredibly soft, and the fit is perfect. I've already ordered two more in different colors!",
    product: "Silk Comfort Bralette",
    verified: true,
  },
  {
    id: "2",
    name: "Emily R.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    date: "1 month ago",
    title: "Finally, a bra that fits perfectly!",
    content: "The size guide was spot-on, and the quality exceeded my expectations. The lace detail is beautiful without being itchy. Worth every penny!",
    product: "Lace Detail Bra",
    verified: true,
  },
  {
    id: "3",
    name: "Jessica L.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    date: "3 weeks ago",
    title: "Game changer for my wardrobe",
    content: "The seamless design is invisible under all my clothes. I can finally wear those fitted tops without worrying about bra lines. The material is so soft and breathable!",
    product: "Seamless T-Shirt Bra",
    verified: true,
  },
  {
    id: "4",
    name: "Amanda K.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    date: "1 week ago",
    title: "Obsessed with the pajama set!",
    content: "The silk pajama set is absolutely luxurious. I feel like I'm at a spa every night. The quality is amazing and they wash beautifully.",
    product: "Silk Pajama Set",
    verified: true,
  },
];

export const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Customer Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-muted-foreground">
              Based on 2,500+ reviews
            </span>
          </motion.div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <ReviewCard review={reviews[currentIndex]} />
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReview}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? "bg-accent w-4" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextReview}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-card p-6 rounded-sm shadow-sm h-full flex flex-col">
      <Quote className="h-8 w-8 text-gold/30 mb-4" />
      
      {/* Rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? "fill-gold text-gold" : "text-muted"
            }`}
          />
        ))}
      </div>

      {/* Title & Content */}
      <h4 className="font-medium mb-2">{review.title}</h4>
      <p className="text-muted-foreground text-sm flex-grow line-clamp-4">
        {review.content}
      </p>

      {/* Product Tag */}
      <span className="inline-block text-xs text-accent mt-3 mb-4">
        {review.product}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{review.name}</span>
            {review.verified && (
              <span className="text-xs text-accent">✓ Verified</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{review.date}</span>
        </div>
      </div>
    </div>
  );
};
