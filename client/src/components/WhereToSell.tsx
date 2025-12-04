import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, DollarSign, Clock, Shield, Zap, Store, Newspaper } from "lucide-react";
import { SiEbay, SiFacebook } from "react-icons/si";

interface Platform {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  pros: string[];
  fees: string;
  speed: "Fast" | "Medium" | "Slow";
  recommended?: boolean;
}

const platforms: Record<string, Platform[]> = {
  smartphone: [
    {
      name: "Swappa",
      description: "Trusted marketplace for phones with verified listings",
      url: "https://swappa.com",
      icon: <Store className="h-5 w-5" />,
      pros: ["No junk listings", "Price protection", "Direct payments"],
      fees: "~3% seller fee",
      speed: "Medium",
      recommended: true,
    },
    {
      name: "eBay",
      description: "Largest marketplace with global reach",
      url: "https://ebay.com",
      icon: <SiEbay className="h-5 w-5" />,
      pros: ["Huge audience", "Auction or fixed price", "Seller protection"],
      fees: "~13% total fees",
      speed: "Medium",
    },
    {
      name: "Facebook Marketplace",
      description: "Local sales with no fees",
      url: "https://facebook.com/marketplace",
      icon: <SiFacebook className="h-5 w-5" />,
      pros: ["No seller fees", "Local pickup", "Quick sales"],
      fees: "Free for local",
      speed: "Fast",
    },
    {
      name: "Decluttr",
      description: "Instant quote with free shipping",
      url: "https://decluttr.com",
      icon: <Zap className="h-5 w-5" />,
      pros: ["Instant offer", "Free shipping", "Next day payment"],
      fees: "No fees (lower price)",
      speed: "Fast",
    },
  ],
  laptop: [
    {
      name: "eBay",
      description: "Best reach for laptops with detailed specs",
      url: "https://ebay.com",
      icon: <SiEbay className="h-5 w-5" />,
      pros: ["Technical buyers", "Global reach", "Good prices"],
      fees: "~13% total fees",
      speed: "Medium",
      recommended: true,
    },
    {
      name: "Facebook Marketplace",
      description: "Great for local laptop sales",
      url: "https://facebook.com/marketplace",
      icon: <SiFacebook className="h-5 w-5" />,
      pros: ["No fees", "Demo before buying", "Cash payment"],
      fees: "Free for local",
      speed: "Fast",
    },
    {
      name: "Craigslist",
      description: "Classic local classifieds",
      url: "https://craigslist.org",
      icon: <Newspaper className="h-5 w-5" />,
      pros: ["No fees", "Cash sales", "Local buyers"],
      fees: "Free",
      speed: "Medium",
    },
    {
      name: "Back Market",
      description: "Trade-in for refurbished market",
      url: "https://backmarket.com",
      icon: <Store className="h-5 w-5" />,
      pros: ["Easy process", "Fair prices", "Eco-friendly"],
      fees: "No fees (trade-in)",
      speed: "Medium",
    },
  ],
  tablet: [
    {
      name: "Swappa",
      description: "Clean marketplace for tablets",
      url: "https://swappa.com",
      icon: <Store className="h-5 w-5" />,
      pros: ["Verified devices", "Fair prices", "Safe transactions"],
      fees: "~3% seller fee",
      speed: "Medium",
      recommended: true,
    },
    {
      name: "eBay",
      description: "Wide audience for tablet sales",
      url: "https://ebay.com",
      icon: <SiEbay className="h-5 w-5" />,
      pros: ["Large market", "Competitive pricing", "Protection"],
      fees: "~13% total fees",
      speed: "Medium",
    },
    {
      name: "Facebook Marketplace",
      description: "Quick local tablet sales",
      url: "https://facebook.com/marketplace",
      icon: <SiFacebook className="h-5 w-5" />,
      pros: ["No fees", "Fast sales", "Local pickup"],
      fees: "Free for local",
      speed: "Fast",
    },
    {
      name: "Gazelle",
      description: "Instant trade-in offers",
      url: "https://gazelle.com",
      icon: <Zap className="h-5 w-5" />,
      pros: ["Instant quote", "Free shipping", "Easy process"],
      fees: "No fees (lower price)",
      speed: "Fast",
    },
  ],
  gaming_console: [
    {
      name: "eBay",
      description: "Best for gaming consoles with accessories",
      url: "https://ebay.com",
      icon: <SiEbay className="h-5 w-5" />,
      pros: ["Gaming community", "Bundle sales", "Good prices"],
      fees: "~13% total fees",
      speed: "Medium",
      recommended: true,
    },
    {
      name: "Facebook Marketplace",
      description: "Local gaming community sales",
      url: "https://facebook.com/marketplace",
      icon: <SiFacebook className="h-5 w-5" />,
      pros: ["No fees", "Test before buy", "Gaming groups"],
      fees: "Free for local",
      speed: "Fast",
    },
    {
      name: "GameStop",
      description: "Trade-in at retail stores",
      url: "https://gamestop.com/trade",
      icon: <Store className="h-5 w-5" />,
      pros: ["Instant credit", "In-store trade", "Convenient"],
      fees: "No fees (lower value)",
      speed: "Fast",
    },
    {
      name: "Craigslist",
      description: "Local cash sales",
      url: "https://craigslist.org",
      icon: <Newspaper className="h-5 w-5" />,
      pros: ["Cash payment", "No fees", "Negotiable"],
      fees: "Free",
      speed: "Medium",
    },
  ],
  default: [
    {
      name: "eBay",
      description: "Largest online marketplace",
      url: "https://ebay.com",
      icon: <SiEbay className="h-5 w-5" />,
      pros: ["Huge audience", "Seller protection", "Fixed or auction"],
      fees: "~13% total fees",
      speed: "Medium",
      recommended: true,
    },
    {
      name: "Facebook Marketplace",
      description: "Free local selling",
      url: "https://facebook.com/marketplace",
      icon: <SiFacebook className="h-5 w-5" />,
      pros: ["No fees", "Local sales", "Quick transactions"],
      fees: "Free for local",
      speed: "Fast",
    },
    {
      name: "Craigslist",
      description: "Classic local classifieds",
      url: "https://craigslist.org",
      icon: <Newspaper className="h-5 w-5" />,
      pros: ["No fees", "Cash sales", "Negotiable"],
      fees: "Free",
      speed: "Medium",
    },
    {
      name: "OfferUp",
      description: "Mobile-first local marketplace",
      url: "https://offerup.com",
      icon: <Store className="h-5 w-5" />,
      pros: ["Easy to use", "Local focus", "In-app messaging"],
      fees: "Free for local",
      speed: "Fast",
    },
  ],
};

