import Tile from "./Tile";
import styles from "./TilesGrid.module.scss";
import type { ModalKey } from "../trainModals/modals";
import { useSearchParams } from "react-router-dom";

import brocken_tab from "../../../assets/18_00_07.png"
import w from "../../../assets/19_48_58.png"
import wings from "../../../assets/p16_58_19.png"
import r from "../../../assets/19_13_13.png"
import candles from "../../../assets/16_51_57.png"
import cats from "../../../assets/12_24_07.png"


type TILES_TYPES = {
  key: ModalKey;
  area: string;
  title: string;
  description: string;
  url: string;
  size: string;
  disabled: boolean;
}[];
export default function TilesGrid() {
  const [, setSearchParams] = useSearchParams();
  const tiles: TILES_TYPES = [
    {
      key: "learnArticles",
      area: "a",
      title: "Начать изучение ",
      description: "Слова + артикли Der / Die / Das",
      url: r,
      size: "big",
      disabled: false,
    },
    {
      key: "einEineTrainer",
      area: "b",
      title: "Ein / Eine",
      description: "Тренировка неопределённых артиклей",
      url: w,
      size: "small",
      disabled: false,
    },
    {
      key: "grammar",
      area: "c",
      title: "Грамматика",
      description: "Изучай грамматику с уже знакомыми словами",
      url: wings,
      size: "small",
      disabled: false,
    },
    {
      key: "mistakeReview",
      area: "d",
      title: "Мои ошибки",
      description: "Фокус на ошибках - тренируй слабые слова",
      url: brocken_tab,
      size: "small",
      disabled: true,
    },
    {
      key: "pluralTrainer",
      area: "e",
      title: "Множественное число",
      description: "Изучи и запомини plural-формы",
      url: candles,
      size: "small",
      disabled: true,
    },
    {
      key: "translateMaster",
      area: "f",
      title: "Мастер перевода ",
      description: "Проверка знания смысла слов",
      url: cats,
      size: "x-big",
      disabled: true,
    },
  ];
  return (
    <div className={styles.trainWords}>
      {tiles.sort().map((t) => (
        <Tile
          key={t.key}
          area={t.area}
          onClick={t.disabled ? ()=>{} : () => setSearchParams({ modal: t.key } )}
          title={t.title}
          description={t.description}
          url={t.url}
          size={t.size}
          disabled={t.disabled}
        />
      ))}
    </div>
  );
}
