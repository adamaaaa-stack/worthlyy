import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Zap, LayoutDashboard, Upload, Home } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            Worthlyy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button 
              variant={location === "/" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
              data-testid="link-home"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/upload">
            <Button 
              variant={location === "/upload" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
              data-testid="link-upload"
            >
              <Upload className="h-4 w-4" />
              Value Device
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant={location === "/dashboard" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
              data-testid="link-dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/upload">
            <Button data-testid="button-get-valuation">
              Get Valuation
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
