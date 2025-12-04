import { useEffect } from "react";
import { useRoute, Link } from "wouter";
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
import { PriceDisplay } from "@/components/PriceDisplay";
import { AdBanner } from "@/components/AdSlot";
import { WhereToSell } from "@/components/WhereToSell";
import { downloadReport } from "@/lib/generateReport";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  RefreshCw,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Check
} from "lucide-react";
import type { Valuation, ComparableListing, ConditionDetails } from "@shared/schema";

export default function ResultsPage() {
  const [, params] = useRoute("/results/:id");
  const valuationId = params?.id;

  const { data: valuation, isLoading, error, refetch } = useQuery<Valuation>({
    queryKey: ["/api/valuations", valuationId],
    enabled: !!valuationId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && data.status === "completed") return false;
      if (data && data.status === "failed") return false;
      return 3000;
    },
  });

  useEffect(() => {
    if (valuation?.status === "completed" || valuation?.status === "failed") {
      refetch();
    }
  }, [valuation?.status]);

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

  const comparableListings = valuation?.comparableListings as ComparableListing[] | null;
  const conditionDetails = valuation?.conditionDetails as ConditionDetails | null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid gap-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !valuation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                <h2 className="text-xl font-semibold mb-2">Valuation Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The valuation you're looking for doesn't exist or has expired.
                </p>
                <Link href="/upload">
                  <Button>Start New Valuation</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isProcessing = valuation.status === "pending" || valuation.status === "processing";
  const isFailed = valuation.status === "failed";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Processing State */}
          {isProcessing && (
            <Card className="mb-6">
              <CardContent className="py-12 text-center">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                <h2 className="text-xl font-semibold mb-2">Analyzing Your Device</h2>
                <p className="text-muted-foreground mb-4">
                  Our AI is examining your photos and gathering market data...
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Photos uploaded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>AI analysis in progress</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Failed State */}
          {isFailed && (
            <Card className="mb-6 border-destructive">
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                <h2 className="text-xl font-semibold mb-2">Analysis Failed</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't complete the valuation. Please try again.
                </p>
                <Link href="/upload">
                  <Button>Try Again</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Completed Results */}
          {valuation.status === "completed" && (
            <>
              {/* Main Valuation Card */}
              <Card className="mb-6">
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-2xl">{valuation.deviceModel}</CardTitle>
                  <CardDescription>
                    Based on {valuation.listingsAnalyzed || 0} comparable listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Price Display */}
                    <PriceDisplay
                      min={parseFloat(valuation.estimateMin?.toString() || "0")}
                      max={parseFloat(valuation.estimateMax?.toString() || "0")}
                      median={parseFloat(valuation.estimateMedian?.toString() || "0")}
                    />

                    {/* Condition Score */}
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                        Condition Score
                      </p>
                      <ConditionScoreCircle score={valuation.conditionScore || 0} size="lg" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-8 border-t">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => downloadReport({
                        valuation,
                        comparableListings,
                        conditionDetails,
                      }, "html")}
                      data-testid="button-download-report"
                    >
                      <Download className="h-4 w-4" />
                      Download Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `${valuation.deviceModel} Valuation`,
                            text: `My ${valuation.deviceModel} is worth approximately ${formatPrice(valuation.estimateMedian)} based on Worthlyy valuation.`,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      data-testid="button-share"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Link href="/upload">
                      <Button className="gap-2" data-testid="button-new-valuation">
                        <RefreshCw className="h-4 w-4" />
                        New Valuation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Condition Details */}
              {conditionDetails && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Condition Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {conditionDetails.scratches && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Scratches</p>
                          <p className="font-medium capitalize">{conditionDetails.scratches}</p>
                        </div>
                      )}
                      {conditionDetails.dents && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Dents</p>
                          <p className="font-medium capitalize">{conditionDetails.dents}</p>
                        </div>
                      )}
                      {conditionDetails.screenCondition && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Screen</p>
                          <p className="font-medium capitalize">{conditionDetails.screenCondition}</p>
                        </div>
                      )}
                      {conditionDetails.wearLevel && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Wear Level</p>
                          <p className="font-medium capitalize">{conditionDetails.wearLevel}</p>
                        </div>
                      )}
                    </div>
                    {conditionDetails.overallAssessment && (
                      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">{conditionDetails.overallAssessment}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Where to Sell */}
              <div className="mb-6">
                <WhereToSell 
                  deviceCategory={valuation.deviceCategory || "default"} 
                  estimatedPrice={parseFloat(valuation.estimateMedian?.toString() || "0")}
                />
              </div>

              {/* Ad Banner */}
              <div className="my-6">
                <AdBanner className="rounded-lg overflow-hidden" />
              </div>

              {/* Comparable Listings */}
              {comparableListings && comparableListings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Comparable Listings</CardTitle>
                    <CardDescription>
                      Similar devices currently listed on eBay
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comparableListings.slice(0, 10).map((listing, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium max-w-xs truncate">
                              {listing.url ? (
                                <a 
                                  href={listing.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 hover:text-primary"
                                >
                                  {listing.title}
                                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                </a>
                              ) : (
                                listing.title
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="capitalize">
                                {listing.condition}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              {formatPrice(listing.price)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
