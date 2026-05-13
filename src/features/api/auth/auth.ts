import { API_BASE_URL } from "../url/url";

export async function registrateUser(username:string, password:string) {
    const responce = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    return await responce.json();
}

export async function loginUser(username: string, password: string) {
    const responce = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if(!responce.ok) {throw new Error("Benutzername oder Passwort ist falsch. Bitte versuche es erneut.")}
    return await responce.json();
}


