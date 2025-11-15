import { useCallback, useEffect, useReducer, useState } from "react";
// import dataCard from "../../../data/Data";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../reduxStore/store";
import { recordAnswer } from "../../../../reduxStore/srsSlice";

type Gender = "der" | "die" | "das";
type GenderDisplay = "der" | "die" | "das" | "___";
type NextKey = "next";
export type Choice = Gender | NextKey;
type Anim =
  | ""
  | "tip"
  | "wrongL"
  | "wrongR"
  | "wrongT"
  | "rightL"
  | "rightR"
  | "rightT"
  | "next-card";

export type CardItem = {
  lemma: string;
  gender: Gender;
  translation: string;
  media: { image: string };
};
type State = {
  translation: string;
  article: GenderDisplay;
  cardClass: string;
  animation: Anim;
  answered: boolean;
  animating: boolean;
};
type CardAction =
  | { type: "SET_ANIM"; anim: Anim }
  | { type: "SET_TRANSLATION"; text: string }
  | { type: "SET_ARTICLE"; text: GenderDisplay }
  | { type: "SET_CARD_CLASS"; name: string }
  | { type: "SET_ANSWERED"; value: boolean }
  | { type: "SET_ANIMATING"; value: boolean }
  | { type: "NEXT_CARD" }
  | { type: "RESET_CARD" };

const initial: State = {
  translation: ". . . . . . . .",
  article: "___" as const,
  cardClass: "",
  animation: "tip" as const,
  answered: false,
  animating: false,
};

function reducer(state: State, action: CardAction) {
  switch (action.type) {
    case "SET_ANIM":
      return { ...state, animation: action.anim };
    case "SET_TRANSLATION":
      return { ...state, translation: action.text };
    case "SET_ARTICLE":
      return { ...state, article: action.text };
    case "SET_CARD_CLASS":
      return { ...state, cardClass: action.name };
    case "SET_ANSWERED":
      return { ...state, answered: action.value };
    case "SET_ANIMATING":
      return { ...state, animating: action.value };
    case "RESET_CARD":
      return {
        ...state,
        translation: ". . . . . . . .",
        article: "___" as const,
        cardClass: "",
        animation: "tip" as const,
        answered: false,
      };
    default:
      return state;
  }
}

export function useCardTrain() {
  const [state, dispatch] = useReducer(reducer, initial);
  const dataIds = useSelector(
    (reduxState: RootState) => reduxState.srs.queue.todayIds
  );
  const [index, setIndex] = useState(0);

  const currentId = dataIds[index];

  const words = useSelector(
    (reduxState: RootState) => reduxState.srs.words.byId
  );
  const current = currentId ? words[currentId] : null;

  useEffect(() => {
    setIndex(0);
  }, [dataIds]);

  const onAnimationStart = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: true });
  }, []);
  const onAnimationEnd = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: false });
  }, []);

  const reduxDispatch = useDispatch();
  const handleAnswer = useCallback(
    (choice: Choice) => {
      if (!current) return;
      if (state.animating) return;

      if (choice === "next") {
        if (!state.answered) {
          return;
        }
        dispatch({ type: "SET_ANIM", anim: "next-card" });
      }

      if (choice !== current.gender && !state.answered) {
        const animationNames: Record<Gender, Anim> = {
          der: "wrongL",
          die: "wrongR",
          das: "wrongT",
        };
        dispatch({ type: "SET_ANIM", anim: "" });
        reduxDispatch(recordAnswer({ wordId: currentId, correct: false }));
        setTimeout(() => {
          dispatch({
            type: "SET_ANIM",
            anim: animationNames[choice as Gender],
          });
        }, 0);
        return;
      }

      if (current.gender === choice) {
        const animationNames: Record<Gender, Anim> = {
          der: "rightL",
          die: "rightR",
          das: "rightT",
        };
        dispatch({ type: "SET_ANIM", anim: animationNames[choice as Gender] });
        dispatch({ type: "SET_ARTICLE", text: current.gender });
        dispatch({ type: "SET_CARD_CLASS", name: "card-correct" });
        dispatch({ type: "SET_ANSWERED", value: true });
        dispatch({ type: "SET_TRANSLATION", text: current.translation });
        reduxDispatch(recordAnswer({ wordId: currentId, correct: true }));
      }
    },
    [current, state.animating, state.answered, currentId, reduxDispatch]
  );

  useEffect(() => {
    if (state.animation === "next-card") {
      const t = setTimeout(() => {
        setIndex((index) => index + 1);
        dispatch({ type: "RESET_CARD" });
      }, 250);
      return () => clearTimeout(t);
    }
  }, [state.animation]);

  return {
    current,
    index,
    onAnimationEnd,
    onAnimationStart,
    handleAnswer,
    state: state,
  };
}
