"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/utils/apiClient";

/**
 * Example protected page that fetches data from "/journal/entries/"
 * requiring a valid JWT in the Authorization header
 */
export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        const res = await apiClient(
          "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/journal/entries/"
        );
        if (!res.ok) {
          throw new Error(`Error fetching entries: ${res.status}`);
        }
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadEntries();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  }

  return (
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #f3e5f5; /* a light purple background */
        }
        .logoutBtn {
          background-color: #c51162;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .logoutBtn:hover {
          background-color: #880e4f;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .entry {
          background: #fff;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 600px;
        }
        .entry h3 {
          margin-top: 0;
        }
      `}</style>
      <div className="container">
        <h1>Dashboard</h1>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
        {error && <p className="error">Error: {error}</p>}
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="entry">
              <h3>{entry.title || "Untitled"}</h3>
              <p>{entry.content}</p>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>
    </>
  );
}
