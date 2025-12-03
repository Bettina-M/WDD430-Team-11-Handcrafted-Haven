"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">🎁 Handcrafted Haven</Link>
      </div>

      {/* Hamburger Icon */}
      <button 
        className={styles.hamburger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
      </button>

      {/* Menu Links */}
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/marketplace">Marketplace</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/auth">Login</Link></li>
      </ul>
    </nav>
  );
}
