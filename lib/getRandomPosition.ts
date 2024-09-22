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
  if (positionJSON === undefined)
    return {
      error: true,
      messageTitle: `${searchParams.position}がどこか分かりません`,
      message:
        "地図データにこの場所は登録されていないようです。その他の近くにある建物名を入力するか、「34.318070,132.818173」のように座標で入力してください。",
    };
  const position = [positionJSON.lat, positionJSON.lon];
  //クエリを作成
  const categoryQuery: { [key: string]: string } = {
    公園: `["leisure"="park"]`,
    観光スポット: `["tourism"]`,
    史跡: `["historic"]`,
    寺社: `["amenity"="place_of_worship"]`,
  };
  let templateQuery = "";
  if (categoryQuery[searchParams.category]) {
    const category = categoryQuery[searchParams.category];
    const min = searchParams.min;
    const max = searchParams.max;
    const lat = position[0];
    const lon = position[1];
    templateQuery = `
    (
      (
        node${category}(around:${max},${lat},${lon});
        way${category}(around:${max},${lat},${lon});
        relation${category}(around:${max},${lat},${lon});
      );
      -
      (
        node${category}(around:${min},${lat},${lon});
        way${category}(around:${min},${lat},${lon});
        relation${category}(around:${min},${lat},${lon});
      );
    );
  `;
  } else {
    //すべてや、よくわからないカテゴリ
    templateQuery = `
    (
      node(around:${searchParams.max},${position[0]},${position[1]});
      -
      node(around:${searchParams.min},${position[0]},${position[1]});
    );
  `;
  }
  const query = `
    [out:json];
    ${templateQuery}
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
  if (elements.length === 0)
    return {
      error: true,
      messageTitle: "施設が見つかりません",
      message: `${searchParams.position}の近くに、「${searchParams.category}」に該当する施設は存在しないようです。もっと広い範囲で「ランダム！」するか、中心地点を変更してください。`,
    };
  return elements[Math.floor(Math.random() * elements.length)];
}
