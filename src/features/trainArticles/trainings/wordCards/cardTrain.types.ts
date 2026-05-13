export type Gender = "der" | "die" | "das";
export type GenderDisplay = "der" | "die" | "das" | "___";
export type NextKey = "next";
export type Choice = Gender | NextKey;
export type Anim =
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
  wordId: number;
  lemma: string;
  translation: string;
};
export type result = {
  correct: boolean;
  gender: [string];
  reviewCount: number;
  wrongCount: number;
};
export type State = {
  translation: string;
  article: GenderDisplay;
  cardClass: string;
  animation: Anim;
  answered: boolean;
  animating: boolean;
  selectedArticles: Gender[];
};

export type CardAction =
  | { type: "SET_ANIM"; anim: Anim }
  | { type: "SET_TRANSLATION"; text: string }
  | { type: "SET_ARTICLE"; text: GenderDisplay }
  | { type: "SET_CARD_CLASS"; name: string }
  | { type: "SET_ANSWERED"; value: boolean }
  | { type: "SET_ANIMATING"; value: boolean }
  | { type: "SET_SELECTED_ARTICLES"; answer: Gender }
  | { type: "NEXT_CARD" }
  | { type: "RESET_CARD" };
