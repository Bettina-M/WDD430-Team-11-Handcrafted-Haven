'use client';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles["about-container"]}>
      <section className={styles["hero"]}>
        <h1>About Handcrafted Haven</h1>
        <p>Your home for unique, handcrafted creations made with passion and purpose.</p>
      </section>

      <section className={styles["content"]}>
        <h2>Our Story</h2>
        <p>
          Handcrafted Haven was built to celebrate artisans — the talented creators who pour time,
          creativity, and dedication into every handmade piece. We believe handcrafted goods
          should be accessible to everyone, and artisans should have a place that truly values
          their work.
        </p>

        <h2>What We Stand For</h2>
        <ul>
          <li>🔥 Empowering local creators</li>
          <li>🌿 Sustainable and ethical craftsmanship</li>
          <li>✨ Unique, high-quality handmade products</li>
          <li>🤝 Fair opportunities for artisans</li>
        </ul>

        <h2>Why Shop With Us</h2>
        <p>
          Every item in Craft Haven tells a story — of creativity, culture, heritage, and art.
          Whether you&apos;re looking for a special gift or something handmade just for you, our
          marketplace connects you to artisans who care deeply about their craft.
        </p>
      </section>

      <div className={styles["explore-btn-wrapper"]}>
        <a href="/marketplace" className={styles["explore-btn"]}>
          Explore Marketplace
        </a>
      </div>
    </div>
  );
}
