export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  description: string | null
  parent_id: string | null
}

export interface Product {
  id: string
  seller_id: string
  category_id: string | null
  title: string
  description: string | null
  price: number
  original_price: number | null
  images: string[]
  stock: number
  is_event_ticket: boolean
  event_date: string | null
  event_location: string | null
  status: 'active' | 'inactive' | 'sold'
  views: number
  created_at: string
  updated_at: string
  category?: Category
  seller?: User
  reviews?: Review[]
  average_rating?: number
}

export interface User {
  id: string
  username: string | null
  avatar_url: string | null
  bio: string | null
  is_seller: boolean
  created_at: string
}

export interface Order {
  id: string
  buyer_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: Address | null
  created_at: string
  buyer?: User
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  product?: Product
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string | null
  created_at: string
  user?: User
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  product?: Product
}

export interface Address {
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export interface CartItemLocal {
  id: string
  product: Product
  quantity: number
}