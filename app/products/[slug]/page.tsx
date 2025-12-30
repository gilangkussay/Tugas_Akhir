'use client'

import { Navbar } from '@/components/navbar'
import { mockProducts } from '@/lib/mock-data'
import { useCartStore } from '@/stores/cart-store'
import { useWishlistStore } from '@/stores/wishlist-store'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'
import { useState, useEffect, use } from 'react'
import { Product } from '@/types'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [mounted, setMounted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Find product by slug
  const productData = mockProducts.find(p => p.slug === resolvedParams.slug)
  
  if (!productData) {
    notFound()
  }

  const product: Product = {
    ...productData,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    specifications: productData.specifications || {}
  }

  const inWishlist = mounted && isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
              <Image
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer hover:border-primary">
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.total_reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border hover:bg-accent"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border hover:bg-accent"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`px-6 py-4 rounded-lg border transition-colors ${
                  inWishlist 
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                    : 'hover:bg-accent'
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          {/* Review Summary */}
          <div className="flex items-center gap-8 mb-8 p-6 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{product.rating.toFixed(1)}</div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{product.total_reviews} reviews</p>
            </div>
            
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-12">{star} star</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {[
              {
                name: 'Budi Santoso',
                rating: 5,
                date: '2024-12-15',
                review: 'Produk sangat bagus! Kualitas premium dan sesuai deskripsi. Pengiriman cepat dan packing rapi. Sangat puas dengan pembelian ini. Highly recommended!',
                verified: true
              },
              {
                name: 'Siti Nurhaliza',
                rating: 5,
                date: '2024-12-10',
                review: 'Worth it banget! Performa luar biasa, build quality solid. Sudah pakai seminggu dan sangat memuaskan. Seller responsif dan pengiriman cepat.',
                verified: true
              },
              {
                name: 'Ahmad Rizki',
                rating: 4,
                date: '2024-12-05',
                review: 'Overall bagus, sesuai ekspektasi. Cuma pengiriman agak lama karena stok. Tapi produknya sendiri excellent, no complaint!',
                verified: true
              },
              {
                name: 'Dewi Lestari',
                rating: 5,
                date: '2024-11-28',
                review: 'Ini pembelian kedua saya di toko ini. Selalu puas dengan kualitas produk dan pelayanan. Fast response, packing aman, produk original. Top!',
                verified: true
              },
              {
                name: 'Eko Prasetyo',
                rating: 4,
                date: '2024-11-20',
                review: 'Produk bagus dan original. Harga kompetitif. Sedikit minus di packaging yang bisa lebih baik lagi. Overall recommended!',
                verified: false
              }
            ].map((review, idx) => (
              <div key={idx} className="border-b pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.name}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
