import { apiClient } from "../client";

type GetWordsSprintResponse = {
    word: string,
    article: string
}
export async function getWordsSprint():Promise<GetWordsSprintResponse[]>{
    const {data} = await apiClient.get<GetWordsSprintResponse[]>("/games/sprint");
    return data;
}