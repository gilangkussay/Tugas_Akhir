import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        if (!product || !product.id) {
          console.error('Invalid product:', product)
          return
        }
        
        const items = get().items
        const existingItem = items.find(item => item.product?.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },
      
      removeItem: (productId) => {
        if (!productId) return
        set({ items: get().items.filter(item => item.product?.id !== productId) })
      },
      
      updateQuantity: (productId, quantity) => {
        if (!productId) return
        
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.product?.id === productId ? { ...item, quantity } : item
          ),
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items
          .filter(item => item.product && item.product.price)
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          )
      },
      
      getTotalItems: () => {
        return get().items
          .filter(item => item.product)
          .reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
