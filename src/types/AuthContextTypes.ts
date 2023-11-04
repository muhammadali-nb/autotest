export interface AuthResponce {
  deposit: string;
  has_profile: boolean;
  hash: string;
  id: string;
  success: boolean;
  reason: string
}

interface ResponseDataTypes {
  success: boolean
  has_profile: boolean
  error: string
}

export interface AuthInitialState {
  isAuthenticated: boolean;
  user_status: "need_auth" | "error" | "banned" | "success";
  has_profile: boolean
  isInitialized: boolean;
  api_status: "pending" | "success" | "error"
  error_message: string | null
}

export type RegisterErrorType = {
  message: string
  success: boolean
  timeout: number
  reason: string
}