export interface Meta {
  page: number
  size: number
  total_items: number
  total_pages: number
}

export interface ResponseApi<T = unknown> {
  code: string
  message: string
  data: T
  time: string
  meta?: Meta
}
