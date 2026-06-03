export type FeedCatContentProps = {
  frame: number;
  setFrame: React.Dispatch<React.SetStateAction<number>>;
  close: () => void;
};

export type Article = "die" | "der" | "das";

export type Fish = {
  id: string;
  text: string;
  article: Article;
};

export type ActiveFish = Fish & {
  scale: number;
  x: number;
  y: number;
} | null;

export type Result = "correct" | "wrong" | null;