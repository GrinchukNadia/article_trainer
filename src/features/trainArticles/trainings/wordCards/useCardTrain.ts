import { useCallback, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../reduxStore/store";
import { handleAnswerArticle, load } from "../../../api/srs/wordsToLearn";
import type {
  Anim,
  CardAction,
  CardItem,
  Choice,
  Gender,
  State,
} from "./cardTrain.types";

const initial: State = {
  translation: ". . . . . . . .",
  article: "___" as const,
  cardClass: "",
  animation: "tip" as const,
  answered: false,
  animating: false,
  selectedArticles: [],
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
    case "SET_SELECTED_ARTICLES":
      return {
        ...state,
        selectedArticles: [...state.selectedArticles, action.answer],
      };
    case "RESET_CARD":
      return {
        ...initial,
      };
    default:
      return state;
  }
}

export function useCardTrain() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [words, setWords] = useState<CardItem[]>([]);
  const [index, setIndex] = useState(0);
  const token = useSelector((reduxState: RootState) => {
    return reduxState.auth.token;
  });

  // Load a new batch of words(10) from the backend and restart the card session.
  const loadNext = useCallback(async () => {
    if (!token) return;

    const words = await load(token);
    setWords(words);

    // Reset UI state when a new batch is loaded.
    dispatch({ type: "RESET_CARD" });
    setIndex(0);
  }, [token]);

  useEffect(() => {
    loadNext();
  }, [loadNext]);

  // console.log(words);

  const onAnimationStart = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: true });
  }, []);
  const onAnimationEnd = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: false });
  }, []);

  const current = words[index] ?? null;

  // After the exit animation finishes, move to the next card and reset visual state.
  useEffect(() => {
    if (state.animation === "next-card") {
      const t = setTimeout(() => {
        setIndex((index) => index + 1);
        dispatch({ type: "RESET_CARD" });
      }, 250);
      return () => clearTimeout(t);
    }
  }, [state.animation]);

  const handleAnswer = useCallback(
    async (choice: Choice) => {
      if (!current) return;
      if (state.animating) return;

      if (choice === "next") {
        if (!state.answered) {
          return;
        }
        dispatch({ type: "SET_ANIM", anim: "next-card" });
        return;
      }

      //  Prevent requests after the correct answer was selected.
      if(state.answered) return;

      
      // Prevent multiple requests to the backend.
      if (state.selectedArticles.includes(choice)) return;
      console.log(state.selectedArticles, choice);
      
      // Send the selected article to the backend.
      // The backend checks the answer and updates the user's progress.
      const result = await handleAnswerArticle(token, choice, current.wordId);
      dispatch({ type: "SET_SELECTED_ARTICLES", answer: choice });


      if (!result.correct && !state.answered) {
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
      if (result.correct && !state.answered) {
        const animationNames: Record<Gender, Anim> = {
          der: "rightL",
          die: "rightR",
          das: "rightT",
        };
        dispatch({ type: "SET_ANIM", anim: animationNames[choice as Gender] });
        dispatch({ type: "SET_ARTICLE", text: result.gender[0] });
        dispatch({ type: "SET_CARD_CLASS", name: "card-correct" });
        dispatch({ type: "SET_ANSWERED", value: true });
        dispatch({ type: "SET_TRANSLATION", text: current.translation });
      }
    },
    [current, state.animating, state.answered, state.selectedArticles, token],
  );

  return {
    current,
    index,
    state,
    loadNext,
    onAnimationEnd,
    onAnimationStart,
    handleAnswer,
  };
}
