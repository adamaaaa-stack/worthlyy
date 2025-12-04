import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConditionScoreCircle } from "@/components/ConditionScoreCircle";
import { AdRectangle } from "@/components/AdSlot";
import { 
  Plus, 
  TrendingUp, 
  BarChart3, 
  Clock,
  Smartphone
} from "lucide-react";
import type { Valuation } from "@shared/schema";

interface UsageStats {
  totalValuations: number;
  monthlyUsage: number;
  averageValue: number;
}

export default function DashboardPage() {
  const { data: valuations, isLoading: valuationsLoading } = useQuery<Valuation[]>({
    queryKey: ["/api/valuations"],
  });

  const { data: usageStats, isLoading: statsLoading } = useQuery<UsageStats>({
    queryKey: ["/api/usage/stats"],
  });

  const formatPrice = (price: number | string | null) => {
    if (price === null) return "$0";
    const num = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case "processing":
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">
                Track your valuations and usage
              </p>
            </div>
            <Link href="/upload">
              <Button className="gap-2" data-testid="button-new-valuation">
                <Plus className="h-4 w-4" />
                New Valuation
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Valuations */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Total Valuations
                    </p>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                        {usageStats?.totalValuations || 0}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Usage */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      This Month
                    </p>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-20" />
                    ) : (
                      <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                        {usageStats?.monthlyUsage || 0}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Value */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Avg. Device Value
                    </p>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-24" />
                    ) : (
                      <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                        {formatPrice(usageStats?.averageValue || 0)}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            {/* Valuation History */}
            <Card>
              <CardHeader>
                <CardTitle>Valuation History</CardTitle>
                <CardDescription>
                  Your recent device valuations
                </CardDescription>
              </CardHeader>
              <CardContent>
              {valuationsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : valuations && valuations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {valuations.map((valuation) => (
                      <TableRow key={valuation.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="max-w-[200px] truncate">{valuation.deviceModel}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {valuation.deviceCategory?.replace("-", " ")}
                        </TableCell>
                        <TableCell>
                          {valuation.conditionScore !== null ? (
                            <ConditionScoreCircle score={valuation.conditionScore} size="sm" />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="font-mono">
                          {valuation.estimateMedian ? formatPrice(valuation.estimateMedian) : "—"}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(valuation.status || "pending")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(valuation.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Link href={`/results/${valuation.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No valuations yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by valuing your first device
                  </p>
                  <Link href="/upload">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      New Valuation
                    </Button>
                  </Link>
                </div>
              )}
              </CardContent>
            </Card>

            {/* Ad Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <AdRectangle />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
