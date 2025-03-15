"use client";
import { useEffect } from "react";

export default function BackgroundUpdater() {
  useEffect(() => {
    // Read settings from localStorage (or use defaults)
    const bgColor = localStorage.getItem("bgColor") || "#004d70";
    const journalFont = localStorage.getItem("journalFont") || "Inter";
    // Set global CSS variables
    document.documentElement.style.setProperty("--global-bg-color", bgColor);
    document.documentElement.style.setProperty("--journal-font", `'${journalFont}', sans-serif`);
  }, []);
  return null; // This component doesn't render any visible output
}
