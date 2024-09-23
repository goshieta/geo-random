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
        "地図データにこの場所は登録されていないようです。\nその他の近くにある建物名を入力するか、「34.318070,132.818173」のように座標で入力してください。\nまた地図から中心地点を検索することもできます。",
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
  const result: any = await fetch(url).catch((reason) => {
    return {
      text: async () =>
        `<<<サーバー上で通信エラーが発生しました。>>>\n${reason}`,
    };
  });
  let json: any = {};
  const resultTxt = await result.text();
  try {
    json = JSON.parse(resultTxt);
  } catch {
    return {
      error: true,
      messageTitle: "例外が発生しました",
      message: `何らかの原因により予期しない例外が発生しました。以下はエラーメッセージです。良ければエラーメッセージと一緒に開発者に報告してください。\n${resultTxt}`,
    };
  }
  if (json.remark) {
    return {
      error: true,
      messageTitle: "サーバーからエラーが返されました",
      message: `対象の施設が多すぎると考えられます。\n範囲をもっと狭くするか、カテゴリを変えてみてください。例えば、観光スポットだったら公園よりは数が少ないかもしれません。\n以下はサーバーから返されたエラーです。\n${json.remark}`,
    };
  }
  const elements = json.elements;
  if (elements.length === 0)
    return {
      error: true,
      messageTitle: "施設が見つかりません",
      message: `${searchParams.position}の近くに、「${searchParams.category}」に該当する施設は存在しないようです。\nもっと広い範囲で「ランダム！」するか、中心地点を変更してください。`,
    };
  console.log(elements.length);
  return elements[Math.floor(Math.random() * elements.length)];
}
