"use client";  // Ensure this file is a Client Component (so we can use state, event handlers)

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault(); // prevents default form submission (GET)
    try {
      const response = await fetch(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/accounts/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // The backend typically responds with { message: "Logged in successfully" }
        setServerMessage(data.message || "Logged in successfully");
      } else {
        // If Django returns 400 or some error, display it
        setServerMessage(data.error || JSON.stringify(data));
      }
    } catch (error) {
      // If the fetch itself fails (network error, etc.)
      setServerMessage("Error: " + error.message);
    }
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      {serverMessage && <p>{serverMessage}</p>}
    </main>
  ); 
}
