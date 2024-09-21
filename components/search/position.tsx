"use client";

import styles from "@/styles/top/search.module.css";
import { useState } from "react";

export default function Postion() {
  const [locate, setLocate] = useState("");

  return (
    <div id={styles.position}>
      <input
        type="text"
        id={styles.position_input}
        placeholder="場所を入力 - 例：安芸津"
        value={locate}
        onChange={(e) => setLocate(e.target.value)}
      />
      <button id={styles.from_now_position}>現在地</button>
    </div>
  );
}
