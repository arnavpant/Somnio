"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import { apiClient } from "@/app/utils/apiClient";
import styles from "../styles/journal.module.css";

export default function JournalPage() {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
        // Sort descending by created_at (newest first)
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setJournals(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJournals();
  }, []);

  // Filter journals by search term
  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date
      .toLocaleTimeString("en-US", options)
      .replace("AM", "am")
      .replace("PM", "pm");
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
              <Link
                href={`/dashboard/journal/${journal.id}`}
                key={journal.id}
                legacyBehavior
              >
                <a className={styles.journalCard}>
                  <input
                    type="text"
                    defaultValue={journal.title}
                    className={styles.journalTitle}
                    readOnly
                  />
                  <p className={styles.journalDate}>
                    Created on: {formatDate(journal.created_at)} at{" "}
                    {formatTime(journal.created_at)}
                  </p>
                </a>
              </Link>
            ))
          ) : (
            <p className={styles.noJournals}>No journal entries found.</p>
          )}
        </div>
        <Link href="/dashboard/new-entry" legacyBehavior>
          <a className={styles.newEntryButton}>+</a>
        </Link>
      </div>
    </div>
  );
}
