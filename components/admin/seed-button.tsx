'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
// import { Button } from '@/components/ui/button' - Component not available
import { Database, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { mockProducts, mockCategories } from '@/lib/mock-data'

export function SeedButton() {
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSeed = async () => {
    try {
      setLoading(true)
      toast.info('Starting database seed...')

      // 1. Seed Categories
      const categoryMap = new Map<string, string>() // slug -> uuid

      for (const cat of mockCategories) {
        // Try to select first
        const { data: existing } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', cat.slug)
          .single()

        if (existing) {
          categoryMap.set(cat.slug, existing.id)
        } else {
          // Insert
          const { data: newCat, error } = await supabase
            .from('categories')
            .insert({
              name: cat.name,
              slug: cat.slug,
              description: cat.description
            })
            .select()
            .single()

          if (error) throw error
          if (newCat) categoryMap.set(cat.slug, newCat.id)
        }
      }

      console.log('Categories seeded:', categoryMap)

      // 2. Seed Products
      let successCount = 0
      
      // Process in chunks to avoid overwhelming the request
      const products = mockProducts.map(p => {
        // Find the mapped UUID for the category
        // The mock data uses 'laptops' as category_id, but we need the real UUID
        const realCatId = categoryMap.get(p.category_id)
        
        return {
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category_id: realCatId,
          images: p.images,
          specifications: p.specifications || {},
          is_active: true
        }
      })

      // Insert products one by one or in small batches to handle errors simply
      for (const p of products) {
        if (!p.category_id) {
          console.warn(`Skipping product ${p.name} due to missing category`)
          continue
        }

        const { error } = await supabase
          .from('products')
          .insert(p)
          
        if (!error) successCount++
        // Ignore duplicate key errors (already seeded)
      }

      toast.success(`Database seeded! Added ${successCount} products.`)
      
      // Refresh page to show data
      window.location.reload()

    } catch (error: any) {
      console.error('Seeding error:', error)
      toast.error('Failed to seed database: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleSeed} 
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
      Seed Database
    </button>
  )
}
