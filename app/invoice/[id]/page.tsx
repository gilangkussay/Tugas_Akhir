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
      
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order is being processed.</p>
        </div>

        {/* Invoice */}
        <div className="max-w-3xl mx-auto border rounded-lg p-8 bg-card">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
              <p className="text-sm text-muted-foreground">Invoice #: {order.invoice_number}</p>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(order.date).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">TechStore</div>
              <p className="text-sm text-muted-foreground">Premium IT Products</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <p className="text-sm">{order.shipping_name}</p>
            <p className="text-sm text-muted-foreground">{order.shipping_phone}</p>
            <p className="text-sm text-muted-foreground">{order.shipping_address}</p>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
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
                    <td className="py-3">{item.product_name}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">{formatPrice(item.product_price)}</td>
                    <td className="py-3 text-right font-semibold">{formatPrice(item.product_price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total_amount)}</span>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
              <div className="font-semibold capitalize">{order.payment_method.replace('_', ' ')}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Payment Status</div>
              <div className={`font-semibold ${
                order.payment_status === 'paid' ? 'text-green-600' : 
                order.payment_status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Order Status</div>
              <div className={`font-semibold ${
                order.order_status === 'completed' ? 'text-green-600' : 
                order.order_status === 'cancelled' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 border rounded-lg font-semibold hover:bg-accent"
            >
              Print Invoice
            </button>
            <Link
              href="/products"
              className="flex-1 py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
