"use client";

import styles from "@/styles/top/search.module.css";

export default function Postion() {
  return (
    <div id={styles.position}>
      <input
        type="text"
        id={styles.position_input}
        placeholder="場所を入力 - 例：安芸津"
      />
      <button id={styles.from_now_position}>現在地</button>
    </div>
  );
}
