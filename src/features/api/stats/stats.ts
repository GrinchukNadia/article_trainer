import { API_BASE_URL } from "../url/url";

export async function getStreak (token: string | null) {
    const responce = await fetch(`${API_BASE_URL}/statistic/days`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return responce.json();
}

export async function getStats (token: string | null) {
    const responce = await fetch(`${API_BASE_URL}/statistic`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return responce.json();
}

export async function getDailyActivity (token: string | null) {
    const responce = await fetch(`${API_BASE_URL}/statistic/weekly-activity`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return responce.json();
}