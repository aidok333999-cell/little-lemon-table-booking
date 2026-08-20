import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Lemon Table Booking",
  description: "Reserve a table at Little Lemon, a Mediterranean restaurant in Chicago.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
