import { TOKEN } from "@/constant"

export const getToken = () => {
    return localStorage.getItem(TOKEN)
}

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN, token)
}