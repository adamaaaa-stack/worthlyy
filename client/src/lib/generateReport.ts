import type { Valuation, ComparableListing, ConditionDetails } from "@shared/schema";

interface ReportData {
  valuation: Valuation;
  comparableListings: ComparableListing[] | null;
  conditionDetails: ConditionDetails | null;
}

function formatPrice(price: number | string | null): string {
  if (price === null) return "$0";
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

function formatDate(date: Date | string | null): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getConditionLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Very Poor";
}

function generateTextReport(data: ReportData): string {
  const { valuation, comparableListings, conditionDetails } = data;
  
  const divider = "═".repeat(60);
  const thinDivider = "─".repeat(60);
  
  let report = `
${divider}
                    WORTHLYY VALUATION REPORT
${divider}

REPORT GENERATED: ${formatDate(new Date())}
VALUATION ID: ${valuation.id}

${thinDivider}
                         DEVICE INFORMATION
${thinDivider}

Device Model:     ${valuation.deviceModel}
Category:         ${valuation.deviceCategory || "N/A"}
Valuation Date:   ${formatDate(valuation.createdAt)}

${thinDivider}
                         PRICE ESTIMATE
${thinDivider}

  Estimated Value Range:
  
    LOW:      ${formatPrice(valuation.estimateMin)}
    MEDIAN:   ${formatPrice(valuation.estimateMedian)}  <-- Recommended Price
    HIGH:     ${formatPrice(valuation.estimateMax)}

  Market Average: ${formatPrice((parseFloat(valuation.estimateMin?.toString() || "0") + parseFloat(valuation.estimateMax?.toString() || "0")) / 2)}
  
  Listings Analyzed: ${valuation.listingsAnalyzed || 0} comparable items

${thinDivider}
                       CONDITION ANALYSIS
${thinDivider}

  Overall Score:  ${valuation.conditionScore || 0}/100 (${getConditionLabel(valuation.conditionScore || 0)})

`;

  if (conditionDetails) {
    report += `  Detailed Assessment:
  
    Scratches:        ${conditionDetails.scratches || "Not assessed"}
    Dents:            ${conditionDetails.dents || "Not assessed"}
    Screen Condition: ${conditionDetails.screenCondition || "Not assessed"}
    Wear Level:       ${conditionDetails.wearLevel || "Not assessed"}
    Cracks:           ${conditionDetails.cracks || "Not assessed"}

  AI Assessment:
  ${conditionDetails.overallAssessment || "No detailed assessment available"}

`;
  }

  report += `${thinDivider}
                      MARKET ANALYSIS
${thinDivider}

`;

  if (comparableListings && comparableListings.length > 0) {
    report += `  Found ${comparableListings.length} comparable listings on the market:

  #   | Price       | Condition    | Title
  ${"-".repeat(60)}
`;

    comparableListings.slice(0, 15).forEach((listing, index) => {
      const num = (index + 1).toString().padStart(3);
      const price = formatPrice(listing.price).padEnd(11);
      const condition = (listing.condition || "Unknown").padEnd(12);
      const title = listing.title.substring(0, 35);
      report += `  ${num} | ${price} | ${condition} | ${title}\n`;
    });

    report += `
  Price Distribution:
`;

    const prices = comparableListings.map(l => typeof l.price === "string" ? parseFloat(l.price) : l.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    report += `
    Lowest Listed:    ${formatPrice(minPrice)}
    Average Listed:   ${formatPrice(avgPrice)}
    Highest Listed:   ${formatPrice(maxPrice)}
`;
  } else {
    report += "  No comparable listings data available.\n";
  }

  report += `
${thinDivider}
                    SELLING RECOMMENDATIONS
${thinDivider}

  Based on your device category (${valuation.deviceCategory || "General"}):

  1. SWAPPA (swappa.com)
     - Best for: Phones, tablets
     - Fees: ~3%
     - Why: Verified listings, fair prices

  2. EBAY (ebay.com)
     - Best for: All electronics
     - Fees: ~13%
     - Why: Largest audience, auction options

  3. FACEBOOK MARKETPLACE (facebook.com/marketplace)
     - Best for: Local sales
     - Fees: Free for local pickup
     - Why: No fees, quick sales

  4. OFFERUP (offerup.com)
     - Best for: Local electronics
     - Fees: Free for local
     - Why: Mobile-friendly, local focus

${thinDivider}
                       SELLING TIPS
${thinDivider}

  1. Price your device at or slightly below the median price
     for fastest sale: ${formatPrice(valuation.estimateMedian)}
  
  2. Take clear, well-lit photos from multiple angles
  
  3. Be transparent about any flaws or issues
  
  4. Factory reset your device before selling
  
  5. Include original accessories if available
  
  6. Meet in public places for local sales
  
  7. Use secure payment methods (avoid wire transfers)

${divider}
                         DISCLAIMER
${divider}

This valuation is an estimate based on current market conditions
and AI-powered condition analysis. Actual sale prices may vary
based on local market conditions, buyer preferences, timing,
and other factors. Worthlyy provides this information for
reference purposes only and does not guarantee any sale price.

Report generated by Worthlyy - worthlyy.com
${divider}
`;

  return report;
}

function generateHTMLReport(data: ReportData): string {
  const { valuation, comparableListings, conditionDetails } = data;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Worthlyy Valuation Report - ${valuation.deviceModel}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 3px solid #2563eb;
      margin-bottom: 30px;
    }
    .logo { font-size: 28px; font-weight: 700; color: #2563eb; margin-bottom: 5px; }
    .subtitle { color: #666; font-size: 14px; }
    h1 { font-size: 24px; margin-bottom: 5px; }
    h2 { font-size: 18px; color: #2563eb; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
    .section { margin-bottom: 25px; }
    .price-box {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 20px 0;
    }
    .price-main { font-size: 48px; font-weight: 700; font-family: 'Space Grotesk', monospace; }
    .price-label { font-size: 14px; opacity: 0.9; margin-bottom: 5px; }
    .price-range { margin-top: 15px; font-size: 14px; opacity: 0.9; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .stat-box { 
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
    }
    .stat-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-value { font-size: 20px; font-weight: 600; margin-top: 5px; }
    .score-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: conic-gradient(#2563eb ${(valuation.conditionScore || 0) * 3.6}deg, #e5e5e5 0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .score-inner {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
    }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e5e5; }
    th { background: #f8fafc; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #666; }
    .platform { 
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .platform-name { font-weight: 600; }
    .platform-desc { font-size: 13px; color: #666; }
    .tip { 
      display: flex;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .tip-num { 
      width: 24px;
      height: 24px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .disclaimer {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      padding: 15px;
      border-radius: 8px;
      font-size: 13px;
      margin-top: 30px;
    }
    .footer {
      text-align: center;
      padding-top: 30px;
      margin-top: 30px;
      border-top: 1px solid #e5e5e5;
      color: #666;
      font-size: 13px;
    }
    @media print {
      body { padding: 20px; }
      .price-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Worthlyy</div>
    <div class="subtitle">Device Valuation Report</div>
  </div>

  <h1>${valuation.deviceModel}</h1>
  <p style="color: #666; margin-bottom: 20px;">
    ${valuation.deviceCategory || "Electronic Device"} | Valued on ${formatDate(valuation.createdAt)}
  </p>

  <div class="price-box">
    <div class="price-label">ESTIMATED VALUE</div>
    <div class="price-main">${formatPrice(valuation.estimateMedian)}</div>
    <div class="price-range">
      Range: ${formatPrice(valuation.estimateMin)} - ${formatPrice(valuation.estimateMax)}
    </div>
  </div>

  <h2>Valuation Summary</h2>
  <div class="grid">
    <div class="stat-box">
      <div class="stat-label">Price Range Low</div>
      <div class="stat-value">${formatPrice(valuation.estimateMin)}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Price Range High</div>
      <div class="stat-value">${formatPrice(valuation.estimateMax)}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Market Average</div>
      <div class="stat-value">${formatPrice((parseFloat(valuation.estimateMin?.toString() || "0") + parseFloat(valuation.estimateMax?.toString() || "0")) / 2)}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Listings Analyzed</div>
      <div class="stat-value">${valuation.listingsAnalyzed || 0}</div>
    </div>
  </div>

  <h2>Condition Analysis</h2>
  <div style="text-align: center; margin: 20px 0;">
    <div class="score-circle">
      <div class="score-inner">${valuation.conditionScore || 0}</div>
    </div>
    <p style="margin-top: 10px; font-weight: 600;">${getConditionLabel(valuation.conditionScore || 0)} Condition</p>
  </div>

  ${conditionDetails ? `
  <div class="grid">
    <div class="stat-box">
      <div class="stat-label">Scratches</div>
      <div class="stat-value" style="font-size: 16px;">${conditionDetails.scratches || "N/A"}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Dents</div>
      <div class="stat-value" style="font-size: 16px;">${conditionDetails.dents || "N/A"}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Screen</div>
      <div class="stat-value" style="font-size: 16px;">${conditionDetails.screenCondition || "N/A"}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Wear Level</div>
      <div class="stat-value" style="font-size: 16px;">${conditionDetails.wearLevel || "N/A"}</div>
    </div>
  </div>
  ${conditionDetails.overallAssessment ? `
  <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #2563eb;">
    <strong>AI Assessment:</strong> ${conditionDetails.overallAssessment}
  </div>
  ` : ''}
  ` : ''}

  ${comparableListings && comparableListings.length > 0 ? `
  <h2>Market Comparison</h2>
  <p style="color: #666; margin-bottom: 15px;">Found ${comparableListings.length} similar listings currently on the market:</p>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Condition</th>
        <th style="text-align: right;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${comparableListings.slice(0, 10).map(listing => `
      <tr>
        <td>${listing.title.substring(0, 50)}${listing.title.length > 50 ? '...' : ''}</td>
        <td>${listing.condition || "Used"}</td>
        <td style="text-align: right; font-weight: 600;">${formatPrice(listing.price)}</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  <h2>Where to Sell</h2>
  <div class="platform">
    <div>
      <div class="platform-name">Swappa</div>
      <div class="platform-desc">Best for phones and tablets. ~3% fees. Verified buyers.</div>
    </div>
  </div>
  <div class="platform">
    <div>
      <div class="platform-name">eBay</div>
      <div class="platform-desc">Largest marketplace. ~13% fees. Global reach.</div>
    </div>
  </div>
  <div class="platform">
    <div>
      <div class="platform-name">Facebook Marketplace</div>
      <div class="platform-desc">Local sales. No fees. Quick transactions.</div>
    </div>
  </div>
  <div class="platform">
    <div>
      <div class="platform-name">OfferUp</div>
      <div class="platform-desc">Mobile-first local sales. Free for local pickup.</div>
    </div>
  </div>

  <h2>Selling Tips</h2>
  <div class="tip">
    <div class="tip-num">1</div>
    <div>Price at or slightly below ${formatPrice(valuation.estimateMedian)} for fastest sale</div>
  </div>
  <div class="tip">
    <div class="tip-num">2</div>
    <div>Take clear, well-lit photos from multiple angles</div>
  </div>
  <div class="tip">
    <div class="tip-num">3</div>
    <div>Be transparent about any condition issues</div>
  </div>
  <div class="tip">
    <div class="tip-num">4</div>
    <div>Factory reset your device before selling</div>
  </div>
  <div class="tip">
    <div class="tip-num">5</div>
    <div>Meet in public places for local sales</div>
  </div>

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This valuation is an estimate based on current market conditions and AI-powered condition analysis. Actual sale prices may vary. Worthlyy provides this information for reference purposes only.
  </div>

  <div class="footer">
    <p>Report generated by <strong>Worthlyy</strong></p>
    <p>worthlyy.com | ${formatDate(new Date())}</p>
  </div>
</body>
</html>`;
}

export function downloadReport(data: ReportData, format: "txt" | "html" = "html") {
  const { valuation } = data;
  const filename = `worthlyy-report-${valuation.deviceModel.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${valuation.id}`;
  
  let content: string;
  let mimeType: string;
  let extension: string;

  if (format === "html") {
    content = generateHTMLReport(data);
    mimeType = "text/html";
    extension = "html";
  } else {
    content = generateTextReport(data);
    mimeType = "text/plain";
    extension = "txt";
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
