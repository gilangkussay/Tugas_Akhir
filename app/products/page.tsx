'use client'

import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { mockProducts, mockCategories } from '@/lib/mock-data'
import { Product } from '@/types'
import { useState } from 'react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Convert mock data to Product type
  const products: Product[] = mockProducts.map(p => ({
    ...p,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    specifications: p.specifications || {}
  }))

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category_id === selectedCategory)

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our collection of {filteredProducts.length} premium IT products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'border hover:bg-accent'
            }`}
          >
            All
          </button>
          {mockCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border hover:bg-accent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
