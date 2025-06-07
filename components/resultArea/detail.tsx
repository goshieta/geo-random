import styles from "@/styles/result/result.module.css";

type dataType = {
  id: number;
  lat: number;
  lon: number;
};

export default function Detail({
  data,
  position,
}: {
  data: dataType;
  position: [number, number];
}) {
  return (
    <div id={styles.detail_area}>
      <div>
        <p>緯度,経度</p>
        <p>
          {data.lat},{data.lon}
        </p>
      </div>
      <div>
        <p>直線距離</p>
        <p>{calcDistance(position[0], position[1], data.lat, data.lon)}km</p>
      </div>
    </div>
  );
}

function calcDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  const R = 6371e3; // 地球の半径 (メートル)
  const φ1 = (lat1 * Math.PI) / 180; // 緯度をラジアンに変換
  const φ2 = (lat2 * Math.PI) / 180; // 緯度をラジアンに変換
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // 緯度の差をラジアンに変換
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // 経度の差をラジアンに変換

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 距離を計算 (メートル)

  return (distance / 1000).toPrecision(3); // キロメートルに変換して小数点以下3桁まで表示
}
