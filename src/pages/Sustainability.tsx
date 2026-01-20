import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Recycle, Droplets, Package, Heart, TreePine } from "lucide-react";

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "Sustainable Materials",
      description: "We use organic cotton, recycled nylon, and eco-friendly dyes in our products wherever possible.",
    },
    {
      icon: Recycle,
      title: "Recycled Packaging",
      description: "Our packaging is made from 100% recycled and recyclable materials. No plastic, ever.",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description: "Our manufacturing partners use water-saving techniques that reduce consumption by up to 50%.",
    },
    {
      icon: Package,
      title: "Minimal Waste",
      description: "We design to minimize fabric waste and donate excess materials to local craft programs.",
    },
    {
      icon: Heart,
      title: "Ethical Production",
      description: "Fair wages, safe working conditions, and respect for workers' rights are non-negotiable.",
    },
    {
      icon: TreePine,
      title: "Carbon Offset",
      description: "We offset our shipping emissions through verified reforestation projects.",
    },
  ];

  const goals = [
    { target: "100%", label: "Sustainable materials by 2026" },
    { target: "Zero", label: "Waste to landfill by 2027" },
    { target: "Carbon", label: "Neutral operations by 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-4xl mb-16 text-center">
          <div className="inline-block bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌿 Our Commitment to the Planet
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Sustainability</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            At buubra, we believe that beautiful lingerie shouldn't come at the cost of our planet. 
            We're committed to making choices that are better for you and the environment.
          </p>
        </section>

        {/* Initiatives Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <h2 className="font-serif text-3xl text-center mb-12">Our Initiatives</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((item) => (
              <div key={item.title} className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Section */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-serif text-3xl text-center mb-12">Our Goals</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {goals.map((goal) => (
                <div key={goal.label}>
                  <p className="font-serif text-4xl text-accent font-semibold mb-2">{goal.target}</p>
                  <p className="text-muted-foreground">{goal.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="container mx-auto px-4 max-w-4xl py-16">
          <h2 className="font-serif text-3xl text-center mb-8">How You Can Help</h2>
          <div className="bg-card p-8 rounded-lg border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Care for Your Pieces</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Proper care extends the life of your lingerie. Hand wash when possible, 
                  air dry, and store properly to keep your pieces looking beautiful longer.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Recycle Your Packaging</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  All buubra packaging is recyclable. Please recycle the box, tissue paper, 
                  and any inserts through your local recycling program.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Donate Gently Used Items</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Instead of throwing away lingerie you no longer wear, consider donating 
                  to organizations that support women in need.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Choose Quality Over Quantity</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Invest in fewer, higher-quality pieces that last. Our lingerie is designed 
                  to be durable and timeless, reducing the need for frequent replacements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-rose py-12 text-center">
          <div className="container mx-auto px-4">
            <p className="text-white text-lg mb-2">
              Questions about our sustainability efforts?
            </p>
            <a 
              href="mailto:hello@buubra.com" 
              className="text-white font-medium underline hover:no-underline"
            >
              Get in touch →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
