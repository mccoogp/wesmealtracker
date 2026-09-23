// layout.jsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const BRAND_NAME = "The Wesleyan Calculator"; 

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://wesmealtracker.vercel.app"),
  title: `${BRAND_NAME} | Wesleyan Meal Plan Tracker`,
  description:
    "Calculate your daily Wesleyan meal points and swipe budget pace. Track your WesCard balance for Premier, Intermediate, and All-Points plans.",
  keywords: [
    "Wesleyan points calculator",
    "Wesleyan meal plan tracker",
    "Wesleyan meal points",
    "Wesleyan swipes calculator",
    "Wesleyan meal plan",
    "Wesleyan tracker",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: `${BRAND_NAME} - Wesleyan Points Calculator & Meal Plan Tracker`,
    description:
      "Calculate your daily Wesleyan meal points and swipe budget pace. Track your WesCard balance for Premier, Intermediate, and All-Points plans.",
    url: "https://wesmealtracker.vercel.app",
    siteName: BRAND_NAME, // <--- Google uses this as a primary site name signal
    images: [
      {
        url: "/image.png",
        width: 512,
        height: 512,
        alt: "Wesleyan Shield Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${BRAND_NAME} - Wesleyan Points Calculator & Meal Plan Tracker`,
    description:
      "Calculate your daily Wesleyan meal points and swipe budget pace.",
    images: ["/image.png"],
  },
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data to explicitly tell Google your site/company name
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: "https://wesmealtracker.vercel.app",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}