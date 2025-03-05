"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { apiClient } from "@/app/utils/apiClient";
import styles from "../styles/newEntry.module.css";

export default function NewEntryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await apiClient(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/",
        "POST",
        { title, content }
      );
      if (!res.ok) {
        throw new Error(`Error creating entry: ${res.status}`);
      }
      // On success, navigate back to the Journal list page.
      router.push("/dashboard/journal");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>New Journal Entry</h1>
        <form onSubmit={handleCreate} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.journalTitleInput}
          />
          <textarea
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.journalContent}
          ></textarea>
          <button type="submit" className={styles.saveButton} disabled={saving}>
            {saving ? "Saving..." : "Create Entry"}
          </button>
          {error && <p className={styles.error}>Error: {error}</p>}
        </form>
      </div>
    </div>
  );
}
