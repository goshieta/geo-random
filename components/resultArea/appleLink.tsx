"use client";

import InsertLink from "./insertLink";

export default function AppleLink({ lat, lon }: { lat: number; lon: number }) {
  const isAppleDevice =
    window &&
    /Macintosh|iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  if (isAppleDevice) {
    return (
      <InsertLink
        href={`https://maps.apple.com/?q=${lat},${lon}`}
        imgSrc="/serviceIcon/apple_map.png"
      >
        Apple Map
      </InsertLink>
    );
  } else {
    return <></>;
  }
}
