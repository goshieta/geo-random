export default async function getRandomPosition() {
  const query = `
    [out:json];
    (
      (
        node["leisure"="park"](around:5000,34.380839,132.467218);
        way["leisure"="park"](around:5000,34.380839,132.467218);
        relation["leisure"="park"](around:5000,34.380839,132.467218);
      );
      -
      (
        node["leisure"="park"](around:2000,34.380839,132.467218);
        way["leisure"="park"](around:2000,34.380839,132.467218);
        relation["leisure"="park"](around:2000,34.380839,132.467218);
      );
    );

    out body;
    >;
    out skel qt;
  `;
  const url = "https://overpass-api.de/api/interpreter?data=" + query;
  const result: any = await fetch(url);
  const json = JSON.parse(await result.text());
  const elements = json.elements;
  return elements[Math.floor(Math.random() * elements.length)];
}
