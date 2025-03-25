export interface SignUpCredentials {
  email: string
  full_name: string
  country_code: string
  phone_number: string
  password: string
  recaptchaToken?: string
}

export interface SignUpResult {
  success: boolean
  error?: string
  token?: string
}

export interface FormData extends SignUpCredentials {
  confirm_password: string
  recaptchaToken?: string
}

export interface LoginResult {
  success: boolean
  error?: string
  userData?: any
}

