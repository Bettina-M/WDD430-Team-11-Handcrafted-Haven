'use client';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles["contact-container"]}>
      <section className={styles["header-section"]}>
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Whether you have questions, feedback, or partnership ideas—reach out anytime.</p>
      </section>

      <section className={styles["info-section"]}>
        <h2>Our Contact Information</h2>

        <div className={styles["contact-info"]}>
          <p><strong>Email:</strong> support@crafthaven.com</p>
          <p><strong>Phone:</strong> +254 700 123 456</p>
          <p><strong>Location:</strong> Nairobi, Kenya</p>
        </div>

        <h2>Business Hours</h2>
        <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
        <p>Saturday: 10:00 AM – 4:00 PM</p>
        <p>Sunday: Closed</p>

        <div className={styles["button-wrapper"]}>
          <a href="/marketplace" className={styles["contact-btn"]}>
            Visit Marketplace
          </a>
        </div>
      </section>
    </div>
  );
}
