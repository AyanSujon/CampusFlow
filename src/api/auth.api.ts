import apiClient from "@/lib/apiClient";

export function userLogin(payload: {email: string, passsword: string}){
    return apiClient("/api/v1/auth/login", {method: "POST", body: payload})
}