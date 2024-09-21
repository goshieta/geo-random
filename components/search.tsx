import styles from "@/styles/top/search.module.css";
import Postion from "./search/position";
import DistanceInput from "./search/distance";
import Category from "./search/catrgory";

export default function Search() {
  const handleRandom = () => {};

  return (
    <div id={styles.search}>
      <div id={styles.search_area}>
        <div id={styles.search_box}>
          <Postion />
          <DistanceInput />
          <Category />
        </div>
        <button id={styles.random}>ランダム！</button>
      </div>
    </div>
  );
}
