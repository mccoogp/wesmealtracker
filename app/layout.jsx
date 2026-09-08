import "./globals.css"; // Ensure your CSS variables are loaded here

export const metadata = {
  title: "Meal Plan Tracker",
  description: "Track semester meal points and swipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}