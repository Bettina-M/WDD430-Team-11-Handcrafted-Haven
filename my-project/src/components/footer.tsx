'use client';

import styles from './footer.module.css';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>

        <Link 
          href="mailto:handcraftedhaven@gmail.com" 
          className={styles.iconLink}
        >
          Email: handcraftedhaven@gmail.com
        </Link>

        <Link 
          href="https://github.com/Bettina-M/WDD430-Team-11-Handcrafted-Haven" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.iconLink}
        >
          <FaGithub className={styles.icon} />
        </Link>

        <Link 
          href="https://www.linkedin.com/in/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.iconLink}
        >
          <FaLinkedin className={styles.icon} />
        </Link>

        <Link 
          href="https://twitter.com/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.iconLink}
        >
          <FaTwitter className={styles.icon} />
        </Link>
      </div>

      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </div>
    </footer>
  );
}