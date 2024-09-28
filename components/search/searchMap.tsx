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
}) {
  return (
    <MapContainer
      center={[34.3186843, 132.81917]}
      zoom={10}
      style={{ width: 600, height: 400, borderRadius: 5 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
      />
      <CenterMarker {...args} />
    </MapContainer>
  );
}

const CenterMarker = ({
  position,
  setPosition,
}: {
  position: LatLng | null;
  setPosition: (val: LatLng | null) => void;
}) => {
  const map = useMap();

  useMapEvents({
    move() {
      setPosition(map.getCenter());
    },
  });

  useEffect(() => {
    setPosition(map.getCenter());
  }, [map]);

  return position === null ? null : <Marker position={position}></Marker>;
};
