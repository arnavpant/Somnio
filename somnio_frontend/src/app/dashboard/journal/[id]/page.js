"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/app/utils/apiClient";
import Sidebar from "@/app/components/Sidebar";
import styles from "./journalDetail.module.css";

export default function JournalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [journal, setJournal] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchJournal() {
      try {
        const res = await apiClient(
          `https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/${id}/`
        );
        if (!res.ok) {
          throw new Error(`Error fetching journal: ${res.status}`);
        }
        const data = await res.json();
        setJournal(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJournal();
  }, [id]);

  // Auto-resize function for textarea (Approach B)
  function autoResize(e) {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  async function handleUpdate(e) {
    e.preventDefault(); // Prevent default form submission
    setSaving(true);
    try {
      const res = await apiClient(
        `https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/${id}/`,
        "PUT",
        { title: journal.title, content: journal.content }
      );
      if (!res.ok) {
        throw new Error(`Error updating journal: ${res.status}`);
      }
      router.push("/dashboard/journal");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!journal) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        {/* Editable title input styled as a heading */}
        <input
          type="text"
          value={journal.title}
          onChange={(e) => setJournal({ ...journal, title: e.target.value })}
          className={styles.journalTitleInput}
          placeholder="Title"
        />
        {/* Auto-resizing textarea for content */}
        <textarea
          value={journal.content}
          onChange={(e) => {
            setJournal({ ...journal, content: e.target.value });
            autoResize(e);
          }}
          onInput={autoResize}
          className={styles.journalContent}
          placeholder="Content..."
        />
        {/* Use the form's onSubmit for saving changes */}
        <form onSubmit={handleUpdate} className={styles.form}>
          <button type="submit" className={styles.saveButton} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
