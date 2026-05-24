import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeafSpace AI — Floor Plan Analyzer",
  description:
    "AI-powered architectural evaluation for DeafSpace and sensory-inclusive design compliance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${mono.className} bg-[#0a0f0e] text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
