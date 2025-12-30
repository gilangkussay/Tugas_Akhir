import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import { ArrowRight, Cpu, Monitor, Headphones, Package, Zap, Award, TrendingUp } from 'lucide-react'

export default function Home() {
  const categories = [
    { name: 'Laptops', icon: Monitor, count: 25, color: 'from-blue-500 to-cyan-500' },
    { name: 'PC Components', icon: Cpu, count: 40, color: 'from-purple-500 to-pink-500' },
    { name: 'Accessories', icon: Headphones, count: 30, color: 'from-orange-500 to-red-500' },
    { name: 'Software', icon: Package, count: 15, color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">New Arrivals Every Week</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Premium IT Products
              <br />
              <span className="text-blue-200">For Professionals</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover the latest hardware, software, and IT services with unbeatable prices and quality guarantee
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Package, label: '100+ Products', value: 'Premium Quality' },
              { icon: Award, label: '5000+ Customers', value: 'Satisfied Users' },
              { icon: Zap, label: 'Fast Delivery', value: '2-3 Days' },
              { icon: TrendingUp, label: 'Best Prices', value: 'Guaranteed' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold text-lg">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group relative p-6 bg-card rounded-2xl border hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <category.icon className="h-12 w-12 mb-4 text-primary group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="font-semibold mb-1 relative z-10">{category.name}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl hover:bg-accent transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your products delivered within 2-3 business days</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-accent transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Quality Guarantee</h3>
              <p className="text-muted-foreground">All products are 100% authentic and certified</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-accent transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">24/7 Support</h3>
              <p className="text-muted-foreground">Our team is always ready to help you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
