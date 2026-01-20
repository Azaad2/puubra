import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import brandStoryImage from "@/assets/brand/brand-story.jpg";

const OurStory = () => {
  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "buubra was born from a simple frustration: finding comfortable, beautiful lingerie that didn't cost a fortune. Our founder set out to change that.",
    },
    {
      year: "2021",
      title: "First Collection",
      description: "We launched our signature Jelly Bra collection, which sold out within weeks. The overwhelming response showed us we were onto something special.",
    },
    {
      year: "2022",
      title: "Expanding Horizons",
      description: "We introduced pantyhose, loungewear, and expanded our size range. Our community grew to over 25,000 loyal customers.",
    },
    {
      year: "2023",
      title: "Going Global",
      description: "buubra went international, shipping to over 50 countries. We also launched our sustainability initiative to reduce our environmental footprint.",
    },
    {
      year: "2024",
      title: "Innovation Continues",
      description: "We introduced revolutionary new fabrics and designs, continuing our mission to make every woman feel confident and beautiful.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-4xl mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Our Story</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From a small idea to a global community of confident women, here's how buubra came to be.
          </p>
        </section>

        {/* Main Story */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src={brandStoryImage} 
              alt="buubra story" 
              className="rounded-lg w-full h-[500px] object-cover"
            />
            <div>
              <h2 className="font-serif text-3xl mb-6">It Started With a Question</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  "Why is it so hard to find lingerie that's both comfortable AND beautiful?"
                </p>
                <p>
                  This question haunted our founder after years of settling for underwear that 
                  either looked great but felt terrible, or felt comfortable but looked like 
                  something her grandmother would wear.
                </p>
                <p>
                  She knew there had to be a better way. So she set out to create it herself. 
                  With a background in fashion design and a passion for empowering women, 
                  she spent months researching fabrics, testing designs, and perfecting the 
                  fit until she created something she was proud to wear every day.
                </p>
                <p>
                  That first collection was shared with friends who shared it with their friends. 
                  Word spread. And buubra was born.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-serif text-3xl text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex gap-6 md:gap-12">
                    <div className="flex-shrink-0 w-16 text-right">
                      <span className="font-serif text-2xl text-accent font-semibold">{item.year}</span>
                    </div>
                    <div className="relative pb-8">
                      {/* Dot */}
                      <div className="absolute -left-[29px] top-2 w-4 h-4 bg-accent rounded-full hidden md:block" />
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="container mx-auto px-4 max-w-3xl py-16 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-accent italic mb-6">
            "Every woman deserves to feel beautiful in her own skin. That's not just our tagline—it's our promise."
          </blockquote>
          <p className="text-muted-foreground">— Founder, buubra</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;