const speedColors: Record<string, string> = {
  Fast: "bg-green-500/10 text-green-600 dark:text-green-400",
  Medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Slow: "bg-red-500/10 text-red-600 dark:text-red-400",
};

interface WhereToSellProps {
  deviceCategory: string;
  estimatedPrice: number;
}

export function WhereToSell({ deviceCategory, estimatedPrice }: WhereToSellProps) {
  const categoryKey = deviceCategory?.toLowerCase().replace(/\s+/g, "_") || "default";
  const platformList = platforms[categoryKey] || platforms.default;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Where to Sell
        </CardTitle>
        <CardDescription>
          Recommended platforms to sell your device for the best price
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {platformList.map((platform, index) => (
            <div
              key={platform.name}
              className={`p-4 rounded-lg border ${
                platform.recommended
                  ? "border-primary/50 bg-primary/5"
                  : "bg-muted/30"
              }`}
              data-testid={`platform-card-${index}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0 border">
                    {platform.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold">{platform.name}</h4>
                      {platform.recommended && (
                        <Badge variant="default" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {platform.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {platform.pros.map((pro, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {pro}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${speedColors[platform.speed]}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {platform.speed}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{platform.fees}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => window.open(platform.url, "_blank")}
                    data-testid={`button-visit-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Visit
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" />
            Selling Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span>
              Take clear, well-lit photos from multiple angles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span>
              Be honest about the condition in your listing
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span>
              Factory reset your device before selling
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">4.</span>
              Meet in public places for local sales
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">5.</span>
              Price competitively based on your valuation
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
