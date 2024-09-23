"use client";

import { formattedSearchParamsType } from "@/lib/allType";
import getRandomPosition from "@/lib/getRandomPosition";
import styles from "@/styles/result/result.module.css";
import dynamic from "next/dynamic";
import InsertLink from "./insertLink";
import { useEffect, useRef, useState } from "react";
import ResultLoading from "./loading";
import ResultError from "./error";

const RandomMap = dynamic(() => import("@/components/resultArea/map"), {
  ssr: false,
});
const AppleLink = dynamic(() => import("./appleLink"), { ssr: false });

export default function ResultArea({
  searchParams,
}: {
  searchParams: formattedSearchParamsType;
}) {
  const [data, setData] = useState<any | null>(null);
  const alreadyRead = useRef(false);

  useEffect(() => {
    if (alreadyRead.current) return;
    alreadyRead.current = true;
    getRandomPosition(searchParams).then((data) => setData(data));
  }, []);

  if (data === null) {
    return <ResultLoading />;
  } else if (data.error) {
    return <ResultError data={data} />;
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
          <AppleLink lat={data.lat} lon={data.lon} />
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
