export interface Auth {
  token: string
  refresh_token: string
  role_code: string
  user_id: string
  email: string
  isLoggedIn: boolean
}
