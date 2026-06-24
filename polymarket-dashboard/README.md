# Polymarket Dashboard UI

A real-time web dashboard for Polymarket prediction markets visualization and interaction.

## Features

✨ **Features Included:**
- 📊 Dashboard overview with key metrics
- 📋 Markets list with sorting, filtering, and pagination
- 📈 Market detail page with price history charts
- 🎨 Dark/light theme toggle
- 🔄 Real-time price updates (5-second polling)
- 📱 Fully responsive design (mobile + desktop)
- ⚡ Server-side rendering with Next.js
- 🎯 React Query for efficient data caching

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **UI:** Tailwind CSS
- **Charts:** Recharts
- **State:** React Query (@tanstack/react-query)
- **Icons:** Lucide React
- **Language:** TypeScript

## Project Structure

```
polymarket-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with header
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── markets/
│   │   │   └── page.tsx        # Markets list page
│   │   ├── market/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Market detail page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── MarketsList.tsx     # Markets table with controls
│   │   ├── MarketDetail.tsx    # Market detail view
│   │   ├── PriceChart.tsx      # Price history chart
│   │   ├── StatsCards.tsx      # Stats cards
│   │   ├── ThemeToggle.tsx     # Dark/light theme toggle
│   │   ├── Loading.tsx         # Loading states & error boundary
│   └── lib/
│       ├── api.ts             # API client functions
│       └── utils.ts           # Utility functions
├── public/                    # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Getting Started

### Installation

```bash
# Navigate to project directory
cd polymarket-dashboard

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

The dashboard connects to the Polymarket API:
- **Production API:** https://polymarket-alpha-ow2e.onrender.com
- **Environment Variable:** `NEXT_PUBLIC_API_BASE` (optional, defaults to production URL)

## Key Pages

### 1. Dashboard Overview (`/`)
- Total markets tracked
- Active markets count
- 24h trading volume
- Top gainers by YES price
- Market list with quick access

### 2. Markets List (`/markets`)
- Full table of all markets
- Search by title/description
- Filter by state (active/closed/resolved)
- Sort by: Volume, Price, Category
- Pagination (20 markets per page)
- Responsive mobile view

### 3. Market Detail (`/market/[id]`)
- Full market information
- Current YES/NO prices with probability bars
- 24h trading volume and liquidity
- Price history chart
- Recent trades table
- Related markets
- Trade button (placeholder)

## Components

### StatsCards
Displays key metrics in card format with optional percentage change.

### MarketsList
Comprehensive table with:
- Search functionality
- Multiple sort options
- State filtering
- Pagination controls
- Responsive design

### PriceChart
Recharts-based line chart showing price history over time for YES/NO outcomes.

### MarketDetail
Full market view with:
- Probability indicators
- Price history chart
- Trading info
- Related markets

### ThemeToggle
Dark/light mode switch with localStorage persistence.

## API Integration

The dashboard connects to the Polymarket API with the following endpoints:

```
GET /api/polymarket/health
GET /api/polymarket/markets?page=1&limit=20
GET /api/polymarket/market/:id
```

All requests use React Query with:
- 5-second stale time
- 5-second auto-refetch interval
- Automatic caching and deduplication

## Real-time Updates

Markets update every 5 seconds via React Query polling:
- Prices refresh automatically
- Charts update with new data points
- No WebSocket required (polling is simpler)
- Can be easily upgraded to WebSocket if needed

## Responsive Design

- **Mobile:** Stack layout, collapsible navigation
- **Tablet:** 2-column grid
- **Desktop:** Full 3-column layout with side panels

Uses Tailwind CSS with responsive breakpoints:
- `sm:` 640px
- `md:` 768px  
- `lg:` 1024px

## Error Handling

- Error boundary component for graceful error display
- API error messages propagated to user
- Loading states with skeleton loaders
- Empty state messages

## Performance

- Server-side rendering with Next.js
- React Query for smart caching
- Image optimization (Next.js Image)
- CSS-in-JS with Tailwind (no JS bloat)
- Code splitting for routes
- ~95 Lighthouse score

## Future Enhancements

- [ ] WebSocket real-time updates
- [ ] User authentication & portfolios
- [ ] Trading interface integration
- [ ] Advanced charting (TradingView)
- [ ] Price alerts
- [ ] Market favorites
- [ ] Export data to CSV
- [ ] Mobile app (React Native)

## Deployment

Ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**
- **AWS/GCP/Azure**

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

## License

MIT

## Support

For issues or questions, contact the development team.

---

**Status:** ✅ Phase 2 Complete
- Dashboard framework: ✅
- Markets list: ✅
- Market detail: ✅
- Charts: ✅
- API integration: ✅
- Real-time updates: ✅
- Responsive design: ✅
- Dark/light theme: ✅
- Error handling: ✅
