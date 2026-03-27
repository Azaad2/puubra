import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Your satisfaction is our priority. We offer hassle-free returns within 30 days of purchase.
          </p>

          {/* Policy Highlights */}
          <section className="mb-12 grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Clock className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">30-Day Window</h3>
              <p className="text-muted-foreground text-sm">Return or exchange within 30 days of delivery</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <RotateCcw className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Free Returns</h3>
              <p className="text-muted-foreground text-sm">Prepaid return labels for US customers</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <CheckCircle className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Easy Process</h3>
              <p className="text-muted-foreground text-sm">Simple online return portal</p>
            </div>
          </section>

          {/* Eligible Items */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-6 text-accent">What Can Be Returned?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="font-medium">Eligible for Return</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Unworn items with tags attached</li>
                  <li>• Items in original packaging</li>
                  <li>• Purchases within 30 days</li>
                  <li>• Items without perfume or deodorant marks</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <h3 className="font-medium">Not Eligible</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Final sale items</li>
                  <li>• Worn or washed items</li>
                  <li>• Items without tags</li>
                  <li>• Gift cards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Return */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-6 text-accent">How to Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium mb-1">Start Your Return</h3>
                  <p className="text-muted-foreground text-sm">Email us at hello@puubra.com with your order number and reason for return.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium mb-1">Receive Your Label</h3>
                  <p className="text-muted-foreground text-sm">We'll email you a prepaid return shipping label within 24 hours.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium mb-1">Ship It Back</h3>
                  <p className="text-muted-foreground text-sm">Pack items securely and drop off at any carrier location.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium mb-1">Get Your Refund</h3>
                  <p className="text-muted-foreground text-sm">Refunds are processed within 5-7 business days of receiving your return.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center bg-card p-8 rounded-lg border border-border">
            <h2 className="font-serif text-2xl mb-3">Questions About Returns?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer care team is happy to help.
            </p>
            <a href="mailto:hello@puubra.com" className="text-accent hover:underline">
              hello@puubra.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
