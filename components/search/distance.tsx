"use client";

import styles from "@/styles/top/search.module.css";

export default function DistanceInput() {
  return (
    <div id={styles.distance_input}>
      <label>
        <input type="number" placeholder="5" />
        km
      </label>
      <p>〜</p>
      <label>
        <input type="number" placeholder="20" />
        km
      </label>
    </div>
  );
}
