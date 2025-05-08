import { apiConnector } from "@/services/apiConnector"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/auth"

// ======= Types =======
export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  otp: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SendOtpData {
  email: string
}

export interface ResetPasswordData {
  email: string
  newPassword: string
  confirmPassword: string
  token: string
}

// ======= API Functions =======

export const sendOtp = (data: SendOtpData) => {
  return apiConnector<{ success: boolean; message: string }>({
    method: "POST",
    url: `${BASE_URL}/sendotp`,
    bodyData: data,
  })
}

export const signUp = (data: SignUpData) => {
  return apiConnector<{ success: boolean; user: any; token: string }>({
    method: "POST",
    url: `${BASE_URL}/signup`,
    bodyData: data,
  })
}

export const login = (data: LoginData) => {
  return apiConnector<{ success: boolean; user: any; token: string }>({
    method: "POST",
    url: `${BASE_URL}/login`,
    bodyData: data,
  })
}

export const resetPasswordToken = (email: string) => {
  return apiConnector<{ success: boolean; message: string }>({
    method: "POST",
    url: `${BASE_URL}/reset-password-token`,
    bodyData: { email },
  })
}

export const resetPassword = (data: ResetPasswordData) => {
  return apiConnector<{ success: boolean; message: string }>({
    method: "POST",
    url: `${BASE_URL}/reset-password`,
    bodyData: data,
  })
}
