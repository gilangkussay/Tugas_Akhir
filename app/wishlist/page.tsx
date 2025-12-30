'use client'

import { Navbar } from '@/components/navbar'
import { useWishlistStore } from '@/stores/wishlist-store'
import { useCartStore } from '@/stores/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleRemove = (productId: string, productName: string) => {
    removeItem(productId)
    toast.success(`${productName} removed from wishlist`)
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite products to your wishlist and shop them later!
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{items.length} items saved</p>
          </div>
          <button
            onClick={() => {
              clearWishlist()
              toast.success('Wishlist cleared')
            }}
            className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={product.id} className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.images[0] || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
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

                <p className="text-lg font-bold text-primary mb-3">{formatPrice(product.price)}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="p-2 border rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
