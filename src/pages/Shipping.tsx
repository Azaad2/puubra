import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Truck, Clock, Globe, Package } from "lucide-react";

const Shipping = () => {
  const shippingOptions = [
    {
      icon: Truck,
      title: "Standard Shipping",
      time: "5-7 Business Days",
      price: "$5.99",
      note: "Free on orders over $75",
    },
    {
      icon: Clock,
      title: "Express Shipping",
      time: "2-3 Business Days",
      price: "$12.99",
      note: "Order by 2pm for same-day dispatch",
    },
    {
      icon: Globe,
      title: "International Shipping",
      time: "7-14 Business Days",
      price: "From $19.99",
      note: "Available to 50+ countries",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Shipping Information</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We ship worldwide with care. Every order is beautifully packaged in our signature rose gold boxes.
          </p>

          {/* Shipping Options */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {shippingOptions.map((option) => (
                <div key={option.title} className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{option.time}</p>
                  <p className="text-accent font-semibold text-xl mb-2">{option.price}</p>
                  <p className="text-muted-foreground text-xs">{option.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Order Processing */}
          <section className="mb-12 bg-card p-8 rounded-lg border border-border">
            <div className="flex items-start gap-4">
              <Package className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-2xl mb-4">Order Processing</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Orders placed before 2pm EST are processed the same business day</li>
                  <li>• You'll receive a tracking number via email once your order ships</li>
                  <li>• All items are carefully inspected and packaged by hand</li>
                  <li>• Gift wrapping is available at checkout for $4.99</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-2xl mb-6 text-accent">Shipping FAQ</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Can I change my shipping address after ordering?</h3>
                <p className="text-muted-foreground text-sm">
                  Contact us within 2 hours of placing your order and we'll do our best to update it.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Do you ship to P.O. boxes?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we ship to P.O. boxes via USPS for standard shipping only.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-2">What about customs for international orders?</h3>
                <p className="text-muted-foreground text-sm">
                  International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
