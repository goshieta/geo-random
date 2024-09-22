import { formattedSearchParamsType } from "@/lib/allType";
import getRandomPosition from "@/lib/getRandomPosition";
import styles from "@/styles/result/result.module.css";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const RandomMap = dynamic(() => import("@/components/resultArea/map"), {
  ssr: false,
});

export default async function ResultArea({
  searchParams,
}: {
  searchParams: formattedSearchParamsType;
}) {
  const data = await getRandomPosition(searchParams);

  if (data.error) {
    return (
      <div id={styles.result}>
        <h1>{data.messageTitle}</h1>
        <p>{data.message}</p>
      </div>
    );
  } else {
    let name = "名称不明";
    if (data.tags && data.tags.name) {
      name = data.tags.name;
    }
    return (
      <div id={styles.result}>
        <h1>{name}</h1>
        <div id={styles.map_area}>
          <RandomMap lat={data.lat} lon={data.lon} name={name} />
        </div>
        <div id={styles.links}>
          <InsertLink
            href={`https://www.google.com/maps/place/${data.lat},${data.lon}`}
            imgSrc="/serviceIcon/google_map.png"
          >
            Google Map
          </InsertLink>
          <InsertLink
            href={`https://map.yahoo.co.jp/place?&lat=${data.lat}1&lon=${data.lon}`}
            imgSrc="/serviceIcon/yahoo_map.png"
          >
            Yahoo!地図
          </InsertLink>
          {data.tags && data.tags.wikipedia && (
            <InsertLink
              href={`https://ja.wikipedia.org/wiki/${data.tags.wikipedia}`}
              imgSrc="/serviceIcon/wikipedia.png"
            >
              Wikipedia
            </InsertLink>
          )}
        </div>
      </div>
    );
  }
}

function InsertLink({
  href,
  imgSrc,
  children,
}: {
  href: string;
  imgSrc: string;
  children: ReactNode;
}) {
  return (
    <button className={styles.open_link}>
      <img src={imgSrc} alt={children?.toString()} width={32} height={32} />
      <p>{children}</p>
    </button>
  );
}
