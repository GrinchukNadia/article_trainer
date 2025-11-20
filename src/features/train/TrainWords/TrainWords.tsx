import LearnArticles from "./LearnArticles/LearnArticles";
import styles from "../TrainList/Train.module.scss";
import type { ModalKey } from "./Modal/modals";
import { useSearchParams } from "react-router-dom";
import background1 from "../../../assets/background1.1.png"
import background2 from "../../../assets/background2.png"
import background3 from "../../../assets/background3.png"
import background4 from "../../../assets/background4.png"
import background5 from "../../../assets/background5.png"

type TILES_TYPES = {
  key: ModalKey;
  area: string;
  title: string;
  description: string;
  url: string;
}[];
export default function TrainWords() {
  const [, setSearchParams] = useSearchParams();
  const tiles: TILES_TYPES = [
    {
      key: "flashcards",
      area: "a",
      title: "Начать изучение ",
      description: "Слова + артикли Der / Die / Das",
      url: background1,
    },
    {
      key: "brainstorm",
      area: "b",
      title: "Ein / Eine",
      description: "Тренировка неопределённых артиклей",
      url: background2,
    },
    {
      key: "translate",
      area: "c",
      title: "Спринт",
      description: "Быстрое повторение и закрепление выученных слов",
      url: background3,
    },
    {
      key: "repeat",
      area: "d",
      title: "Мои ошибки",
      description: "Фокус на ошибках - тренируй слабые слова",
      url: background4,
    },
    {
      key: "constructor",
      area: "e",
      title: "Множественное число",
      description: "Изучи и запомини plural-формы",
      url: background5,
    },
    {
      key: "sprint",
      area: "f",
      title: "Мастер перевода ",
      description: "Проверка знания смысла слов",
      url: background1,
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
        />
      ))}
    </div>
  );
}
