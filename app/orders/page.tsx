'use client'

import { Navbar } from '@/components/navbar'
import { useOrderStore } from '@/stores/order-store'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false)
  const orders = useOrderStore((state) => state.orders)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Package className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                <div>
                  <Link 
                    href={`/invoice/${order.invoice_number}`}
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    Order #{order.invoice_number}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.payment_status)}`}>
                    {order.payment_status === 'paid' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
                    {getStatusIcon(order.order_status)}
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x {formatPrice(item.product_price)}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-sm text-muted-foreground">
                    +{order.items.length - 2} more item(s)
                  </p>
                )}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold text-primary">{formatPrice(order.total_amount)}</p>
                </div>
                <Link
                  href={`/invoice/${order.invoice_number}`}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
