"use client";
import { useState } from "react";
import styles from "../styles/signup.module.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://supreme-guacamole-rwxpjgpqx6xhxvv5-8000.app.github.dev/accounts/signup/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!res.ok) {
        throw new Error(`Sign-up failed: ${res.status}`);
      }
      const data = await res.text(); // assuming the backend returns plain text like "User created successfully"
      setMessage(data);
      // Optionally, you can redirect to login:
      // window.location.href = "/login";
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
