import Search from "@/components/search";
import styles from "@/styles/result/result.module.css";
import ResultArea from "@/components/resultArea/resultArea";

type searchParamsType = {
  position?: string;
  min?: string;
  max?: string;
  category?: string;
};

export default function Result({
  searchParams,
}: {
  searchParams?: searchParamsType;
}) {
  const formatedSearchParams = {
    position: searchParams?.position ? searchParams.position : "安芸津",
    min: Number(searchParams?.min ? searchParams.min : 5) * 1000, //mに単位を直す
    max: Number(searchParams?.max ? searchParams.max : 20) * 1000, //mに単位を直す
    category: searchParams?.category ? searchParams.category : "すべて",
  };
  return (
    <div id={styles.result_page}>
      <Search searchParams={formatedSearchParams} />
      <ResultArea searchParams={formatedSearchParams} />
    </div>
  );
}
