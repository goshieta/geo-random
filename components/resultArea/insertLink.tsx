"use client";

import { ReactNode } from "react";
import styles from "@/styles/result/result.module.css";

export default function InsertLink({
  href,
  imgSrc,
  children,
}: {
  href: string;
  imgSrc: string;
  children: ReactNode;
}) {
  const handleOpenLink = () => {
    window.open(href, "_blank");
  };

  return (
    <button className={styles.open_link} onClick={handleOpenLink}>
      <img src={imgSrc} alt={children?.toString()} width={32} height={32} />
      <p>{children}</p>
    </button>
  );
}
