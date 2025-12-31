'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { RatingStars } from './rating-stars'
import { toast } from 'sonner'

interface ReviewFormProps {
  productId: string
  orderId: string
  onSuccess?: () => void
}

export function ReviewForm({ productId, orderId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Please login to submit review')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: user.id,
        order_id: orderId,
        rating,
        comment
      })

    setLoading(false)

    if (error) {
      toast.error('Failed to submit review')
    } else {
      toast.success('Review submitted successfully!')
      setComment('')
      setRating(5)
      onSuccess?.()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating
        </label>
        <RatingStars 
          rating={rating} 
          interactive 
          onRatingChange={setRating}
          size="lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience with this product..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
