-- Create enum for content types
CREATE TYPE public.ugc_content_type AS ENUM ('image', 'video_upload', 'video_embed');

-- Create enum for platforms
CREATE TYPE public.ugc_platform AS ENUM ('upload', 'tiktok', 'instagram', 'youtube');

-- Create ugc_content table
CREATE TABLE public.ugc_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type ugc_content_type NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    platform ugc_platform NOT NULL DEFAULT 'upload',
    creator_username TEXT NOT NULL,
    creator_profile_url TEXT,
    product_id TEXT, -- Shopify product ID reference
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ugc_content ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone can view active content)
CREATE POLICY "Anyone can view active UGC content"
ON public.ugc_content
FOR SELECT
USING (is_active = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_ugc_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_ugc_content_updated_at
BEFORE UPDATE ON public.ugc_content
FOR EACH ROW
EXECUTE FUNCTION public.update_ugc_content_updated_at();

-- Create storage bucket for UGC uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'ugc-media',
    'ugc-media',
    true,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
);

-- Storage policies for public read access
CREATE POLICY "Anyone can view UGC media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'ugc-media');

-- Index for common queries
CREATE INDEX idx_ugc_content_display ON public.ugc_content (display_order, is_active, is_featured);