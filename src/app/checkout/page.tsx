'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CreditCard, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useCartStore } from '@/store/cart'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setOrderId(`DZ${Date.now().toString().slice(-6)}`)
    clearCart()
    setStep(4)
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="font-heading text-3xl font-bold text-white mb-4">
            Your cart is empty
          </h1>
          <Link href="/marketplace">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#10b981]/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-[#10b981]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-[#94a3b8] mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <p className="text-[#94a3b8] mb-8">
            Order #{orderId}
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center text-[#94a3b8] hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </Link>

        <h1 className="font-heading text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="flex items-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#e94560]' : 'text-[#94a3b8]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#e94560]' : 'bg-[#2d2d44]'}`}>
              1
            </div>
            <span className="hidden sm:inline">Information</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-[#e94560]' : 'bg-[#2d2d44]'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#e94560]' : 'text-[#94a3b8]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#e94560]' : 'bg-[#2d2d44]'}`}>
              2
            </div>
            <span className="hidden sm:inline">Shipping</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 3 ? 'bg-[#e94560]' : 'bg-[#2d2d44]'}`} />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#e94560]' : 'text-[#94a3b8]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-[#e94560]' : 'bg-[#2d2d44]'}`}>
              3
            </div>
            <span className="hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-white mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="+265990342825"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-white mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="State"
                        name="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      label="ZIP Code"
                      name="zip"
                      placeholder="10001"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Card>
              )}

              {step === 3 && (
                <Card className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-white mb-6">
                    Payment Details
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="CVV"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[#94a3b8] text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Your payment information is secure</span>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex gap-4 mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1" isLoading={isProcessing}>
                  {step === 3 ? `Pay $${total.toFixed(2)}` : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#0f0f23] flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm line-clamp-2">{item.product.title}</p>
                      <p className="text-[#94a3b8] text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-[#2d2d44] pt-4">
                <div className="flex justify-between text-sm text-[#94a3b8]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#94a3b8]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-[#94a3b8]">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-white pt-2 border-t border-[#2d2d44]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}