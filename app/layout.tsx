import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-heading",
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
    <html lang="en" className={`${dm_sans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
