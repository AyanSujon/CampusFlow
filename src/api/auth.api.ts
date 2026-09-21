import apiClient from "@/lib/apiClient";
import { UserRegistrationPayload, verifyUserAccountPayload } from "@/types";

export  function userLogin(payload: {email: string, password: string}){
    return apiClient("/auth/login", {method: "POST", body: payload})
}

export  function userRegistration(payload: UserRegistrationPayload){
    return apiClient("/auth/register", {method: "POST", body: payload})
}
export  function verifyUserAccount(payload: verifyUserAccountPayload){
    return apiClient("/auth/verify-email", {method: "POST", body: payload})
}
// export  function resendOTP(email: string){
//     return apiClient("/auth/resend-otp", {method: "POST", body: email})
// }
export function resendOTP(email: string) {
  return apiClient("/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
}

export function userLogout(){
    return apiClient("/auth/logout", {method: "POST"})
}

export function getMe(){
    return apiClient("/auth/me");
}

export function googleOAuth(payload : {idToken: string}){
    return apiClient("/auth/google", {method: "POST", body: payload})
}


