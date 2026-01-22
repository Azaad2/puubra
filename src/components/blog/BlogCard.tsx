import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${post.slug}`}
      className={`group block ${featured ? 'md:col-span-2' : ''}`}
    >
      <article className="h-full bg-card border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-colors">
        <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-[4/3]'}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground text-xs">
              {post.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className={`font-serif text-foreground group-hover:text-accent transition-colors mb-3 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
