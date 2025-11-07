import { useCallback, useEffect, useMemo, useReducer } from "react";
import dataCard from "../data/Data";

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
  index: number;
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

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const initial: State = {
  index: 0,
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
    case "NEXT_CARD":
      return { ...state, index: state.index + 1 };
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
  const data = useMemo<CardItem[]>(() => shuffle(dataCard as CardItem[]), []);
  const [state, dispatch] = useReducer(reducer, initial);
  const current = data[state.index];

  const onAnimationStart = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: true });
  }, []);
  const onAnimationEnd = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: false });
  }, []);

  const handleAnswer = useCallback(
    (choice: Choice) => {
      if (!current) return;
      if (state.animating) return;

      if (choice === "next") {
        if (state.answered) {
          dispatch({ type: "SET_ANIM", anim: "next-card" });
        }
      }

      if (choice !== current.gender && !state.answered) {
        const animationNames: Record<Gender, Anim> = {
          der: "wrongL",
          die: "wrongR",
          das: "wrongT",
        };
        dispatch({ type: "SET_ANIM", anim: "" });
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
      }
    },
    [current, state.animating, state.answered]
  );

  useEffect(() => {
    if (state.animation === "next-card") {
      const t = setTimeout(() => {
        dispatch({ type: "NEXT_CARD" });
        dispatch({ type: "RESET_CARD" });
      }, 250);
      return () => clearTimeout(t);
    }
  }, [state.animation]);

  return {
    current,
    onAnimationEnd,
    onAnimationStart,
    handleAnswer,
    state: state,
  };
}
