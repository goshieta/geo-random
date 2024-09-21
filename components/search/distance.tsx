"use client";

import styles from "@/styles/top/search.module.css";
import { useState } from "react";

export default function DistanceInput() {
  const [distanceData, setDistanceData] = useState({ min: "", max: "" });

  return (
    <div id={styles.distance_input}>
      <label>
        <input
          type="number"
          placeholder="5"
          value={distanceData.min}
          onChange={(e) =>
            setDistanceData({ ...distanceData, min: e.target.value })
          }
        />
        km
      </label>
      <p>〜</p>
      <label>
        <input
          type="number"
          placeholder="20"
          value={distanceData.max}
          onChange={(e) =>
            setDistanceData({ ...distanceData, max: e.target.value })
          }
        />
        km
      </label>
    </div>
  );
}
