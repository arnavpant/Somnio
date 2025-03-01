"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient"; // Make sure this file exists as discussed

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        // Fetch protected journal entries from Django.
        // This endpoint requires a valid JWT in the Authorization header.
        const res = await apiClient(
          "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch entries: " + res.status);
        }
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEntries();
  }, []);

  // Simple logout handler that clears tokens and redirects to login.
  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <h2>Your Journal Entries:</h2>
      {entries && entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.title || "Untitled"}</strong>: {entry.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </main>
  );
}
