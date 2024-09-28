import styles from "@/styles/top/search.module.css";
import SearchFromMap from "./searchFromMap";
import { useState } from "react";

export default function Postion({
  locate,
  setLocate,
}: {
  locate: string;
  setLocate: (val: string) => void;
}) {
  const handleGetPosition = (position: GeolocationPosition) => {
    //現在地を取得
    setLocate(`${position.coords.latitude},${position.coords.longitude}`);
  };
  const [onMap, setOnMap] = useState(false);

  return (
    <div id={styles.position}>
      <input
        type="text"
        id={styles.position_input}
        placeholder="場所を入力 - 例：安芸津"
        value={locate}
        onChange={(e) => setLocate(e.target.value)}
      />
      <button
        className={styles.location_button}
        onClick={() =>
          navigator.geolocation.getCurrentPosition(handleGetPosition, () => {
            alert("位置情報の取得ができませんでした");
          })
        }
      >
        現在地
      </button>
      <button className={styles.location_button} onClick={() => setOnMap(true)}>
        地図
      </button>
      <SearchFromMap
        onMap={onMap}
        setOnMap={setOnMap}
        setPositionValue={setLocate}
      />
    </div>
  );
}
