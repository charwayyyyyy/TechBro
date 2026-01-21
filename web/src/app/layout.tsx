
import type { Metadata } from "next";
import { BottomNav } from "../components/bottom-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechBro",
  description: "Duolingo-style programming learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-md flex-col bg-sky-50 shadow-lg sm:max-w-lg">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
