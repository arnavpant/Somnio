"use client";
import { useState } from "react";
import styles from "../styles/login.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
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
        throw new Error(`Login failed: ${res.status}`);
      }
      const data = await res.json(); // {access, refresh}
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
