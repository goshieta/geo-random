import styles from "@/styles/common/kyouryoku.module.css";
import Image from "next/image";

export default function KyouRyoku() {
  return (
    <div>
      <div id={styles.fl_logo}>
        <div id={styles.fll_icon}>
          <Image src="/KyouRyoku.png" alt="" width={50} height={50} />
        </div>
        <div id={styles.fll_string}>
          <p>KyouRyoku</p>
          <h2>峡緑</h2>
        </div>
      </div>
      <p>@2024 KyouRyoku</p>
    </div>
  );
}
