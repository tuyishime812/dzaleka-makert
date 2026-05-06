'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Calendar, MapPin, Heart } from 'lucide-react'
import { Card } from './Card'
import { Badge } from './Badge'
import { Button } from './Button'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <Link href={`/product/${product.id}`}>
      <Card hover className="group overflow-hidden relative">
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#1a1a2e]/80 backdrop-blur-sm border border-[#2d2d44] hover:border-[#e94560] transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-[#e94560] text-[#e94560]' : 'text-white'}`}
          />
        </button>

        {discount > 0 && (
          <Badge variant="danger" className="absolute top-3 left-3 z-10">
            -{discount}%
          </Badge>
        )}

        {product.is_event_ticket && (
          <Badge variant="accent" className="absolute top-3 left-3 z-10">
            Event
          </Badge>
        )}

        <div className="relative aspect-square overflow-hidden bg-[#0f0f23]">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#e94560] transition-colors">
              {product.title}
            </h3>
          </div>

          {product.is_event_ticket && product.event_date && (
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <Calendar className="w-4 h-4" />
              <span>{new Date(product.event_date).toLocaleDateString()}</span>
            </div>
          )}

          {product.is_event_ticket && product.event_location && (
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{product.event_location}</span>
            </div>
          )}

          {product.average_rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-[#94a3b8]">
                {product.average_rating.toFixed(1)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#2d2d44]">
            <div>
              <span className="text-lg font-bold text-white">${product.price}</span>
              {product.original_price && (
                <span className="ml-2 text-sm text-[#94a3b8] line-through">
                  ${product.original_price}
                </span>
              )}
            </div>
            <Button size="sm" onClick={handleAddToCart}>
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}