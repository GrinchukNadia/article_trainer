import { apiClient } from "../client";

//---------------------------------------------------------------------------------------
type RegisterResponse = {
    recoveryCode: string,
    username: string,
    token?: string
}
export async function registrateUser(username: string, password: string)
: Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>("/auth/signup", {
        username,
        password
    })
    return response.data;
}

//---------------------------------------------------------------------------------------
type LoginResponse = {
    token: string,
    expiresIn: string
}
export async function loginUser(username: string, password: string)
    : Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
        username,
        password
    })
    return response.data;
}

//---------------------------------------------------------------------------------------
type CheckUsernameResponse = { isUnique: boolean };
export async function checkUserName(username: string): Promise<CheckUsernameResponse> {
    const response = await apiClient.get<CheckUsernameResponse>("/auth/check-name", {
        params: { username }
    }
)
    return response.data;
}

//---------------------------------------------------------------------------------------
export async function changePasswordRequest(
    username: string,
    recoveryCode: string,
    newPassword: string):Promise<void> {
    const response = await apiClient.post("/auth/change-password", {
        username,
        recoveryCode,
        newPassword
    })
    return response.data()
}