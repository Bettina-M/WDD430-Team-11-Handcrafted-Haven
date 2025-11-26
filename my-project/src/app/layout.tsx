//import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css';
import Link from 'next/link';
import Navbar from "../components/Navbar"



export const metadata ={
  title: "Handcrafted Haven",
  description: "Discover a world of creativity and craftsmanship at Handcrafted Haven."
}

/*export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        {/* ✅ NAVBAR */
        /*<nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/">🎁 Handcrafted Haven</Link>
          </div>

          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/auth">Login</Link></li>
          </ul>
        </nav>
        {/* ✅ PAGE CONTENT */
       /* <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}*/

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