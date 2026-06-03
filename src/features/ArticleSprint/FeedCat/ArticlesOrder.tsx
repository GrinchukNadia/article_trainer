import type { Article, Result } from "./Types";
import styles from "./ArticlesOrder.module.scss";
import { pointerPosition } from "./FeedCatContent.constants";

type ArticleOrderProps = {
    articles: Article[];
    results: Result[]
};

export function ArticleOrder({ articles, results }: ArticleOrderProps) {
    return (
        <>
            <div className={styles.order}>
                <div className={styles.order_left}></div>
                <div className={styles.order_midle}>
                    {articles.map((article, index) => 
                        <div key={`${article}-${index}`} className={styles.article}>{article}</div>)}
                </div>
                <div className={styles.order_right}></div>
            </div>

            {results.map((result, index) => (
                <div
                     key={`${result}-${index}`} 
                    className={result === "correct" ? styles.correct : styles.wrong}
                    style={{ left: `${pointerPosition[index]}px` }}></div>
            ))}
        </>
    )
}