import { tesloApi } from "@/api/tesloAPI"
import type { AuthResponse } from "../interfaces/auth.response"


export const registerAction = async(fullName: string, email: string, password: string): Promise<AuthResponse> => {
    try {
        const {data} = await tesloApi.post<AuthResponse>('/auth/register', {
            fullName: fullName,
            email: email,
            password: password,
        })

        return data
    } catch (error) {
        throw error
    }
}