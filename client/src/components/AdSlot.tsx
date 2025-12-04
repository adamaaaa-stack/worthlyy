import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
}

export function AdSlot({ 
  adSlot, 
  adFormat = "auto", 
  style,
  className = ""
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  const defaultStyle: React.CSSProperties = {
    display: "block",
    minHeight: adFormat === "horizontal" ? "90px" : adFormat === "rectangle" ? "250px" : "100px",
    ...style,
  };

  return (
    <div className={`ad-container ${className}`} data-testid="ad-slot">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <AdSlot 
      adSlot="1234567890"
      adFormat="horizontal"
      className={className}
      style={{ minHeight: "90px" }}
    />
  );
}

export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdSlot 
      adSlot="0987654321"
      adFormat="rectangle"
      className={className}
      style={{ minHeight: "250px", width: "300px" }}
    />
  );
}
