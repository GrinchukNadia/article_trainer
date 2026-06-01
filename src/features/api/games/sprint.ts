import { API_BASE_URL } from "../url/url";

export async function getWordsSprint(token: string | null){
    const responce = await fetch(`${API_BASE_URL}/games/sprint`, {
        method: "GET",
         headers: {
      Authorization: `Bearer ${token}`,
    },
    })

    return await responce.json();
}