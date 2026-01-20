import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, Award, Users, Leaf } from "lucide-react";
import brandStoryImage from "@/assets/brand/brand-story.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Comfort First",
      description: "Every piece is designed with your comfort as the top priority, using the softest materials and thoughtful construction.",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description: "We work with skilled artisans to create lingerie that's built to last, with attention to every stitch and detail.",
    },
    {
      icon: Users,
      title: "Inclusive Sizing",
      description: "Beauty comes in all sizes. Our range is designed to celebrate and support every body type.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "We're committed to reducing our environmental impact through responsible sourcing and eco-friendly packaging.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl mb-6">About buubra</h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded with a simple mission: to create lingerie that makes every woman feel confident, 
                comfortable, and beautiful in her own skin.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At buubra, we believe that what you wear underneath matters. It sets the foundation for 
                how you carry yourself throughout the day. That's why we've dedicated ourselves to crafting 
                pieces that combine elegance with everyday comfort.
              </p>
            </div>
            <div className="relative">
              <img 
                src={brandStoryImage} 
                alt="buubra brand story" 
                className="rounded-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-4 rounded-lg">
                <p className="font-serif text-3xl font-semibold">2020</p>
                <p className="text-sm">Founded</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 max-w-4xl py-16 text-center">
          <h2 className="font-serif text-3xl mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            "To empower women through thoughtfully designed lingerie that celebrates their unique beauty, 
            supports their daily lives, and makes them feel extraordinary in the ordinary moments."
          </p>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-rose py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <p className="font-serif text-4xl font-semibold mb-2">50K+</p>
                <p className="text-white/80">Happy Customers</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-semibold mb-2">25+</p>
                <p className="text-white/80">Size Options</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-semibold mb-2">50+</p>
                <p className="text-white/80">Countries Shipped</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-semibold mb-2">4.9★</p>
                <p className="text-white/80">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
