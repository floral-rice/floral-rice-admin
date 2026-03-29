import { TOKEN } from "@/constant"

export const getToken = () => {
    return localStorage.getItem(TOKEN)
}