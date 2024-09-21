import ResultArea from "@/components/resultArea/resultArea";
import Search from "@/components/search";
import styles from "@/styles/result/result.module.css";

export default async function Result() {
  return (
    <div id={styles.result_page}>
      <Search />
      <ResultArea />
    </div>
  );
}
