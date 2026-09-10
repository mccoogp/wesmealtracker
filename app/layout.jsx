// layout.jsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://wesmealtracker.vercel.app"),
  title: "Wesleyan Points Calculator & Meal Plan Tracker",
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
    title: "Wesleyan Points Calculator & Meal Plan Tracker",
    description:
      "Calculate your daily Wesleyan meal points and swipe budget pace. Track your WesCard balance for Premier, Intermediate, and All-Points plans.",
    url: "https://wesmealtracker.vercel.app",
    siteName: "Wesleyan Meal Plan Tracker",
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
    title: "Wesleyan Points Calculator & Meal Plan Tracker",
    description:
      "Calculate your daily Wesleyan meal points and swipe budget pace.",
    images: ["/image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}