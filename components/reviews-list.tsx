'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Review } from '@/types'
import { RatingStars } from './rating-stars'

interface ReviewsListProps {
  productId: string
}

export function ReviewsList({ productId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, email)')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    const reviewsWithUser = data?.map(review => ({
      ...review,
      user: {
        full_name: (review as any).profiles?.full_name || 'Anonymous',
        email: (review as any).profiles?.email || ''
      }
    })) as Review[]

    setReviews(reviewsWithUser || [])
    setLoading(false)
  }

  if (loading) return <div>Loading reviews...</div>

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.user?.full_name}</p>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={review.rating} size="sm" />
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700 mt-3">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  )
}
