"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { apiClient } from "@/app/utils/apiClient"; // Optional: if you later connect these settings to an API
import styles from "./settings.module.css";

export default function SettingsPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [font, setFont] = useState("Inter");
  const [bgColor, setBgColor] = useState("#004d70");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load stored settings (for demo, using localStorage)
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    const storedFont = localStorage.getItem("journalFont") || "Inter";
    const storedBgColor = localStorage.getItem("bgColor") || "#004d70";
    setUsername(storedUsername);
    setFont(storedFont);
    setBgColor(storedBgColor);
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setMessage("");
  
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    try {
      // Save settings to localStorage (or send to backend as needed)
      localStorage.setItem("username", username);
      localStorage.setItem("journalFont", font);
      localStorage.setItem("bgColor", bgColor);
  
      // Immediately update the global CSS variables:
      document.documentElement.style.setProperty("--global-bg-color", bgColor);
      document.documentElement.style.setProperty("--journal-font", `'${font}', sans-serif`);
  
      setMessage("Settings updated successfully.");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }
  

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Font for Journals:</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className={styles.select}
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              {/* Add more fonts as needed */}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className={styles.colorInput}
            />
          </div>
          <button type="submit" className={styles.saveButton}>
            Save Settings
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
