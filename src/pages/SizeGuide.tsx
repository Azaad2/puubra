import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SizeGuide = () => {
  const braSizes = [
    { band: "32", cups: ["A", "B", "C", "D", "DD"] },
    { band: "34", cups: ["A", "B", "C", "D", "DD", "DDD"] },
    { band: "36", cups: ["A", "B", "C", "D", "DD", "DDD"] },
    { band: "38", cups: ["B", "C", "D", "DD", "DDD"] },
    { band: "40", cups: ["B", "C", "D", "DD"] },
  ];

  const measurements = [
    { size: "XS", bust: "30-32", waist: "24-26", hips: "34-36" },
    { size: "S", bust: "32-34", waist: "26-28", hips: "36-38" },
    { size: "M", bust: "34-36", waist: "28-30", hips: "38-40" },
    { size: "L", bust: "36-38", waist: "30-32", hips: "40-42" },
    { size: "XL", bust: "38-40", waist: "32-34", hips: "42-44" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Size Guide</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive sizing guide. If you're between sizes, we recommend sizing up for comfort.
          </p>

          {/* How to Measure */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-6 text-accent">How to Measure</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-3">Band Size</h3>
                <p className="text-muted-foreground text-sm">
                  Measure around your ribcage, just under your bust. The tape should be snug but not tight. Round to the nearest even number.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-medium mb-3">Cup Size</h3>
                <p className="text-muted-foreground text-sm">
                  Measure around the fullest part of your bust. The difference between this and your band measurement determines your cup size.
                </p>
              </div>
            </div>
          </section>

          {/* Bra Size Chart */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-6 text-accent">Bra Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border border-border font-medium">Band</th>
                    <th className="text-left p-3 border border-border font-medium">Available Cups</th>
                  </tr>
                </thead>
                <tbody>
                  {braSizes.map((row) => (
                    <tr key={row.band}>
                      <td className="p-3 border border-border font-medium">{row.band}</td>
                      <td className="p-3 border border-border text-muted-foreground">{row.cups.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* General Size Chart */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-6 text-accent">General Sizing (Tops, Pajamas)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border border-border font-medium">Size</th>
                    <th className="text-left p-3 border border-border font-medium">Bust (in)</th>
                    <th className="text-left p-3 border border-border font-medium">Waist (in)</th>
                    <th className="text-left p-3 border border-border font-medium">Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((row) => (
                    <tr key={row.size}>
                      <td className="p-3 border border-border font-medium">{row.size}</td>
                      <td className="p-3 border border-border text-muted-foreground">{row.bust}</td>
                      <td className="p-3 border border-border text-muted-foreground">{row.waist}</td>
                      <td className="p-3 border border-border text-muted-foreground">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Need Help */}
          <section className="text-center bg-card p-8 rounded-lg border border-border">
            <h2 className="font-serif text-2xl mb-3">Still Not Sure?</h2>
            <p className="text-muted-foreground mb-4">
              Our fit specialists are here to help you find your perfect size.
            </p>
            <a href="mailto:hello@puubra.com" className="text-accent hover:underline">
              Contact us at hello@puubra.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
