import { Link } from "wouter";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                Worthlyy
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Intelligent device valuation powered by AI and real-time market data.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Device Valuation</li>
              <li>AI Analysis</li>
              <li>Market Data</li>
              <li>Free Forever</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Devices</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Smartphones</li>
              <li>Laptops</li>
              <li>Tablets</li>
              <li>Gaming Consoles</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@worthlyy.com" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with AI-powered precision. Market data refreshed in real-time.</p>
        </div>
      </div>
    </footer>
  );
}
