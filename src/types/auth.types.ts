// Interfaces based on the swagger definitions for backoffice/auth/login API

// Request interface for login
export interface LoginRequest {
  email: string;
  password: string;
}

// Auth response interface
export interface AuthResponse {
  email: string;
  expires_in: number; // seconds
  forced_logout_device?: ForcedLogoutDevice; // Only present if auto force logout occurred
  refresh_token?: string; // Optional refresh token
  role_code: string;
  session_id: string; // Session ID for tracking
  token: string;
  user_id: string;
}

// Forced logout device interface (referenced in AuthResponse)
export interface ForcedLogoutDevice {
  device_name: string;
  device_type: string;
  ip_address: string;
  last_activity: string;
  login_time: string;
  session_id: string;
}

// Base response interface
export interface BaseResponse<T> {
  code: string;
  data: T;
  message: string;
  time: string;
}

// Specific response for login
export type LoginResponse = BaseResponse<AuthResponse>;