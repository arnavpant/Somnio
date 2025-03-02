"use client";
import { useState } from "react";

/**
 * Login page calls the Django JWT endpoint at "/api/token/"
 * On success, stores tokens in localStorage and redirects to /dashboard
 */
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
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e0f7fa; /* a light background */
        }
        .formWrapper {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 320px;
        }
        .formWrapper h1 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .inputField {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .button {
          width: 100%;
          padding: 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .error {
          color: red;
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>

      <div className="container">
        <div className="formWrapper">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="inputField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="button">
              Log In
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
}
