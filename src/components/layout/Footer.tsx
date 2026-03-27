import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/puubra-logo.png";

const footerLinks = {
  shop: [
    { name: "Bras", href: "/collections/bras" },
    { name: "Tops", href: "/collections/tops" },
    { name: "Pantyhose", href: "/collections/pantyhose" },
    { name: "Pajama Sets", href: "/collections/pajama-sets" },
    { name: "Sale", href: "/sale" },
  ],
  help: [
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/our-story" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Careers", href: "/careers" },
    { name: "Journal", href: "/blog" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Welcome to the puubra family!",
      description: "Check your inbox for 10% off your first order.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-14">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-3 text-foreground">
              Join the puubra Family
            </h3>
            <p className="text-muted-foreground text-base mb-6">
              Subscribe for exclusive offers, new arrivals, and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="puubra" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Confidence, refined. Premium lingerie designed for every body.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-accent">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-accent">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-accent">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-accent">Contact</h4>
            <a
              href="mailto:hello@puubra.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@puubra.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} puubra. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              {paymentMethods.map((method) => (
                <span key={method} className="px-2 py-1 bg-muted rounded">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
