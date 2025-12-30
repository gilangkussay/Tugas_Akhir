'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'
import { useWishlistStore } from '@/stores/wishlist-store'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = mounted && isInWishlist(product.id)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!')
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
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.total_reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
          <div className="flex gap-2">
            <button
              className={`p-2 rounded-lg border transition-colors ${
                inWishlist 
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                  : 'hover:bg-accent'
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
