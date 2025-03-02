"use client";
import Link from "next/link";
import styles from "./styles/page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>SOMNIO</h1>
      <div className={styles.buttonContainer}>
        <Link href="/login" legacyBehavior>
          <a className={styles.button}>Login</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a className={styles.button}>Get Started</a>
        </Link>
      </div>
    </div>
  );
}
