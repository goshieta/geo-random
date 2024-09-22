"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";

import "@/styles/result/map.css";

// add icons
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function RandomMap({
  lat,
  lon,
  name,
}: {
  lat: number;
  lon: number;
  name: string;
}) {
  if (typeof lat !== "number" || typeof lon != "number") {
    return <div>読み込み中...</div>;
  } else {
    const position = new LatLng(lat, lon);
    return (
      <MapContainer center={position} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    );
  }
}
