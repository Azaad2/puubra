// Meta Pixel tracking hook for standard e-commerce events
// Pixel ID: 1445476650452453

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Standard event helpers
export const trackPageView = () => trackEvent('PageView');

export const trackViewContent = (params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value?: number;
  currency?: string;
}) => trackEvent('ViewContent', params);

export const trackAddToCart = (params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}) => trackEvent('AddToCart', params);

export const trackInitiateCheckout = (params: {
  content_ids: string[];
  num_items: number;
  value: number;
  currency: string;
}) => trackEvent('InitiateCheckout', params);

export const trackPurchase = (params: {
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
  num_items: number;
}) => trackEvent('Purchase', params);
