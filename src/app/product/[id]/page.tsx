'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeft, Heart, Share2, Star, Calendar, MapPin, Shield, Truck, RotateCcw, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCartStore } from '@/store/cart'
import { ChatButton } from '@/components/ChatButton'
import { Product } from '@/types'
import { createBrowserClient } from '@/lib/supabase'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      const supabase = createBrowserClient()
      
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id as string)
        .single()

      if (data) {
        setProduct(data)
        // Fetch related products
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .eq('status', 'active')
          .limit(3)

        if (related) setRelatedProducts(related)
      }
      
      setLoading(false)
    }

    if (params.id) fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product)
    }
  }

  if (loading) {
    return <div className="text-center text-[#94a3b8] py-12">Loading...</div>
  }

  if (!product) {
    return <div className="text-center text-[#94a3b8] py-12">Product not found</div>
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a2e]">
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-[#e94560]' : 'border-[#2d2d44]'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              {product.is_event_ticket && <Badge variant="accent">Event</Badge>}
              {discount > 0 && <Badge variant="danger">-{discount}%</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">{product.average_rating || 'No ratings'}</span>
              </div>
              <span className="text-[#94a3b8]">|</span>
              <span className="text-[#94a3b8]">{product.views || 0} views</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              {product.original_price && (
                <span className="ml-3 text-xl text-[#94a3b8] line-through">${product.original_price}</span>
              )}
            </div>

            {product.description && (
              <p className="text-[#94a3b8] mb-6">{product.description}</p>
            )}

            {product.is_event_ticket && product.event_date && (
              <div className="flex items-center gap-2 text-[#94a3b8] mb-4">
                <Calendar className="w-5 h-5" />
                <span>{new Date(product.event_date).toLocaleDateString('en-GB', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            )}

            {product.is_event_ticket && product.event_location && (
              <div className="flex items-center gap-2 text-[#94a3b8] mb-6">
                <MapPin className="w-5 h-5" />
                <span>{product.event_location}</span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-[#94a3b8]">Quantity:</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20"
                  min="1"
                  max={product.stock}
                />
              </div>
              <span className="text-sm text-[#94a3b8]">{product.stock} in stock</span>
            </div>

            <div className="flex gap-4 mb-6">
              {product.status === 'sold' ? (
                <Badge variant="danger" className="text-lg px-6 py-3">SOLD</Badge>
              ) : (
                <>
                  <Button onClick={handleAddToCart} className="flex-1" size="lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <ChatButton productId={product.id} sellerId={product.seller_id} />
                </>
              )}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-3 rounded-lg border border-[#2d2d44] hover:border-[#e94560] transition-colors"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-[#e94560] text-[#e94560]' : 'text-white'}`} />
              </button>
              <button className="p-3 rounded-lg border border-[#2d2d44] hover:border-[#e94560] transition-colors">
                <Share2 className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#2d2d44]">
              <div className="flex items-center gap-3 text-[#94a3b8]">
                <Shield className="w-5 h-5 text-[#e94560]" />
                 <span>Buyer Protection - Get full refund if item doesn&apos;t match</span>
              </div>
              <div className="flex items-center gap-3 text-[#94a3b8]">
                <Truck className="w-5 h-5 text-[#e94560]" />
                <span>Fast Shipping - Ships within 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-[#94a3b8]">
                <RotateCcw className="w-5 h-5 text-[#e94560]" />
                <span>Easy Returns - 30 day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
