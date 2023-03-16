export interface User {
  id: string,
  name: string,
  email: string,
  phone: string,
  position: string,
  position_id: string,
  registration_timestamp: number,
  photo: string
}

interface Links {
  next_url: string,
  prev_url: null | string
}

export interface Response {
  success: true,
  total_pages: number,
  total_users: number,
  count: number,
  page: number,
  links: Links,
  users: User[]
}

export interface TokenResponse {
  success:true,
  token: string
}
