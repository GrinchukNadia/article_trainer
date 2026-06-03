import type { Gender } from "../../trainArticles/trainings/wordCards/cardTrain.types";
import { apiClient } from "../client";

//------------------------------------------------------------------------------------
type GetWordsResponse = {
  wordId: number,
  lemma: string,
  translation: string
}
export async function getWordsToPractice():Promise<GetWordsResponse[]> {
  const { data } = await apiClient.get<GetWordsResponse[]>("/srs/words");
  return data;
}

//------------------------------------------------------------------------------------
type ArticleAnswerResponse = {
  correct: boolean,
  gender: Gender[],
  reviewCount: number,
  wrongCount: number
}
export async function handleAnswerArticle( answer: string, wordId: number):Promise<ArticleAnswerResponse> {
  const {data} = await apiClient.post<ArticleAnswerResponse>("/srs/answer", {
    answer,
    wordId
  })
  return data;
}