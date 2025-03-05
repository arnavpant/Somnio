"use client";
import Sidebar from "@/app/components/Sidebar";
import styles from "../styles/dashboard.module.css";

export default function DashboardPage() {
  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Dashboard</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
        <p>
          Welcome to your dashboard! Use the sidebar to navigate to your Journal or Settings pages.
        </p>
      </div>
    </div>
  );
}
