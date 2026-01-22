const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProcessImageRequest {
  imageUrl: string;
  backgroundColor?: string; // Optional: specific color, or "auto" for AI to decide
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, backgroundColor = "auto" } = await req.json() as ProcessImageRequest;
    
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'imageUrl is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the prompt based on backgroundColor preference
    let prompt: string;
    if (backgroundColor === "auto") {
      prompt = `Analyze this product image and determine the best complementary solid background color that would make the product stand out beautifully. Consider the product's colors, style, and intended aesthetic. Remove the current background and replace it with your chosen solid color. The result should look professional and elegant for an e-commerce product listing. Return the processed image with the new background.`;
    } else {
      prompt = `Remove the background from this product image and replace it with a solid ${backgroundColor} background. The result should look clean and professional for an e-commerce product listing. Maintain the product's natural appearance while ensuring the new background is perfectly uniform.`;
    }

    console.log(`Processing image with ${backgroundColor === "auto" ? "auto-detected" : backgroundColor} background`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to process image with AI', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const processedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!processedImage) {
      console.error('No processed image in response:', data);
      return new Response(
        JSON.stringify({ error: 'No image returned from AI', response: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Image processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        processedImage, // Base64 data URL
        message: aiMessage || 'Image processed successfully',
        originalUrl: imageUrl
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
