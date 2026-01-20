import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days. International orders typically arrive within 7-14 business days.",
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on all orders over $75 within the US.",
        },
        {
          q: "Can I track my order?",
          a: "Absolutely! Once your order ships, you'll receive an email with a tracking number. You can use this to track your package in real-time.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer free returns within 30 days of delivery. Items must be unworn, with tags attached, and in original packaging.",
        },
        {
          q: "How do I exchange an item?",
          a: "Email us at hello@buubra.com with your order number and the item/size you'd like to exchange for. We'll guide you through the process.",
        },
        {
          q: "How long do refunds take?",
          a: "Refunds are processed within 5-7 business days of receiving your return. The refund will appear on your original payment method.",
        },
      ],
    },
    {
      title: "Sizing & Fit",
      questions: [
        {
          q: "How do I find my size?",
          a: "Check our Size Guide page for detailed measurement instructions and size charts. If you're between sizes, we recommend sizing up for comfort.",
        },
        {
          q: "What if my item doesn't fit?",
          a: "No problem! We offer free exchanges within 30 days. Simply contact us and we'll help you find the perfect size.",
        },
        {
          q: "Are your bras true to size?",
          a: "Our bras are designed to fit true to size. However, we recommend measuring yourself before ordering, as sizing can vary by style.",
        },
      ],
    },
    {
      title: "Product Care",
      questions: [
        {
          q: "How should I wash my buubra products?",
          a: "We recommend hand washing in cold water with mild detergent. Lay flat to dry. Avoid wringing or twisting. For best results, use a lingerie bag if machine washing.",
        },
        {
          q: "Can I put bras in the dryer?",
          a: "We don't recommend using a dryer as heat can damage the elastic and shape. Always air dry your delicates.",
        },
      ],
    },
    {
      title: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Shop Pay.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information.",
        },
        {
          q: "Do you offer gift cards?",
          a: "Yes! Digital gift cards are available in various denominations and never expire.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>

          {faqCategories.map((category, categoryIndex) => (
            <section key={category.title} className="mb-10">
              <h2 className="font-serif text-2xl mb-4 text-accent">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${categoryIndex}-${index}`}
                    className="bg-card border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}

          {/* Contact */}
          <section className="text-center bg-card p-8 rounded-lg border border-border">
            <h2 className="font-serif text-2xl mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-4">
              We're here to help! Reach out to our customer care team.
            </p>
            <a href="mailto:hello@buubra.com" className="text-accent hover:underline">
              hello@buubra.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
