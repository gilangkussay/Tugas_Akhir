'use client'

import { Navbar } from '@/components/navbar'
import { useCartStore } from '@/stores/cart-store'
import { useOrderStore } from '@/stores/order-store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatPrice, generateInvoiceNumber } from '@/lib/utils'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { addOrder } = useOrderStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'bank_transfer'
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const invoiceNumber = generateInvoiceNumber()
    
    // Create order object
    const order = {
      id: invoiceNumber,
      invoice_number: invoiceNumber,
      date: new Date().toISOString(),
      items: items.filter(item => item.product).map(item => ({
        id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        product_image: item.product.images?.[0] || '/placeholder.png'
      })),
      total_amount: getTotalPrice(),
      payment_method: formData.paymentMethod,
      payment_status: 'pending' as const,
      order_status: 'processing' as const,
      shipping_name: formData.name,
      shipping_phone: formData.phone,
      shipping_address: formData.address,
    }
    
    // Save order
    addOrder(order)
    
    // Simulate order creation
    toast.success('Order placed successfully!')
    
    // Clear cart and redirect to invoice
    setTimeout(() => {
      clearCart()
      router.push(`/invoice/${invoiceNumber}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="08123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Address</label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Street address, city, postal code"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Bank Transfer</div>
                      <div className="text-sm text-muted-foreground">Transfer to our bank account</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="payment"
                      value="e_wallet"
                      checked={formData.paymentMethod === 'e_wallet'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">E-Wallet</div>
                      <div className="text-sm text-muted-foreground">GoPay, OVO, Dana, etc.</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">Pay when you receive</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-card sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.filter(item => item.product).map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
