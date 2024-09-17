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
      <div id={styles.search_area}>
        <div id={styles.search_box}>
          <div id={styles.position}>
            <input
              type="text"
              id={styles.position_input}
              placeholder="場所を入力 - 例：安芸津"
            />
            <button id={styles.from_now_position}>現在地</button>
          </div>
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
          <div id={styles.category}>
            <select id={styles.category_select}>
              <option value="すべて">すべてのカテゴリ</option>
              {categoryOption.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button id={styles.random}>ランダム！</button>
      </div>
    </div>
  );
}
