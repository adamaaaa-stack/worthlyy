import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="link-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 4, 2024</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Worthlyy ("Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Service. We reserve the right to 
              modify these terms at any time, and your continued use of the Service constitutes acceptance 
              of any modifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Worthlyy provides AI-powered device valuation services. Users can upload photos of their 
              electronic devices (smartphones, laptops, tablets, gaming consoles, etc.) to receive estimated 
              market values based on condition analysis and current market data. Our valuations are estimates 
              only and should not be considered as guaranteed sale prices or official appraisals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">When using our Service, you agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate information about your devices</li>
              <li>Upload only photos of devices you own or have permission to valuate</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Not attempt to manipulate or deceive our valuation system</li>
              <li>Not upload inappropriate, offensive, or unrelated content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Valuation Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              All valuations provided by Worthlyy are estimates based on available market data and 
              AI-powered condition analysis. Actual sale prices may vary significantly based on factors 
              including but not limited to: local market conditions, buyer preferences, timing of sale, 
              negotiation, and factors not visible in uploaded photos. We do not guarantee any specific 
              sale price or market outcome.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Free and Paid Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Worthlyy offers free unlimited valuations supported by advertisements. All core features 
              are available at no cost to users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service, including its original content, features, and functionality, is owned by 
              Worthlyy and is protected by international copyright, trademark, and other intellectual 
              property laws. You retain ownership of photos you upload, but grant us a license to process 
              them for valuation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Worthlyy shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of the Service. Our total liability shall not exceed 
              the amount you paid for the Service in the twelve months preceding the claim. Some jurisdictions 
              do not allow limitations on liability, so these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to terminate or suspend your access to the Service immediately, without 
              prior notice, for conduct that we believe violates these Terms or is harmful to other users, 
              us, or third parties, or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions. Any disputes arising from these Terms shall 
              be resolved in the courts of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@worthlyy.com" className="text-primary hover:underline">
                legal@worthlyy.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
