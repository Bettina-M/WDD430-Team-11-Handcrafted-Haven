//import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css';
import Link from 'next/link';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"



export const metadata ={
  title: "Handcrafted Haven",
  description: "Discover a world of creativity and craftsmanship at Handcrafted Haven.",
  keywords: ["handmade", "crafts", "artisan", "marketplace"],
  openGraph: {
    title: "Handcrafted Haven",
    description: "Explore unique handcrafted items from artisans worldwide",
    url: "https://wdd-430-team-11-handcrafted-haven.vercel.app/",
    siteName: "Handcrafted Haven",
    images: [
      {
        url: "https://wdd-430-team-11-handcrafted-haven.vercel.app/handcrafted_haven.png",
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
        <Footer />   {/* <-- Footer component */}
      </body>
    </html>
  );
}