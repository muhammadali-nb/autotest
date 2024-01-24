export interface AuthResponce {
  deposit: string;
  has_profile: boolean;
  hash: string;
  id: string;
  success: boolean;
  reason: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone?: string | null
  access_token: null | string
  refresh_token: null | string
}

interface ResponseDataTypes {
  success: boolean
  has_profile: boolean
  error: string
  result: number
}

export interface AuthInitialState {
  isAuthenticated: boolean;
  user_status: null | "need_auth" | "error" | "banned";
  has_profile: boolean
  isInitialized: boolean;
  api_status: "pending" | "success" | "error"
  error_message: string | null,
  first_name?: string,
  middle_name?: string,
  last_name?: string,
  phone: string
}

export type RegisterErrorType = {
  message: string
  success: boolean
  timeout: number
  reason: string
}

export type ConfirmPaymentQR = {
  qr: string;
  pid: string
}