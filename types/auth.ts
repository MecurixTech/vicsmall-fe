export interface SignUpCredentials {
    email: string
    full_name: string
    country_code: string
    phone_number: string
    password: string
  }
  
  export interface SignUpResult {
    success: boolean
    error?: string
  }
  
  export interface FormData extends SignUpCredentials {
    confirm_password: string
  }
  
  export interface LoginResult {
    success: boolean
    error?: string
    userData?: any
  }