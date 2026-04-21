import type { BaseResponseList } from '@/types'

export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: Array<string>
  brand: string
  sku: string
  thumbnail: string
  images: Array<string>
  meta: Meta
}

export interface ListProduct extends BaseResponseList {
  products: Array<Product>
}
