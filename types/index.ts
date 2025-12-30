export interface Product {
  id: string
  name: string
  slug: string
  description: string
  specifications: Record<string, any>
  price: number
  stock: number
  category_id: string
  images: string[]
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  invoice_number: string
  total_amount: number
  payment_method: 'bank_transfer' | 'e_wallet' | 'cod'
  payment_status: 'pending' | 'paid' | 'failed'
  order_status: 'processing' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  shipping_address: string
  shipping_phone: string
  shipping_name: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  subtotal: number
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  phone?: string
  address?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
