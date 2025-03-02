"use client";
import { useState } from "react";

/**
 * Sign-up page calls Django at "/accounts/signup/"
 * On success, we show a message or could redirect to /login
 */
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
      const data = await res.text(); // "User created successfully" or similar
      setMessage(data);
      // Optionally redirect to /login:
      // window.location.href = "/login";
    } catch (err) {
      setMessage(err.message);
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
          background-color: #fffde7; /* a pale background */
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
        .message {
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>

      <div className="container">
        <div className="formWrapper">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
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
              Sign Up
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}
