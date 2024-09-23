import styles from "@/styles/result/result.module.css";

export default function ResultError({ data }: { data: any }) {
  return (
    <div id={styles.result}>
      <h1>{data.messageTitle}</h1>
      {(data.message as string).split(`\n`).map((mes) => {
        return <p key={mes}>{mes}</p>;
      })}
    </div>
  );
}
