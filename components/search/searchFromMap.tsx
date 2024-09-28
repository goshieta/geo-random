import styles from "@/styles/top/search.module.css";
import dynamic from "next/dynamic";

import { useState } from "react";
import { LatLng } from "leaflet";

const SearchMap = dynamic(() => import("./searchMap"), { ssr: false });

export default function SearchFromMap({
  onMap,
  setOnMap,
  setPositionValue,
}: {
  onMap: boolean;
  setOnMap: (val: boolean) => void;
  setPositionValue: (val: string) => void;
}) {
  const [position, setPosition] = useState<LatLng | null>(null);

  return (
    <div
      id={styles.map_dialog_shadow}
      style={{ display: onMap ? "flex" : "none" }}
    >
      <div id={styles.map_dialog}>
        <SearchMap position={position} setPosition={setPosition} />
        <div id={styles.dialog_menu}>
          <button onClick={() => setOnMap(false)}>キャンセル</button>
          <button
            onClick={() => {
              setOnMap(false);
              if (position) {
                setPositionValue(`${position.lat},${position.lng}`);
              }
            }}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
}
