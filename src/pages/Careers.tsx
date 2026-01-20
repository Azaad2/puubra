import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Sparkles, Users, Coffee, Plane } from "lucide-react";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage" },
    { icon: Coffee, title: "Flexible Work", description: "Remote-friendly with flexible hours" },
    { icon: Sparkles, title: "Product Perks", description: "Generous employee discount on all buubra products" },
    { icon: Plane, title: "PTO", description: "Unlimited paid time off and paid parental leave" },
    { icon: Users, title: "Team Culture", description: "Regular team events and retreats" },
    { icon: Briefcase, title: "Growth", description: "Professional development budget and mentorship" },
  ];

  const openPositions = [
    {
      title: "Senior Fashion Designer",
      department: "Design",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
    },
    {
      title: "E-commerce Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Customer Experience Lead",
      department: "Customer Support",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Supply Chain Coordinator",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-4xl mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Join Our Team</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're building a team of passionate, creative individuals who share our mission 
            to empower women through thoughtfully designed lingerie.
          </p>
        </section>

        {/* Culture Section */}
        <section className="bg-card py-16 mb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-serif text-3xl mb-6">Our Culture</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              At buubra, we believe in collaboration, creativity, and celebrating each other's wins. 
              We're a diverse team united by our passion for making women feel confident and beautiful.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <p className="font-serif text-3xl text-accent mb-2">35+</p>
                <p className="text-muted-foreground">Team Members</p>
              </div>
              <div className="p-4">
                <p className="font-serif text-3xl text-accent mb-2">12</p>
                <p className="text-muted-foreground">Countries Represented</p>
              </div>
              <div className="p-4">
                <p className="font-serif text-3xl text-accent mb-2">60%</p>
                <p className="text-muted-foreground">Remote Workers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <h2 className="font-serif text-3xl text-center mb-12">Benefits & Perks</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card p-6 rounded-lg border border-border">
                <benefit.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-medium text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <h2 className="font-serif text-3xl text-center mb-12">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div 
                key={position.title} 
                className="bg-card p-6 rounded-lg border border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="font-medium text-lg">{position.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">{position.department}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{position.location}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{position.type}</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = `mailto:careers@buubra.com?subject=Application: ${position.title}`}
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* No Match CTA */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="font-serif text-2xl mb-4">Don't See the Right Fit?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute to buubra.
            </p>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => window.location.href = 'mailto:careers@buubra.com?subject=General Application'}
            >
              Send Your Resume
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
