import { API_BASE_URL } from "../url/url";

export async function getWordsToPractice(token: string | null) {
  const responce = await fetch(`${API_BASE_URL}/srs/words`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await responce.json();
}

export async function load(token: string | null) {
  if (!token) return;
  const words = await getWordsToPractice(token);
  return words;
}

export async function handleAnswerArticle( token: string | null, choice: string, wordId: number) {
  if(!token) return;

  const responce = await fetch(`${API_BASE_URL}/srs/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      answer: choice,
      wordId: wordId
    })
  })

  return await responce.json();
}
