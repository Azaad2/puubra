import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const Sale = () => {
  // Filter products that are on sale (have originalPrice)
  const saleProducts = products.filter(product => product.originalPrice);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <section className="bg-gradient-rose py-12 mb-12">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Sale</h1>
            <p className="text-lg text-white/90 max-w-xl mx-auto">
              Shop our best deals on premium lingerie. Limited time only!
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl">
          {saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-accent font-semibold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-serif text-2xl mb-4">No Sale Items Currently</h2>
              <p className="text-muted-foreground mb-8">
                Check back soon for amazing deals on our premium lingerie collection.
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/collections/bras">Shop All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sale;
