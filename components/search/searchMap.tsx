"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// add icons
import L, { LatLng } from "leaflet";
import { useEffect } from "react";

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function SearchMap(args: {
  position: LatLng | null;
  setPosition: (val: LatLng | null) => void;
  onMap: boolean;
}) {
  return (
    <MapContainer
      center={[34.3186843, 132.81917]}
      zoom={10}
      style={{ width: 600, height: 400, borderRadius: 5 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMarker {...args} />
    </MapContainer>
  );
}

const CenterMarker = ({
  position,
  setPosition,
  onMap,
}: {
  position: LatLng | null;
  setPosition: (val: LatLng | null) => void;
  onMap: boolean;
}) => {
  const map = useMap();

  useMapEvents({
    move() {
      const center = map.getCenter();
      setPosition(center);
    },
  });

  useEffect(() => {
    const center = map.getCenter();
    setPosition(center);
  }, [map]);

  useEffect(() => {
    if (onMap) {
      if (map) {
        map.invalidateSize();
      }
    }
  }, [onMap]);

  // マーカーを常に地図の中心に表示
  return <Marker position={position || map.getCenter()}></Marker>;
};
