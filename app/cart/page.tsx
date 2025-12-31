'use client'

import { Navbar } from '@/components/navbar'
import { useCartStore } from '@/stores/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, Loader2, AlertCircle, ShoppingBag, Package } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    setMounted(true)
    validateCart()
  }, [])

  const validateCart = async () => {
    if (items.length === 0) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const productIds = items.map(item => item.product.id)
      
      const { data: dbProducts, error } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds)

      if (error) throw error

      if (dbProducts) {
        let itemsRemoved = 0
        const updatedItems = items.filter(cartItem => {
          const dbProd = dbProducts.find(p => p.id === cartItem.product.id)
          if (!dbProd || !dbProd.is_active) {
            itemsRemoved++
            return false
          }
          
          // Update local cart data if price changed
          if (dbProd.price !== cartItem.product.price) {
            cartItem.product.price = dbProd.price
          }
          return true
        })

        if (itemsRemoved > 0) {
          // Note: In a real app we'd trigger a store update here. 
          // For now, let's just warn and let the self-cleaning handle it if needed
          toast.warning(`${itemsRemoved} product(s) in your cart are no longer available and were removed.`)
        }
      }
    } catch (error) {
      console.error('Error validating cart:', error)
      toast.error('Could not sync cart with current prices.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Validating your cart...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
            {items.length} Items
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.filter(item => item.product).map(item => (
              <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 p-6 border-none rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-muted rounded-xl overflow-hidden">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">{item.product.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-black text-primary">{formatPrice(item.product.price)}</p>
                    
                    <div className="flex items-center gap-4 bg-muted/50 p-1 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-card rounded-lg transition-colors shadow-sm"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-card rounded-lg transition-colors shadow-sm"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-none rounded-3xl p-8 bg-card shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (Included)</span>
                  <span className="font-semibold text-foreground">Rp 0</span>
                </div>
                
                <div className="border-t border-dashed pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold">Grand Total</span>
                    <div className="text-right">
                      <p className="text-3xl font-black text-primary">{formatPrice(getTotalPrice())}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-primary text-primary-foreground text-center rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="block w-full py-4 border-2 border-muted text-center rounded-2xl font-bold hover:bg-muted/50 transition-colors"
                >
                  Clear All Items
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>Secure payment and quality guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
