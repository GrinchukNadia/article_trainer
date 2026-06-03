import type { Article } from "./Types";

export const pointerPosition = [352, 485, 612, 744, 879];
export const articles:Article[] = ["die", "der", "das"];

export const CAT_SPRITE = {
    frameWidth: 350,
    frameHeight: 290,
    frames: 11,
};

export const VIEWPORT = {
    width: 1260,
    height: 800,
};

export const CAT_ANIMATION = {
    eatingThenHappy: [8, 7, 6, 10],
    eatingThenAngry: [8, 7, 6, 9],
    blinking: [1, 0, 3, 0, 1, 0],
    waiting: [1, 0, 1, 0, 1, 0]
}