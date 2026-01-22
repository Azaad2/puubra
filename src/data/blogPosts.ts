export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-find-your-perfect-bra-size",
    title: "How to Find Your Perfect Bra Size",
    excerpt: "Discover the secrets to finding a bra that fits like a dream. Our comprehensive guide walks you through measuring techniques and fit tips.",
    content: `
      <p>Finding the perfect bra size is a journey that many women struggle with. Studies show that up to 80% of women are wearing the wrong bra size. At buubra, we believe that every woman deserves to feel comfortable and confident in her lingerie.</p>
      
      <h2>Step 1: Measure Your Band Size</h2>
      <p>Using a soft measuring tape, measure around your ribcage, just under your bust. Make sure the tape is snug but not too tight. Round to the nearest whole number. If the number is even, that's your band size. If it's odd, round up to the next even number.</p>
      
      <h2>Step 2: Measure Your Bust</h2>
      <p>Measure around the fullest part of your bust, keeping the tape parallel to the ground. Don't pull too tight—you want a comfortable measurement.</p>
      
      <h2>Step 3: Calculate Your Cup Size</h2>
      <p>Subtract your band measurement from your bust measurement. Each inch of difference corresponds to a cup size: 1" = A, 2" = B, 3" = C, 4" = D, and so on.</p>
      
      <h2>Signs of a Good Fit</h2>
      <ul>
        <li>The band sits level around your body</li>
        <li>The center gore lies flat against your chest</li>
        <li>Your breasts are fully contained in the cups</li>
        <li>The straps stay in place without digging in</li>
      </ul>
      
      <p>Remember, sizes can vary between brands and styles. Our wireless bras are designed with flexible sizing to accommodate natural variations in your body.</p>
    `,
    author: "Emma Chen",
    date: "2024-01-15",
    category: "Style Tips",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop",
    readTime: 5
  },
  {
    id: "2",
    slug: "ultimate-guide-to-wireless-bras",
    title: "The Ultimate Guide to Wireless Bras",
    excerpt: "Why wireless bras are revolutionizing comfort without sacrificing support. Learn about the technology behind our signature designs.",
    content: `
      <p>Gone are the days when wireless meant unsupportive. Modern wireless bras, like our signature Jelly Bra collection, use innovative materials and construction techniques to provide exceptional support without the discomfort of traditional underwires.</p>
      
      <h2>The Evolution of Wireless Support</h2>
      <p>Traditional bras relied on rigid underwires to provide lift and shape. However, advances in fabric technology and bra engineering have made it possible to achieve the same results with more comfortable alternatives.</p>
      
      <h2>Benefits of Going Wireless</h2>
      <ul>
        <li>No digging or poking from wires</li>
        <li>Better for lymphatic circulation</li>
        <li>More comfortable for all-day wear</li>
        <li>Perfect for travel and active lifestyles</li>
        <li>Easier to wash and maintain</li>
      </ul>
      
      <h2>Who Should Try Wireless?</h2>
      <p>Wireless bras are perfect for women of all sizes. Whether you're an A cup or a DD, our wireless designs offer customized support that moves with your body.</p>
    `,
    author: "Sophie Laurent",
    date: "2024-01-10",
    category: "Style Tips",
    image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800&auto=format&fit=crop",
    readTime: 4
  },
  {
    id: "3",
    slug: "caring-for-your-lingerie",
    title: "5 Ways to Care for Your Lingerie",
    excerpt: "Extend the life of your favorite pieces with these essential care tips. Your delicates deserve the best treatment.",
    content: `
      <p>Quality lingerie is an investment, and with proper care, your favorite pieces can last for years. Here are our top tips for keeping your buubra collection in pristine condition.</p>
      
      <h2>1. Hand Wash When Possible</h2>
      <p>The gentlest way to clean your bras is by hand. Use lukewarm water and a mild detergent designed for delicates. Gently swirl and squeeze—never wring or twist.</p>
      
      <h2>2. Use a Lingerie Bag</h2>
      <p>If you must machine wash, always use a mesh lingerie bag. Hook your bras before placing them in the bag to prevent snagging.</p>
      
      <h2>3. Skip the Dryer</h2>
      <p>Heat is the enemy of elasticity. Always air dry your bras by laying them flat or hanging by the center gore—never by the straps.</p>
      
      <h2>4. Rotate Your Collection</h2>
      <p>Give your bras a day off between wears. This allows the elastic to recover and extends the life of each piece.</p>
      
      <h2>5. Store Properly</h2>
      <p>Store molded cup bras stacked inside each other to maintain their shape. Fold wireless bras in half and store flat.</p>
    `,
    author: "Maria Santos",
    date: "2024-01-05",
    category: "Care Guide",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop",
    readTime: 3
  },
  {
    id: "4",
    slug: "building-capsule-lingerie-wardrobe",
    title: "Building a Capsule Lingerie Wardrobe",
    excerpt: "Curate a versatile collection of essentials that work for every outfit and occasion. Less is more when you choose wisely.",
    content: `
      <p>A well-curated lingerie drawer doesn't need dozens of pieces. With the right selection, you can have the perfect foundation for any outfit or occasion.</p>
      
      <h2>The Essential Seven</h2>
      <ul>
        <li><strong>A nude T-shirt bra</strong> - Your everyday invisible essential</li>
        <li><strong>A black T-shirt bra</strong> - For darker clothing</li>
        <li><strong>A strapless option</strong> - For off-shoulder and special occasion wear</li>
        <li><strong>A comfortable wireless bra</strong> - For lounging and light-activity days</li>
        <li><strong>A sports bra</strong> - For workouts and active days</li>
        <li><strong>A special occasion piece</strong> - Something that makes you feel beautiful</li>
        <li><strong>A cozy bralette</strong> - For layering and casual comfort</li>
      </ul>
      
      <h2>Quality Over Quantity</h2>
      <p>Investing in fewer, high-quality pieces means better fit, more comfort, and longer-lasting wear. Our Jelly Bra collection is designed to check multiple boxes—comfortable enough for everyday, beautiful enough for special moments.</p>
    `,
    author: "Emma Chen",
    date: "2023-12-28",
    category: "Style Tips",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&auto=format&fit=crop",
    readTime: 4
  },
  {
    id: "5",
    slug: "sustainable-lingerie-matters",
    title: "Sustainable Fashion: Why Quality Lingerie Matters",
    excerpt: "Discover how choosing quality over quantity benefits both you and the planet. Join the slow fashion movement.",
    content: `
      <p>In a world of fast fashion, choosing quality lingerie is a small but meaningful act of sustainability. Here's why investing in well-made pieces matters.</p>
      
      <h2>The True Cost of Fast Fashion</h2>
      <p>Cheap, mass-produced lingerie often ends up in landfills within months. The environmental cost of this cycle is enormous—from water usage to textile waste.</p>
      
      <h2>Our Commitment to Sustainability</h2>
      <p>At buubra, we're committed to responsible manufacturing. Our pieces are designed to last, made with durable materials and timeless designs that won't go out of style.</p>
      
      <h2>Making Conscious Choices</h2>
      <ul>
        <li>Choose quality pieces that last longer</li>
        <li>Care for your lingerie properly to extend its life</li>
        <li>Donate or recycle old pieces responsibly</li>
        <li>Support brands with transparent manufacturing</li>
      </ul>
      
      <p>Every purchase is a vote for the kind of world you want to live in. Choose wisely.</p>
    `,
    author: "Sophie Laurent",
    date: "2023-12-20",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&auto=format&fit=crop",
    readTime: 5
  },
  {
    id: "6",
    slug: "behind-the-scenes-design-process",
    title: "Behind the Scenes: Our Design Process",
    excerpt: "Take a peek behind the curtain at how we create lingerie that combines comfort, support, and style.",
    content: `
      <p>Every buubra piece begins with a simple question: How can we make women feel more comfortable and confident? Here's a glimpse into our design process.</p>
      
      <h2>Research & Inspiration</h2>
      <p>We start by listening to our customers. What do they love? What frustrates them about existing options? This feedback shapes every design decision.</p>
      
      <h2>Material Selection</h2>
      <p>We source the finest materials from around the world. Our signature jelly fabric was developed after years of testing to achieve the perfect balance of stretch, support, and softness.</p>
      
      <h2>Fit Testing</h2>
      <p>Every design goes through extensive fit testing on real women of diverse body types. We make adjustments until the fit is perfect for the widest range of bodies.</p>
      
      <h2>Refinement</h2>
      <p>Even after launch, we continue to gather feedback and refine our designs. Your input directly influences future collections.</p>
    `,
    author: "Maria Santos",
    date: "2023-12-15",
    category: "Behind the Scenes",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    readTime: 4
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
  return blogPosts.filter(post => post.slug !== currentSlug).slice(0, limit);
};

export const categories = ["All", "Style Tips", "Care Guide", "Sustainability", "Behind the Scenes"];
