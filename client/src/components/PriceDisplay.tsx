interface PriceDisplayProps {
  min: number;
  max: number;
  median: number;
  average?: number;
}

export function PriceDisplay({ min, max, median }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="text-center space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Estimated Value
        </p>
        <p 
          className="text-6xl font-bold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
          data-testid="text-median-price"
        >
          {formatPrice(median)}
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-6 text-muted-foreground">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wide mb-1">Low</p>
          <p 
            className="text-xl font-semibold"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
            data-testid="text-min-price"
          >
            {formatPrice(min)}
          </p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <p className="text-xs uppercase tracking-wide mb-1">High</p>
          <p 
            className="text-xl font-semibold"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
            data-testid="text-max-price"
          >
            {formatPrice(max)}
          </p>
        </div>
      </div>
    </div>
  );
}
