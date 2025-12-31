'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const setAuthUser = useAuthStore((state) => state.setUser)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Debug: Check if env vars are loaded
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      })

      if (authError) {
        toast.error(authError.message)
        setLoading(false)
        return
      }

      if (authData.user) {
        // Get user profile to check role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name, phone, address')
          .eq('id', authData.user.id)
          .single()

        // Update auth store for navbar
        setAuthUser({
          id: authData.user.id,
          name: profile?.full_name || 'Admin',
          email: authData.user.email!,
          role: profile?.role as any,
          phone: profile?.phone,
          address: profile?.address,
          created_at: authData.user.created_at,
        })

        toast.success('Login successful!')

        // Redirect based on role
        const userRole = profile?.role || 'customer'
        
        // Minor delay to ensure cookies are set before redirect
        setTimeout(() => {
          if (userRole === 'admin') {
            router.push('/admin')
          } else {
            router.push('/products')
          }
        }, 500)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    localStorage.clear()
    supabase.auth.signOut()
    toast.success('System state reset. Please try logging in again.')
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sign in to TechStore</h2>
          <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="admin@techstore.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Create an account
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Click here if you still see mock data or getting login errors"
            >
              Reset Session Error
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 font-semibold mb-2">Test Accounts:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@techstore.com / admin123</p>
            <p><strong>Customer:</strong> customer@test.com / customer123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
