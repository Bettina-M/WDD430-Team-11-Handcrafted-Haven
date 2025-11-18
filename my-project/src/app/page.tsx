import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link href="/auth" className={styles.authLink}>Login / Register</Link>
        </div>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>🎁 Handcrafted Haven</h1>
        <p className={styles.description}>
          Discover a world of creativity and craftsmanship.  
          Handcrafted Haven connects artisans and crafters with those who
          value the beauty, quality, and story behind every handmade piece.
        </p>
      </header>

      {/* Call to Action Buttons */}
      <div className={styles.buttons}>
        <Link href="/auth" className={styles.primaryButton}>Explore the Marketplace</Link>
        <Link href="/auth" className={styles.secondaryButton}>Become a Seller</Link>
      </div>

      {/* Features Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Handcrafted Haven?</h2>
        <div className={styles.features}>
          <div className={styles.card}>
            <h3>🧵 Seller Profiles</h3>
            <p>
              Authenticated artisans can share their stories, showcase their
              collections, and connect with craft lovers around the world.
            </p>
          </div>

          <div className={styles.card}>
            <h3>🪵 Product Listings</h3>
            <p>
              Browse handcrafted treasures—from jewelry and pottery to home décor—
              all made with love and skill.
            </p>
          </div>

          <div className={styles.card}>
            <h3>⭐ Reviews & Ratings</h3>
            <p>
              Read honest reviews and ratings to support authentic craftsmanship
              and help others discover trusted creators.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
