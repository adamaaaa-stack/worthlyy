import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdSlot";
import { 
  Upload, 
  Cpu, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Gamepad2,
  Camera,
  Headphones,
  Watch,
  ArrowRight,
  Check
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">AI-Powered Valuations</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Know Your Device's{" "}
                <span className="text-primary">True Value</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Get accurate, real-time price estimates for your tech devices using AI-powered 
                condition analysis and live market data from hundreds of listings.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/upload">
                  <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                    Get Free Valuation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Unlimited valuations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>100% Free</span>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-6" />
                <div className="absolute inset-0 bg-card border rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Smartphone className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Estimated Value</p>
                      <p className="text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                        $847
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-muted-foreground">$720 - $980</span>
                      <span className="px-2 py-1 bg-green-500/10 text-green-600 rounded-md font-medium">
                        92/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get an accurate valuation in three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">Step 1</div>
                  <h3 className="text-xl font-semibold mb-3">Upload Photos</h3>
                  <p className="text-muted-foreground">
                    Take 4-6 photos of your device from different angles showing its current condition
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Cpu className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">Step 2</div>
                  <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes scratches, dents, and wear to calculate a precise condition score
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">Step 3</div>
                  <h3 className="text-xl font-semibold mb-3">Get Valuation</h3>
                  <p className="text-muted-foreground">
                    Receive an accurate price range based on 150-300 live market listings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Device Categories */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Supported Devices
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We support valuations for all major tech categories
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { icon: Smartphone, label: "Phones" },
                { icon: Laptop, label: "Laptops" },
                { icon: Tablet, label: "Tablets" },
                { icon: Gamepad2, label: "Consoles" },
                { icon: Watch, label: "Watches" },
                { icon: Camera, label: "Cameras" },
                { icon: Headphones, label: "Audio" },
              ].map(({ icon: Icon, label }) => (
                <Card key={label} className="hover-elevate cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                  AI-Powered Precision
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our advanced AI analyzes every detail of your device photos to provide 
                  the most accurate condition assessment possible.
                </p>
                
                <div className="space-y-4">
                  {[
                    { title: "Scratch Detection", desc: "Identifies and grades surface scratches" },
                    { title: "Dent Analysis", desc: "Detects physical damage and dents" },
                    { title: "Screen Assessment", desc: "Evaluates screen condition and cracks" },
                    { title: "Wear Level", desc: "Overall wear and aging evaluation" },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{title}</h4>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                  Real-Time Market Data
                </h2>
                <p className="text-lg text-muted-foreground">
                  We analyze 150-300 live eBay listings to ensure your valuation 
                  reflects current market conditions.
                </p>
                
                <div className="space-y-4">
                  {[
                    { title: "Live Listings", desc: "Data from active marketplace listings" },
                    { title: "Outlier Removal", desc: "Statistical filtering for accuracy" },
                    { title: "Price Distribution", desc: "See the full market range" },
                    { title: "Condition Matching", desc: "Comparable devices in similar condition" },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{title}</h4>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Banner */}
        <div className="py-8 bg-muted/20">
          <div className="max-w-4xl mx-auto px-6">
            <AdBanner className="rounded-lg overflow-hidden" />
          </div>
        </div>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50K+", label: "Devices Valued" },
                { value: "95%", label: "Accuracy Rate" },
                { value: "300+", label: "Listings Analyzed" },
                { value: "4.8/5", label: "User Rating" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border">
              <Shield className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Ready to Know Your Device's Value?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Get an accurate, AI-powered valuation in minutes. No signup required.
              </p>
              <Link href="/upload">
                <Button size="lg" className="gap-2">
                  Start Free Valuation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
