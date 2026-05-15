'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-[#94a3b8] mb-10">We&apos;d love to hear from you. Get in touch with our team.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} placeholder="Your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white resize-none" />
              </div>
              {status === 'success' && <p className="text-green-400 text-sm">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-400 text-sm">Failed to send. Please try again.</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-[#94a3b8]">dzalekabusiness@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-[#94a3b8]">+265 990 342 825</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Location</h3>
              <p className="text-[#94a3b8]">Dzaleka, Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
