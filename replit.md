# TrueWorth AI

## Overview

TrueWorth AI is an intelligent device valuation platform that provides accurate, real-time price estimates for tech devices (phones, laptops, tablets, gaming consoles, etc.) using AI-powered condition analysis and live market data. The application analyzes uploaded device photos using Google's Gemini Vision API, scrapes comparable listings from eBay using ScraperAPI, and calculates fair market valuations based on condition scores and market trends. This is a pure valuation tool with no selling features—focused solely on helping users understand their device's true worth.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript using Vite as the build tool
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and API caching
- Single-page application (SPA) with client-side routing

**UI Component System:**
- Shadcn UI component library (Radix UI primitives with custom styling)
- Tailwind CSS for styling with custom design tokens
- Design follows a hybrid approach combining Stripe's clarity, Linear's precision, and Plaid's trustworthiness
- Custom typography system using Inter (primary) and Space Grotesk (accent/pricing displays)
- Responsive grid layouts with mobile-first approach

**Key Pages:**
- Landing: Marketing homepage with feature highlights
- Upload: Multi-image upload interface with device model input and category selection
- Results: Displays valuation results with condition analysis and comparable listings
- Dashboard: User's valuation history and usage statistics

**State Management:**
- React Query for server state and API data caching
- Local React state for UI interactions
- Session-based usage tracking (no authentication required)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- HTTP server (not WebSocket-based despite ws import)
- RESTful API endpoints for valuations and usage tracking

**API Endpoints:**
- `POST /api/valuations` - Creates new valuation request with uploaded images
- `GET /api/valuations/:id` - Retrieves valuation results (polls until completed)
- `GET /api/valuations` - Lists user's valuation history
- `GET /api/usage/stats` - Returns usage statistics for rate limiting
- `GET /objects/:objectPath` - Serves uploaded images from object storage
- `GET /public-objects/:filePath` - Serves public assets

**Core Business Logic:**

*Image Analysis Pipeline:*
- Accepts multiple device images via multer middleware
- Uploads images to Google Cloud Storage (Replit Object Storage)
- Sends images to Gemini Vision API for condition analysis
- Extracts condition details (scratches, dents, cracks, screen condition, wear level)
- Generates overall condition score (0-100)

*Market Data Scraping:*
- Uses ScraperAPI to scrape eBay listings for comparable devices
- Filters and processes listing data (title, price, condition, URL)
- Removes statistical outliers using IQR method
- Calculates price statistics (min, max, median, average)
- Generates price distribution across ranges

*Valuation Calculation:*
- Applies condition-based multipliers to market prices (50%-110% based on score)
- Calculates price range with dynamic buffer based on market variance
- Returns estimate range (min, max, median, average)

**Data Processing:**
- Asynchronous processing pattern (status: pending → completed/failed)
- Client polls for results at 3-second intervals
- Stores complete valuation results including condition analysis and comparable listings

**Monetization Model:**
- Ad-supported free model using Google AdSense
- Unlimited valuations for all users
- No registration required

### Google AdSense Integration

**Implementation:**
- AdSlot component at `client/src/components/AdSlot.tsx`
- Provides three ad format variants: AdBanner (horizontal), AdRectangle (sidebar), AdSlot (configurable)
- AdSense script loaded in `index.html`
- Lazy loading with Intersection Observer API for performance

**Ad Placements:**
- Landing page: Banner ad after features section
- Dashboard page: Rectangle ad in sidebar (desktop)
- Results page: Banner ad before comparable listings table

**Configuration:**
- Publisher ID in index.html (update with real AdSense ID)
- Ad slot IDs configured in AdSlot component (update with real slot IDs)
- Responsive ad sizing with CSS min-height settings

### Data Storage

**Database:**
- PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database queries
- Connection pooling with @neondatabase/serverless

**Schema Design:**

*Users Table:*
- Optional user accounts (not required for basic usage)
- Fields: id, username, password, email

*Valuations Table:*
- Stores complete valuation records
- Links to both authenticated users (optional) and anonymous sessions
- Fields: id, userId, sessionId, deviceModel, deviceCategory, conditionScore, conditionDetails (jsonb), price estimates, listingsAnalyzed, comparableListings (jsonb), priceDistribution (jsonb), status, createdAt

*UploadedImages Table:*
- References to images stored in object storage
- Links to valuation records
- Fields: id, valuationId, imageUrl, analysisResult (jsonb), createdAt

*UsageLogs Table:*
- Tracks user actions for rate limiting and analytics
- Fields: id, sessionId, userId, action, details (jsonb), createdAt

**Object Storage:**
- Google Cloud Storage integration via Replit's sidecar service
- Stores uploaded device images with ACL policies
- Public object search paths for static assets
- Custom ACL system for access control (owner-based, public/private visibility)

### External Dependencies

**AI/ML Services:**
- **Google Gemini API** (`@google/genai`): Vision model for analyzing device photos and extracting condition details
- API Key: Required in `GEMINI_API_KEY` environment variable

**Web Scraping:**
- **ScraperAPI** (HTTP API): Proxied web scraping service for retrieving eBay listings
- API Key: Required in `SCRAPER_API_KEY` environment variable
- Used to bypass anti-bot protections and gather market data

**Database:**
- **Neon PostgreSQL** (`@neondatabase/serverless`): Serverless Postgres with WebSocket support
- Connection string: Required in `DATABASE_URL` environment variable
- Database migrations managed via Drizzle Kit

**Object Storage:**
- **Google Cloud Storage** (`@google-cloud/storage`): For storing uploaded images
- Authentication via Replit sidecar service (external account credentials)
- No separate API key required (uses Replit infrastructure)

**Development Tools:**
- **Replit Vite Plugins**: Runtime error modal, cartographer, dev banner
- TypeScript compilation with tsx
- esbuild for server bundling in production

**UI Component Libraries:**
- Radix UI primitives (20+ component packages for accessible UI components)
- React Hook Form with Zod validation
- Tailwind CSS with custom configuration

**Session Management:**
- Express sessions with in-memory store (not persisted)
- Session IDs generated with nanoid for anonymous user tracking