"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";

// Import images from src/app/icons
import dashboardIcon from "@/app/icons/dashboard.png";
import journalIcon from "@/app/icons/journal.png";
import settingsIcon from "@/app/icons/settings.png";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Dashboard Link */}
      <Link href="/dashboard" legacyBehavior>
        <a className={styles.menuItem}>
          <Image
            src={dashboardIcon}
            alt="Dashboard Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles.label}>Dashboard</span>
        </a>
      </Link>

      {/* Journal Link */}
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

      {/* Settings Link */}
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
