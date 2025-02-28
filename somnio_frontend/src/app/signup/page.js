"use client";  // Marks this file as a client component, allowing useState, onClick, etc.

import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    
    try {
      const response = await fetch(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/accounts/signup/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If Django responds with status 201 or 200, etc.
        setServerMessage(data.message || "Sign-up successful!");
      } else {
        // Django might respond with error details (e.g. user already exists)
        setServerMessage(JSON.stringify(data));
      }
    } catch (error) {
      setServerMessage("Error: " + error.message);
    }
  }

  return (
    <main style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {serverMessage && <p>{serverMessage}</p>}
    </main>
  );
}
