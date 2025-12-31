'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Order, OrderTrackingStatus } from '@/types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type PaymentStatus = 'pending' | 'paid' | 'failed'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data as any || [])
    } catch (error: any) {
      toast.error('Failed to fetch orders: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateOrder = async (orderId: string, field: 'tracking_status' | 'payment_status', value: string) => {
    const oldOrders = [...orders]
    
    // Optimistic update
    setOrders(orders.map(o => o.id === orderId ? { ...o, [field]: value } : o))

    try {
      const { error } = await supabase
        .from('orders')
        .update({ [field]: value })
        .eq('id', orderId)

      if (error) throw error
      
      toast.success(`Order ${field === 'tracking_status' ? 'tracking' : 'payment'} updated to ${value}`)
    } catch (error: any) {
      // Revert on error
      setOrders(oldOrders)
      toast.error(`Failed to update: ${error.message}`)
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTrackingBadge = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Orders Management</h1>
        <div className="text-sm text-gray-500">
          Total Orders: <span className="font-semibold text-gray-900">{orders.length}</span>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracking Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 font-mono">
                      {order.invoice_number}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {(order as any).profiles?.full_name || 'N/A'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(order as any).profiles?.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Rp {Number(order.total_amount).toLocaleString('id-ID')}
                  </td>
                  
                  {/* Payment Status Dropdown */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.payment_status}
                      onChange={(e) => updateOrder(order.id, 'payment_status', e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getPaymentBadge(order.payment_status)}`}
                    >
                      <option value="pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </td>

                  {/* Tracking Status Dropdown */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.tracking_status || 'processing'}
                      onChange={(e) => updateOrder(order.id, 'tracking_status', e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getTrackingBadge(order.tracking_status || 'processing')}`}
                    >
                      <option value="processing">PROCESSING</option>
                      <option value="confirmed">CONFIRMED</option>
                      <option value="shipped">SHIPPED</option>
                      <option value="delivered">DELIVERED</option>
                      <option value="cancelled">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
