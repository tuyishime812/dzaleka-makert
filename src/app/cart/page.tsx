'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a2e] flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#94a3b8]" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <Link href="/marketplace">
              <Button size="lg">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-white mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4 flex gap-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[#0f0f23]">
                  <Image
                    src={item.product.images[0] || '/placeholder.jpg'}
                    alt={item.product.title}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="font-semibold text-white hover:text-[#e94560] transition-colors line-clamp-2"
                  >
                    {item.product.title}
                  </Link>
                  {item.product.is_event_ticket && item.product.event_date && (
                    <p className="text-sm text-[#94a3b8] mt-1">
                      {new Date(item.product.event_date).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg bg-[#0f0f23] border border-[#2d2d44] flex items-center justify-center text-white hover:border-[#e94560] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg bg-[#0f0f23] border border-[#2d2d44] flex items-center justify-center text-white hover:border-[#e94560] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 rounded-lg text-[#94a3b8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-[#94a3b8] hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#2d2d44] pt-3 flex justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-bold text-white text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-[#10b981] mt-4 bg-[#10b981]/10 p-2 rounded-lg">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link href="/checkout" className="block mt-6">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/marketplace" className="block mt-4">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}