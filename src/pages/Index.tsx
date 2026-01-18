import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BestSellers } from "@/components/home/BestSellers";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BrandStory } from "@/components/home/BrandStory";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { UGCGallery } from "@/components/home/UGCGallery";
import { TrustBadges } from "@/components/home/TrustBadges";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedCollections />
        <BestSellers />
        <PromoBanner />
        <BrandStory />
        <CustomerReviews />
        <UGCGallery />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
