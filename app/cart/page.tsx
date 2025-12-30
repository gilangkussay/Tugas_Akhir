'use client'

import { Navbar } from '@/components/navbar'
import { useCartStore } from '@/stores/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to get started!</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.filter(item => item.product).map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.product.images?.[0] || '/placeholder.png'}
                    alt={item.product.name || 'Product'}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.product.name}</h3>
                  <p className="text-primary font-bold">{formatPrice(item.product.price)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2 border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-accent"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-accent"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-card sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-primary/90 mb-2"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clearCart}
                className="block w-full py-3 border text-center rounded-lg font-semibold hover:bg-accent"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
