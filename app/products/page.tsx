import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { mockProducts, mockCategories } from '@/lib/mock-data'
import { Product } from '@/types'

export default function ProductsPage() {
  // Convert mock data to Product type
  const products: Product[] = mockProducts.map(p => ({
    ...p,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    specifications: p.specifications || {}
  }))

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our collection of {products.length} premium IT products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
            All
          </button>
          {mockCategories.map(cat => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
