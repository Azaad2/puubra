import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts, categories, getPostsByCategory } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPosts = getPostsByCategory(activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
              The buubra Journal
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Style tips, care guides, and behind-the-scenes stories from the world of buubra.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category 
                    ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  featured={index === 0 && activeCategory === "All"}
                />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
