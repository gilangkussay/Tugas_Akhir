import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OrderItem {
  id: string
  product_name: string
  product_price: number
  quantity: number
  product_image: string
}

export interface Order {
  id: string
  invoice_number: string
  date: string
  items: OrderItem[]
  total_amount: number
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed'
  order_status: 'processing' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  shipping_name: string
  shipping_phone: string
  shipping_address: string
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrderByInvoice: (invoiceNumber: string) => Order | undefined
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (order) => {
        set({ orders: [order, ...get().orders] })
      },
      
      getOrderByInvoice: (invoiceNumber) => {
        return get().orders.find(order => order.invoice_number === invoiceNumber)
      },
    }),
    {
      name: 'order-storage',
    }
  )
)
