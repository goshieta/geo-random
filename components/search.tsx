"use client";

import styles from "@/styles/top/search.module.css";
import Postion from "./search/position";
import DistanceInput from "./search/distance";
import Category from "./search/catrgory";
import { useState } from "react";

export default function Search() {
  const [formData, setFormData] = useState({
    position: "",
    distance: { min: "", max: "" },
    category: "すべて",
  });
  const handleSetFormData = (
    name: string,
    data: string | { min: string; max: string }
  ) => setFormData({ ...formData, [name]: data });

  const handleRandom = () => {
    // リダイレクトする
  };

  return (
    <div id={styles.search}>
      <div id={styles.search_area}>
        <div id={styles.search_box}>
          <Postion
            locate={formData.position}
            setLocate={(val) => handleSetFormData("position", val)}
          />
          <DistanceInput
            distanceData={formData.distance}
            setDistanceData={(val) => handleSetFormData("distance", val)}
          />
          <Category
            categoryValue={formData.category}
            setCategoryValue={(val) => handleSetFormData("category", val)}
          />
        </div>
        <button id={styles.random} onClick={handleRandom}>
          ランダム！
        </button>
      </div>
    </div>
  );
}
