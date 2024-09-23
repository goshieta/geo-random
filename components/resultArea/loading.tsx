import styles from "@/styles/result/result.module.css";
import { useEffect, useRef, useState } from "react";

const messageArray = [
  "サイコロ振ってます！",
  "乱数発生させてます！",
  "くじ引きしてます！",
  "今の気分で選んでます！",
  "運試ししてます！",
  "じゃんけんしてます！",
  "コイントスしてます！",
  "ちょっとお手洗い行ってきます！",
];

export default function ResultLoading() {
  const [message, setMessage] = useState<string>("読み込み中...");
  useEffect(() => {
    setMessage(messageArray[Math.floor(Math.random() * messageArray.length)]);
  }, []);

  return (
    <div id={styles.loading}>
      <div className={styles.loading_animation_area}></div>
      <p>{message}</p>
    </div>
  );
}
