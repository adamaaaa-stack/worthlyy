import { Link } from "wouter";
import { ArrowLeft, Cpu, Shield, TrendingUp, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description: "We combine AI analysis with real market data to provide the most accurate valuations possible."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Our pricing methodology is clear and honest. No hidden agendas, just fair market values."
    },
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "Get accurate valuations in seconds. Upload photos, and let our AI do the heavy lifting."
    }
  ];

  const stats = [
    { value: "50K+", label: "Devices Valued" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "30sec", label: "Average Time" },
    { value: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="link-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-6">About Worthlyy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Worthlyy is the intelligent way to understand your device's true market value. 
            We combine cutting-edge AI technology with real-time market data to give you accurate, 
            unbiased valuations in seconds.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're looking to sell, trade-in, insure, or simply curious about what your 
            smartphone, laptop, tablet, or gaming console is worth, Worthlyy provides the 
            insight you need to make informed decisions.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI Photo Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI examines your device photos to assess condition, identifying 
                  scratches, dents, wear patterns, and overall quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Market Data</h3>
                <p className="text-sm text-muted-foreground">
                  We analyze thousands of real listings and recent sales to understand 
                  current market prices for your specific device model.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fair Valuation</h3>
                <p className="text-sm text-muted-foreground">
                  We combine condition analysis with market data to calculate a fair 
                  price range that reflects your device's true worth.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Our Values</h2>
          <div className="space-y-6">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Worthlyy?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              <strong className="text-foreground">No Bias:</strong> Unlike trade-in services that 
              lowball offers to maximize their profit, Worthlyy provides objective valuations 
              based purely on market data and device condition.
            </p>
            <p className="leading-relaxed">
              <strong className="text-foreground">Real Data:</strong> Our valuations are powered by 
              actual marketplace listings and sales, not arbitrary depreciation schedules or 
              outdated pricing tables.
            </p>
            <p className="leading-relaxed">
              <strong className="text-foreground">Instant Results:</strong> No waiting for quotes 
              or sending in your device. Get accurate valuations in under a minute from the 
              comfort of your home.
            </p>
            <p className="leading-relaxed">
              <strong className="text-foreground">Comprehensive:</strong> We cover all major 
              device categories including smartphones, laptops, tablets, gaming consoles, 
              smartwatches, and more.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Ready to discover your device's true worth? It's free to start, and you'll have 
            your valuation in seconds.
          </p>
          <Link href="/upload">
            <Button size="lg" data-testid="button-get-valuation">
              Get Free Valuation
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
