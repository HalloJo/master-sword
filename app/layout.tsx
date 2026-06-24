import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-heading",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Master Sword — The Blade of Evil's Bane",
  description:
    "An immersive scroll journey through the legend of the Master Sword — forged by the goddess, chosen by fate.",
  openGraph: {
    title: "Master Sword",
    description: "The Blade of Evil's Bane",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
