"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import { apiClient } from "@/app/utils/apiClient";
import styles from "../styles/journal.module.css";

export default function JournalPage() {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchJournals() {
      try {
        const res = await apiClient(
          "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/"
        );
        if (!res.ok) {
          throw new Error(`Error fetching journals: ${res.status}`);
        }
        const data = await res.json();
        // Sort descending (newest first)
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setJournals(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJournals();
  }, []);

  // Filter journals by search term (if needed)
  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and time functions
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString("en-US", options).replace("AM", "am").replace("PM", "pm");
  }

  // Handle deletion of a journal entry
  async function handleDelete(journalId) {
    try {
      const res = await apiClient(
        `https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/${journalId}/`,
        "DELETE"
      );
      if (!res.ok) {
        throw new Error(`Error deleting journal: ${res.status}`);
      }
      setJournals(prev => prev.filter(journal => journal.id !== journalId));
    } catch (err) {
      setError(err.message);
    }
  }

  // JournalCard component: displays each journal entry with a triple-dot menu
  function JournalCard({ journal }) {
    const [showMenu, setShowMenu] = useState(false);
  
    const confirmAndDelete = () => {
      const confirmation = window.prompt("Type 'delete' to confirm deletion of this journal entry");
      if (confirmation === "delete") {
        handleDelete(journal.id);
      }
    };
  
    return (
      <div className={styles.journalCard}>
        <div className={styles.cardContent}>
          <div className={styles.cardText}>
            <input
              type="text"
              defaultValue={journal.title}
              readOnly
              className={styles.journalTitle}
            />
            <p className={styles.journalDate}>
              Created on: {formatDate(journal.created_at)} at {formatTime(journal.created_at)}
            </p>
          </div>
          <div className={styles.cardMenu}>
            <button
              className={styles.menuButton}
              onClick={() => setShowMenu(!showMenu)}
            >
              ⋮
            </button>
            {showMenu && (
              <div className={styles.menuDropdown}>
                <button onClick={() => router.push(`/dashboard/journal/${journal.id}`)}>
                  Edit
                </button>
                <button onClick={confirmAndDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Journal</h1>
        <input
          type="text"
          placeholder="Search journals..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {error && <p className={styles.error}>Error: {error}</p>}
        <div className={styles.journalList}>
          {filteredJournals.length > 0 ? (
            filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))
          ) : (
            <p className={styles.noJournals}>No journal entries found.</p>
          )}
        </div>
        <button
          className={styles.newEntryButton}
          onClick={() => router.push("/dashboard/new-entry")}
        >
          +
        </button>
      </div>
    </div>
  );
}
