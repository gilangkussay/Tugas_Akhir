'use client'

import { Navbar } from '@/components/navbar'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, LogOut, Save } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
  })

  useEffect(() => {
    setMounted(true)
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || ''
      })
      setImagePreview(user.avatar || null)
    }
  }, [user])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB')
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setImagePreview(base64String)
      setFormData({ ...formData, avatar: base64String })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  if (!mounted || !user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="border rounded-xl p-6 bg-card text-center">
                {imagePreview || user.avatar ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary">
                    <img 
                      src={imagePreview || user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined {new Date(user.created_at).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="md:col-span-2">
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Account Information</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative group">
                        {imagePreview || formData.avatar ? (
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                            <img 
                              src={imagePreview || formData.avatar} 
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                            <User className="h-16 w-16 text-white" />
                          </div>
                        )}
                        <label 
                          htmlFor="avatar-upload" 
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <span className="text-white text-sm font-medium">Change Photo</span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Max size: 2MB</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="08123456789"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={3}
                          placeholder="Your address"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-2 border rounded-lg hover:bg-accent transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{user.phone || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{user.address || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
