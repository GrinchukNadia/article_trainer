// FallingSprint.tsx
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../reduxStore/store";
import { recordAnswerSprint } from "../../reduxStore/sprintSlice";
import styles from "./FallingSprint.module.scss";
import clsx from "clsx";

type Column = "der" | "die" | "das";

let ROWS = 0; // сколько "ступенек" по высоте
const STEP = 40; // высота одного "шага" в пикселях
const NORMAL_SPEED = 600; // мс между "шагами" падения
const FAST_SPEED = 40; // ускорение при стрелке вниз

export function FallingSprint() {
  const dispatch = useDispatch();

  // берём текущее слово из sprintSlice
  const { queue, index } = useSelector((state: RootState) => state.sprint);

  const currentWord = useSelector((state: RootState) => {
    const currentId = queue[index];
    return currentId ? state.srs.words.byId[currentId] : undefined;
  });

  // 👇 Локальное состояние для "тетрис-движения"
  const [column, setColumn] = useState<Column>("die");
  const [row, setRow] = useState(0); // 0 = верх, ROWS-1 = низ
  const [speed, setSpeed] = useState(NORMAL_SPEED);
  // когда слово "приземлилось"
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  // когда меняется слово — сбрасываем позицию
  useEffect(() => {
    setResult(null);
    setColumn("die");
    setRow(0);
    setSpeed(NORMAL_SPEED);
  }, [currentWord?.id]);

  // обработка клавиатуры: ← → ↓
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord) return;

      if (e.key === "ArrowLeft") {
        setColumn((prev) => {
          if (prev === "die") return "der";
          if (prev === "das") return "die";
          return prev;
        });
      }

      if (e.key === "ArrowRight") {
        setColumn((prev) => {
          if (prev === "der") return "die";
          if (prev === "die") return "das";
          return prev;
        });
      }

      if (e.key === "ArrowDown") {
        setSpeed(FAST_SPEED);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSpeed(NORMAL_SPEED);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentWord]);

  const handleLand = useCallback(() => {
    if (!currentWord) return;
    const correctArticle = currentWord.gender as Column;
    const isCorrect = column === correctArticle;

    setResult(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      dispatch(recordAnswerSprint({ isCorrect: isCorrect }));
    }, 900);
  }, [column, currentWord, dispatch]);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [columnWidth, setColumnWidth] = useState(0);

  useLayoutEffect(() => {
    const updatedWidth = () => {
      const el = fieldRef.current;
      if (!el) return;

      const children = el.children;
      const second = children[1];
      const third = children[2];
      const secondHeight = second.getBoundingClientRect().height;
      const thirdHeight = third.getBoundingClientRect().height;
      const rect = el.getBoundingClientRect();
      const fieldWidth = rect.width / 3;
      ROWS = (rect.height - secondHeight - thirdHeight) / STEP;
      if (fieldWidth > 0) {
        setColumnWidth(fieldWidth);
      }
    };

    updatedWidth();

    const rafId = requestAnimationFrame(updatedWidth);
    window.addEventListener("resize", updatedWidth);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatedWidth);
    };
  }, []);

  // падение "ступеньками" через setInterval
  useEffect(() => {
    if (!currentWord) return;

    const id = window.setInterval(() => {
      setRow((prev) => {
        if (prev >= ROWS - 1) {
          if (result === null) {
            handleLand();
          }
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [currentWord, speed, handleLand, result]); // speed меняется при ArrowDown

  const columnIndex = column === "der" ? 0 : column === "die" ? 1 : 2;
  const columnX = columnIndex * columnWidth;

  if (!currentWord) {
    return <div>Нет слов для спринта</div>;
  }

  const correctArticle = currentWord.gender as Column;
  const getCellClass = (cell: Column) => {
    return clsx(styles.sprint_cell, {
      [styles.correct]: result !== null && cell === correctArticle,
      [styles.wrong]:
        result === "wrong" && cell === column && column !== correctArticle,
    });
  };

  return (
    <div className={styles.sprint}>
      <div className={styles.sprint_field} ref={fieldRef}>
        <div
          className={styles.sprint_word}
          style={{
            transform: `translate(${columnX}px, ${row * STEP}px)`,
          }}
        >
          {currentWord.lemma}
        </div>
        <div className={styles.sprint_bottom}>
          <div className={getCellClass("der")}>der</div>
          <div className={getCellClass("die")}>die</div>
          <div className={getCellClass("das")}>das</div>
        </div>
        <div className={styles.sprint_hint}>
          ← / → чтобы двигать слово, ↓ зажать чтобы ускорить
        </div>
      </div>
    </div>
  );
}
