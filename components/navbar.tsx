'use client'

import Link from 'next/link'
import { ShoppingCart, Heart, User, Search, Menu, Moon, Sun } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'
import { useWishlistStore } from '@/stores/wishlist-store'
import { useAuthStore } from '@/stores/auth-store'
import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const wishlistItems = useWishlistStore((state) => state.items)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400" />
            <span className="text-xl font-bold">TechStore</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-xl mx-8 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
              Orders
            </Link>
            <Link href="/wishlist" className="relative">
              <Heart className="h-5 w-5 hover:text-primary transition-colors" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 hover:text-primary transition-colors" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {mounted && isAuthenticated ? (
              <Link href="/profile" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm"
              />
            </div>
            <Link href="/products" className="block py-2 text-sm font-medium">Products</Link>
            <Link href="/wishlist" className="block py-2 text-sm font-medium">Wishlist</Link>
            <Link href="/cart" className="block py-2 text-sm font-medium">
              Cart {mounted && `(${totalItems})`}
            </Link>
            <Link href="/login" className="block py-2 text-sm font-medium">Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
