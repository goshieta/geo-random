"use client";

import styles from "@/styles/top/search.module.css";

const categoryOption = [
  "公園",
  "観光スポット",
  "史跡",
  "なんでもないところ",
  "寺社",
];

export default function Search() {
  return (
    <div id={styles.search}>
      <div id={styles.position}>
        <p>中心地点が設定されていません</p>
        <button>地図から</button>
        <button>現在地から</button>
      </div>
      <div id={styles.distance}>
        <p>何kmくらいがよいか</p>
        <div>
          <input type="number" />
          <p>~</p>
          <input type="number" />
        </div>
      </div>
      <div id={styles.category}>
        <div>
          <input
            type="checkbox"
            name="distance"
            id={`distance_option_すべて`}
          />
          <label htmlFor="distance_option_すべて">すべて</label>
        </div>
        {categoryOption.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              name="distance"
              id={`distance_option_${category}`}
            />
            <label htmlFor={`distance_option_${category}`}>{category}</label>
          </div>
        ))}
      </div>
      <div>
        <button>ランダム！</button>
      </div>
    </div>
  );
}
