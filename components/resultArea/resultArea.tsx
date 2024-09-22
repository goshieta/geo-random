import getRandomPosition from "@/lib/getRandomPosition";
import styles from "@/styles/result/result.module.css";
import dynamic from "next/dynamic";

const RandomMap = dynamic(() => import("@/components/resultArea/map"), {
  ssr: false,
});

export default async function ResultArea() {
  const data = await getRandomPosition();
  let name = "名称不明の公園";
  if (data.tags && data.tags.name) {
    name = data.tags.name;
  }
  return (
    <div id={styles.result}>
      <h1>{name}</h1>
      <div id={styles.links}>
        <a
          href={`https://www.google.com/maps/place/${data.lat},${data.lon}`}
          target="_blank"
        >
          Google Map
        </a>
        <a
          href={`https://map.yahoo.co.jp/place?&lat=${data.lat}1&lon=${data.lon}`}
        >
          Yahoo!地図
        </a>
        {data.tags && data.tags.wikipedia && (
          <a href={`https://ja.wikipedia.org/wiki/${data.tags.wikipedia}`}>
            Wikipedia
          </a>
        )}
      </div>
      <RandomMap lat={data.lat} lon={data.lon} name={name} />
    </div>
  );
}
