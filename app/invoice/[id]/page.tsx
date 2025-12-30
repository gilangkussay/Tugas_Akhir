'use client'

import { Navbar } from '@/components/navbar'
import { formatPrice } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { useOrderStore } from '@/stores/order-store'
import { notFound } from 'next/navigation'

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [mounted, setMounted] = useState(false)
  const getOrderByInvoice = useOrderStore((state) => state.getOrderByInvoice)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const order = getOrderByInvoice(resolvedParams.id)
  
  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Success Message */}
        <div className="max-w-3xl mx-auto mb-4 md:mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 dark:bg-green-900 rounded-full mb-2 md:mb-4">
            <CheckCircle className="h-6 w-6 md:h-10 md:w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Order Placed!</h1>
          <p className="text-sm md:text-base text-muted-foreground">Thank you for your purchase</p>
        </div>

        {/* Invoice */}
        <div className="max-w-3xl mx-auto border rounded-lg p-4 md:p-6 bg-card">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-3">
            <div>
              <h2 className="text-lg md:text-2xl font-bold mb-1">INVOICE</h2>
              <p className="text-xs md:text-sm text-muted-foreground">#{order.invoice_number}</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {new Date(order.date).toLocaleDateString('id-ID', { 
                  day: 'numeric',
                  month: 'short', 
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-lg md:text-2xl font-bold text-primary">TechStore</div>
              <p className="text-xs md:text-sm text-muted-foreground">Premium IT Products</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-semibold mb-1">Ship To</h3>
            <p className="text-sm font-medium">{order.shipping_name}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{order.shipping_phone}</p>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{order.shipping_address}</p>
          </div>

          {/* Items - Desktop Table */}
          <div className="mb-4 md:mb-6 hidden md:block">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2">Product</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.product_name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">{formatPrice(item.product_price)}</td>
                    <td className="py-2 text-right font-semibold">{formatPrice(item.product_price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Items - Mobile Cards */}
          <div className="mb-4 space-y-2 md:hidden">
            {order.items.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium flex-1 pr-2">{item.product_name}</p>
                  <p className="text-sm font-semibold">{formatPrice(item.product_price * item.quantity)}</p>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatPrice(item.product_price)} × {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 mb-4 md:mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg md:text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total_amount)}</span>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 border rounded-lg">
              <div className="text-xs text-muted-foreground mb-0.5">Payment</div>
              <div className="text-sm font-semibold capitalize">{order.payment_method.replace('_', ' ')}</div>
            </div>
            <div className="p-2 md:p-3 border rounded-lg">
              <div className="text-xs text-muted-foreground mb-0.5">Pay Status</div>
              <div className={`text-sm font-semibold ${
                order.payment_status === 'paid' ? 'text-green-600' : 
                order.payment_status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
              </div>
            </div>
            <div className="p-2 md:p-3 border rounded-lg col-span-2 md:col-span-1">
              <div className="text-xs text-muted-foreground mb-0.5">Order Status</div>
              <div className={`text-sm font-semibold ${
                order.order_status === 'completed' ? 'text-green-600' : 
                order.order_status === 'cancelled' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 md:py-3 text-sm md:text-base border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Print Invoice
            </button>
            <Link
              href="/products"
              className="flex-1 py-2 md:py-3 text-sm md:text-base bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
