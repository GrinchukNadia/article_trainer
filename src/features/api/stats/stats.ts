import { apiClient } from "../client";

// -----------------------------------------------------------------------
export async function getStreak(): Promise<number> {
    const { data } = await apiClient.get<number>("/statistic/days")
    return data;
}

// -----------------------------------------------------------------------
export type DifficultWords = {
    article: string,
    lemma: string,
    translation: string,
    wrongCount: number
}
type GetStatsResponse = {
    difficultWords: DifficultWords[],
    learnedWords: number,
    dueToday: number,
    bestStreak: number
}
export async function getStats():Promise<GetStatsResponse> {
    const { data } = await apiClient.get<GetStatsResponse>("/statistic")
    return data;
}

// -----------------------------------------------------------------------
export async function getDailyActivity():Promise<number[]> {
    const {data} = await apiClient.get<number[]>("/statistic/weekly-activity")
    return data;
}