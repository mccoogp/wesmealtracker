// layout.jsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Wesleyan Meal Plan Tracker",
  description: "Track your meal swipes and points pace throughout the semester.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Wesleyan Meal Plan Tracker",
    description: "Track your meal swipes and points pace throughout the semester.",
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
    title: "Wesleyan Meal Plan Tracker",
    description: "Track your meal swipes and points pace throughout the semester.",
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