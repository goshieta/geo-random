"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";

import "@/styles/result/map.css";

export default function RandomMap({ lat, lon }: { lat: number; lon: number }) {
  if (typeof lat !== "number" || typeof lon != "number") {
    return <div>読み込み中...</div>;
  } else {
    const position = new LatLng(lat, lon);
    return (
      <MapContainer center={position} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    );
  }
}
