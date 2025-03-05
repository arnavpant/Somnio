"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";

// If your images are in src/app/icons, import them like this:
import journalIcon from "@/app/icons/journal.png";
import settingsIcon from "@/app/icons/settings.png";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link href="/dashboard/journal" legacyBehavior>
        <a className={styles.menuItem}>
          <Image
            src={journalIcon}
            alt="Journal Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles.label}>Journal</span>
        </a>
      </Link>
      <Link href="/dashboard/settings" legacyBehavior>
        <a className={styles.menuItem}>
          <Image
            src={settingsIcon}
            alt="Settings Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles.label}>Settings</span>
        </a>
      </Link>
    </div>
  );
}
