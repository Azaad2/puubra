import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const announcements = [
  "🔥 Jelly Bra Pre-Order Now Live — 15% Off Launch Price",
  "Free Shipping on Orders Over $50 | Buy 2 Save 15%",
  "New: Stary Bliss Jelly Bra — Wire-Free Lift ✨",
];

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-rose text-white py-2.5 px-4 relative">
      <div className="container mx-auto flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm tracking-wide text-center"
          >
            {announcements[currentIndex]}
          </motion.p>
        </AnimatePresence>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
