import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BestSellers } from "@/components/home/BestSellers";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BrandStory } from "@/components/home/BrandStory";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { UGCGallery } from "@/components/home/UGCGallery";
import { TrustBadges } from "@/components/home/TrustBadges";
import { JellyBraPromo } from "@/components/home/JellyBraPromo";
import { BlogPreview } from "@/components/home/BlogPreview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="puubra — Premium Lingerie & Loungewear"
        description="Premium, comfortable lingerie designed to make you feel confident every day. Shop bras, the signature Jelly Bra, and more at puubra."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "puubra",
          url: "https://puubra.com/",
        }}
      />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <JellyBraPromo />
        <BestSellers />
        <PromoBanner />
        <FeaturedCollections />
        <BrandStory />
        <BlogPreview />
        <CustomerReviews />
        <UGCGallery />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
