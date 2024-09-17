import KyouRyoku from "@/components/kyouryoku";
import Search from "@/components/search";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div id={styles.top}>
      <div id={styles.title_area}>
        <h1 id={styles.title}>偶然旅行</h1>
        <h2 id={styles.catchcopy}>
          どこかに行きたいけどどこに行こう？
          様々な条件からランダムな地点をあなたに提示します。
          散歩、サイクリング、ドライブなど様々な場面で大活躍！
        </h2>
      </div>
      <Search />
      <div id={styles.footer}>
        <div></div>
        <KyouRyoku />
      </div>
    </div>
  );
}
