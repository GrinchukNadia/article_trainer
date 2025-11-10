import LearnArticles from "./LearnArticles/LearnArticles";
import styles from "../TrainList/Train.module.scss";
import type { ModalKey } from "./Modal/modals";
import { useSearchParams } from "react-router-dom";

type TILES_TYPES = {
  key: ModalKey;
  area: string;
  title: string;
  description: string;
}[];
export default function TrainWords() {
  const [, setSearchParams] = useSearchParams();
  const tiles: TILES_TYPES = [
    {
      key: "flashcards",
      area: "a",
      title: "Начать изучение ",
      description: "Слова + артикли Der / Die / Das",
    },
    {
      key: "brainstorm",
      area: "b",
      title: "Ein / Eine",
      description: "Тренировка неопределённых артиклей",
    },
    {
      key: "translate",
      area: "c",
      title: "Спринт",
      description: "Быстрое повторение и закрепление выученных слов",
    },
    {
      key: "repeat",
      area: "d",
      title: "Мои ошибки",
      description: "Фокус на ошибках - тренируй слабые слова",
    },
    {
      key: "constructor",
      area: "e",
      title: "Множественное число",
      description: "Изучи и запомини plural-формы",
    },
    {
      key: "sprint",
      area: "f",
      title: "Мастер перевода ",
      description: "Проверка знания смысла слов",
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
        />
      ))}
    </div>
  );
}
