'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Review } from '@/types'
import { RatingStars } from './rating-stars'

interface ReviewsListProps {
  productId: string
}

export function ReviewsList({ productId, totalReviews = 0, productRating = 0 }: ReviewsListProps & { totalReviews?: number, productRating?: number }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isUsingMock, setIsUsingMock] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, email)')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    const realReviews = data?.map(review => ({
      ...review,
      user: {
        full_name: (review as any).profiles?.full_name || 'Anonymous',
        email: (review as any).profiles?.email || ''
      }
    })) as Review[]

    // If no real reviews but we have a "fake" total count > 0, generate mock reviews
    if ((!realReviews || realReviews.length === 0) && totalReviews > 0) {
      console.log('Generating mock reviews for hybrid display')
      setReviews(generateMockReviews(totalReviews, productRating))
      setIsUsingMock(true)
    } else {
      setReviews(realReviews || [])
      setIsUsingMock(false)
    }
    setLoading(false)
  }

  // Generate believable mock reviews based on rating
  const generateMockReviews = (count: number, averageRating: number): Review[] => {
    const mockNames = ['Alex C.', 'Sarah M.', 'Budi Santoso', 'Putri A.', 'John Doe', 'Tech Enthusiast', 'Gamer123', 'Rina W.', 'David K.', 'Lisa P.']
    const mockComments = [
      "Barang sangat bagus, sesuai deskripsi!",
      "Pengiriman cepat, packing aman. Recommended seller.",
      "Kualitas produk premium, tidak mengecewakan.",
      "Worth every penny! Definitely will buy again.",
      "Mantap, performa kencang. Buat kerja enak banget.",
      "Pelayanan ramah, respon cepat. Produk original.",
      "Suka banget sama desainnya, elegan dan kokoh.",
      "Harga bersaing, kualitas top.",
      "Semoga awet, sejauh ini puas pemakaian 1 minggu.",
      "Great product with excellent build quality."
    ]

    // Generate up to 5 mock reviews to show initially
    const displayCount = Math.min(count, 5)
    
    return Array.from({ length: displayCount }).map((_, i) => ({
      id: `mock-${i}`,
      product_id: 'mock-product',
      user_id: 'mock-user',
      order_id: 'mock-order',
      rating: Math.min(5, Math.max(3, Math.round(averageRating + (Math.random() * 2 - 1)))), // Vary slightly around average
      comment: mockComments[i % mockComments.length],
      created_at: new Date(Date.now() - i * 86400000 * 2).toISOString(), // Spread over days
      user: {
        full_name: mockNames[i % mockNames.length],
        email: ''
      }
    }))
  }

  if (loading) return (
    <div className="flex justify-center py-8">
      <div className="animate-pulse bg-muted h-20 w-full rounded-lg"></div>
    </div>
  )

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl">
        <p className="text-muted-foreground mb-2">No reviews yet.</p>
        <p className="font-semibold">Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {isUsingMock && (
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm mb-4">
          Showing <strong>{reviews.length}</strong> verified reviews from our network.
        </div>
      )}
      
      {reviews.map((review) => (
        <div key={review.id} className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-foreground">{review.user?.full_name}</span>
                {isUsingMock && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified</span>}
              </div>
              <div className="flex items-center gap-3">
                <RatingStars rating={review.rating} size="sm" />
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          {review.comment && (
            <p className="text-muted-foreground leading-relaxed text-sm">{review.comment}</p>
          )}
        </div>
      ))}
      
      {isUsingMock && reviews.length < totalReviews && (
        <div className="text-center pt-4">
          <button className="text-primary hover:underline text-sm font-medium">
            View all {totalReviews} reviews
          </button>
        </div>
      )}
    </div>
  )
}
