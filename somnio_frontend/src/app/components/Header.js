"use client";
import { useState, useEffect } from "react";
import { VT323 } from "next/font/google";
import styles from "./Header.module.css";

const pixelFont = VT323({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const optionsDate = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  const formattedDate = dateTime.toLocaleDateString("en-US", optionsDate);

  const optionsTime = { hour: "numeric", minute: "numeric" };
  const formattedTime = dateTime
    .toLocaleTimeString("en-US", optionsTime)
    .replace("AM", "am")
    .replace("PM", "pm");

  return (
    <div className={`${styles.header} ${pixelFont.className}`}>
      <div>{formattedDate}</div>
      <div>{formattedTime}</div>
    </div>
  );
}
