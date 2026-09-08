// layout.jsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Meal Plan Tracker",
  description: "Track semester meal points and swipes",
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