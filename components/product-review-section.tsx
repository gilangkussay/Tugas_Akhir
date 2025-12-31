'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { ReviewsList } from './reviews-list'
import { ReviewForm } from './review-form'
import { Star } from 'lucide-react'

interface ProductReviewSectionProps {
  productId: string
  productRating: number
  totalReviews: number
}

export function ProductReviewSection({ 
  productId, 
  productRating, 
  totalReviews 
}: ProductReviewSectionProps) {
  const [canReview, setCanReview] = useState(false)
  const [userOrderId, setUserOrderId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    checkUserCanReview()
  }, [productId])

  const checkUserCanReview = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setCanReview(false)
      return
    }

    // Check if user has a delivered order with this product
    const { data: orders } = await supabase
      .from('orders')
      .select(`
        id,
        can_review,
        order_items!inner(product_id)
      `)
      .eq('user_id', user.id)
      .eq('order_items.product_id', productId)
      .eq('can_review', true)

    if (orders && orders.length > 0) {
      // Check if user already reviewed this product for this order
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('order_id', orders[0].id)
        .single()

      if (!existingReview) {
        setCanReview(true)
        setUserOrderId(orders[0].id)
      }
    }
  }

  const handleReviewSuccess = () => {
    setCanReview(false)
    setRefreshKey(prev => prev + 1) // Force refresh reviews list
  }

  // Calculate rating distribution (mock for now, can be real from DB)
  const getRatingDistribution = () => {
    const total = totalReviews || 1
    return [
      { stars: 5, percentage: Math.round((productRating >= 4.5 ? 70 : 50) * 100) / 100 },
      { stars: 4, percentage: Math.round((productRating >= 4 ? 20 : 30) * 100) / 100 },
      { stars: 3, percentage: Math.round((productRating >= 3 ? 7 : 15) * 100) / 100 },
      { stars: 2, percentage: Math.round(2 * 100) / 100 },
      { stars: 1, percentage: Math.round(1 * 100) / 100 },
    ]
  }

  return (
    <div className="border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Review Summary */}
      <div className="flex items-center gap-8 mb-8 p-6 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">
            {productRating.toFixed(1)}
          </div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(productRating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
        </div>
        
        <div className="flex-1">
          {getRatingDistribution().map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-2 mb-1">
              <span className="text-sm w-12">{stars} star</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form (only if user can review) */}
      {canReview && userOrderId && (
        <div className="mb-8">
          <ReviewForm 
            productId={productId} 
            orderId={userOrderId}
            onSuccess={handleReviewSuccess}
          />
        </div>
      )}

      {/* Reviews List */}
      {/* Reviews List */}
      <ReviewsList key={refreshKey} productId={productId} totalReviews={totalReviews} productRating={productRating} />
    </div>
  )
}
