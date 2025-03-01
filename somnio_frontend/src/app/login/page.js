"use client"; // Marks this component as a client component

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/api/token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!res.ok) {
        throw new Error("Login failed: " + res.status);
      }
      const data = await res.json();
      // data should be { access: "your-access-token", refresh: "your-refresh-token" }
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      // Redirect user (e.g., to a dashboard page)
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
