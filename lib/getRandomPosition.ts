import { formattedSearchParamsType } from "./allType";

export default async function getRandomPosition(
  searchParams: formattedSearchParamsType
) {
  //位置を特定
  const positionJSON = await fetch(
    `http://nominatim.openstreetmap.org/search?format=json&q=${searchParams.position}`
  )
    .then((result) => result.text())
    .then((txt) => JSON.parse(txt)[0]);
  const position = [positionJSON.lat, positionJSON.lon];
  //クエリを作成
  const query = `
  [out:json];
  (
    (
      node["leisure"="park"](around:5000,${position[0]},${position[1]});
      way["leisure"="park"](around:5000,${position[0]},${position[1]});
      relation["leisure"="park"](around:5000,${position[0]},${position[1]});
    );
    -
    (
      node["leisure"="park"](around:2000,${position[0]},${position[1]});
      way["leisure"="park"](around:2000,${position[0]},${position[1]});
      relation["leisure"="park"](around:2000,${position[0]},${position[1]});
    );
  );

  out body;
  >;
  out skel qt;
`;
  //検索
  const url = "https://overpass-api.de/api/interpreter?data=" + query;
  const result: any = await fetch(url);
  const json = JSON.parse(await result.text());
  const elements = json.elements;
  console.log(elements);
  if (elements.length === 0) return undefined;
  return elements[Math.floor(Math.random() * elements.length)];
}
