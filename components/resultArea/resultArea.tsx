import getRandomPosition from "@/lib/getRandomPosition";
import styles from "@/styles/result/result.module.css";
import dynamic from "next/dynamic";

const RandomMap = dynamic(() => import("@/components/resultArea/map"), {
  ssr: false,
});

export default async function ResultArea() {
  const data = await getRandomPosition();
  let name = "名称のない公園";
  if (data.tags && data.tags.name) {
    name = data.tags.name;
  }
  return (
    <div id={styles.result}>
      <h1>{name}</h1>
      <a
        href={`https://www.google.com/maps/place/${data.lat},${data.lon}`}
        target="_blank"
      >
        google mapでアクセス
      </a>
      <RandomMap lat={data.lat} lon={data.lon} />
    </div>
  );
}
