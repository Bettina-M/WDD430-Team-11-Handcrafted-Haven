//import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css';
import Link from 'next/link';
import Navbar from "../components/Navbar"



export const metadata ={
  title: "Handcrafted Haven",
  description: "Discover a world of creativity and craftsmanship at Handcrafted Haven.",
  keywords: ["handmade", "crafts", "artisan", "marketplace"],
  openGraph: {
    title: "Handcrafted Haven",
    description: "Explore unique handcrafted items from artisans worldwide",
    url: "https://your-domain.com",
    siteName: "Handcrafted Haven",
    images: [
      {
        url: "/handcrafted-haven-og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  }
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Navbar />   {/* <-- Responsive navbar */}
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}