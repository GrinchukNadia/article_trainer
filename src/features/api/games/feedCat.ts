import type { Fish } from "../../ArticleSprint/FeedCat/Types";
import { apiClient } from "../client";

export type FeedCatResponse = {
    profile: {
        hearts: number,
        coins: number
    },
    words: Fish[]
}
export async function getWordsFeedCat():Promise<FeedCatResponse> {
    const { data } = await apiClient.get<FeedCatResponse>("/feed-cat/start");
    return data;
}


export async function sendResultFeedCat(answeredWordIds: number[], wrongAnswers:number):Promise<FeedCatResponse> {
    const {data} = await apiClient.post<FeedCatResponse>("/feed-cat/end", {
        answeredWordIds,
        wrongAnswers
    })
    return data;
}