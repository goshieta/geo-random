"use client";

import styles from "@/styles/top/search.module.css";

export default function DistanceInput({
  distanceData,
  setDistanceData,
}: {
  distanceData: { min: string; max: string };
  setDistanceData: (val: { min: string; max: string }) => void;
}) {
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
