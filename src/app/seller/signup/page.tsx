'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { createBrowserClient } from '@/lib/supabase'
import { uploadProductImage } from '@/lib/supabase-storage'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SellerSignupPage() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    is_event_ticket: false,
    event_date: '',
    event_location: '',
    stock: '1',
    images: [] as string[],
  })

  const categories = [
    { value: '', label: 'Select a category' },
    { value: '1', label: 'Events' },
    { value: '2', label: 'Electronics' },
    { value: '3', label: 'Fashion' },
    { value: '4', label: 'Home & Living' },
    { value: '5', label: 'Sports' },
  ]

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !user) return

    setLoading(true)
    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadProductImage(file, user.id)
      )
      const newImages = await Promise.all(uploadPromises)
      setFormData({ ...formData, images: [...formData.images, ...newImages] })
    } catch (error: any) {
      alert('Error uploading images: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        category_id: formData.category_id || null,
        is_event_ticket: formData.is_event_ticket,
        event_date: formData.event_date || null,
        event_location: formData.event_location || null,
        stock: parseInt(formData.stock) || 1,
        images: formData.images.length > 0 ? formData.images : ['/placeholder.jpg'],
        status: 'active',
      })
    })

    setLoading(false)

    if (response.ok) {
      router.push('/dashboard?tab=products')
    } else {
      const error = await response.json()
      alert('Error creating product: ' + error.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Create a Listing</h1>
          <p className="text-[#94a3b8]">Add your product or event to Dzaleka Business</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Product or event title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product or event"
              rows={4}
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price ($)</label>
              <Input
                type="number"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              options={categories}
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_event"
              checked={formData.is_event_ticket}
              onChange={(e) => setFormData({ ...formData, is_event_ticket: e.target.checked })}
              className="w-4 h-4 accent-[#e94560]"
            />
            <label htmlFor="is_event" className="text-sm">This is an event ticket</label>
          </div>

          {formData.is_event_ticket && (
            <div className="space-y-4 border border-[#2a2a4a] p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Event Date</label>
                <Input
                  type="datetime-local"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  required={formData.is_event_ticket}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Location</label>
                <Input
                  value={formData.event_location}
                  onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                  placeholder="Enter event venue"
                  required={formData.is_event_ticket}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg text-[#94a3b8] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#e94560] file:text-white file:cursor-pointer"
            />
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-4">
                {formData.images.map((img, idx) => (
                <Image key={idx} src={img} alt="" width={80} height={80} className="rounded object-cover" />
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
        </form>

        <p className="text-center text-[#94a3b8] text-sm mt-6">
          Want to manage your listings?{' '}
          <Link href="/dashboard" className="text-[#e94560] hover:underline">
            Go to Dashboard
          </Link>
        </p>
      </div>
    </div>
  )
}
