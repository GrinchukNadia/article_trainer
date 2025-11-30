import LearnArticles from "./LearnArticles";
import styles from "./TrainWords.module.scss";
import type { ModalKey } from "../Modal/modals";
import { useSearchParams } from "react-router-dom";

import brocken_tab from "../../../../assets/18_00_07.png"
import w from "../../../../assets/19_48_58.png"
import wings from "../../../../assets/p16_58_19.png"
import r from "../../../../assets/19_13_13.png"
import candles from "../../../../assets/16_51_57.png"
import cats from "../../../../assets/12_24_07.png"


type TILES_TYPES = {
  key: ModalKey;
  area: string;
  title: string;
  description: string;
  url: string;
  size: string
}[];
export default function TrainWords() {
  const [, setSearchParams] = useSearchParams();
  const tiles: TILES_TYPES = [
    {
      key: "learnArticles",
      area: "a",
      title: "Начать изучение ",
      description: "Слова + артикли Der / Die / Das",
      url: r,
      size: "big"
    },
    {
      key: "einEineTrainer",
      area: "b",
      title: "Ein / Eine",
      description: "Тренировка неопределённых артиклей",
      url: w,
      size: "small"
    },
    {
      key: "articleSprint",
      area: "c",
      title: "Спринт",
      description: "Быстрое повторение и закрепление выученных слов",
      url: wings,
      size: "small"
    },
    {
      key: "mistakeReview",
      area: "d",
      title: "Мои ошибки",
      description: "Фокус на ошибках - тренируй слабые слова",
      url: brocken_tab,
      size: "small"
    },
    {
      key: "pluralTrainer",
      area: "e",
      title: "Множественное число",
      description: "Изучи и запомини plural-формы",
      url: candles,
      size: "small"
    },
    {
      key: "translateMaster",
      area: "f",
      title: "Мастер перевода ",
      description: "Проверка знания смысла слов",
      url: cats,
      size: "x-big"
    },
  ];
  return (
    <div className={styles.trainWords}>
      {tiles.map((t) => (
        <LearnArticles
          key={t.key}
          area={t.area}
          onClick={() => setSearchParams({ modal: t.key })}
          title={t.title}
          description={t.description}
          url={t.url}
          size={t.size}
        />
      ))}
    </div>
  );
}
