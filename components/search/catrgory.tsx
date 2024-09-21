"use client";

import styles from "@/styles/top/search.module.css";
import { useState } from "react";

const categoryOption = [
  "公園",
  "観光スポット",
  "史跡",
  "なんでもないところ",
  "寺社",
];

export default function Category() {
  const [categoryValue, setCategoryValue] = useState<string>("すべて");

  return (
    <div id={styles.category}>
      <select
        id={styles.category_select}
        onChange={(e) => setCategoryValue(e.target.value)}
        value={categoryValue}
      >
        <option value="すべて">すべてのカテゴリ</option>
        {categoryOption.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
