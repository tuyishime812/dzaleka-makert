'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Heart, Share2, Star, Calendar, MapPin, Shield, Truck, RotateCcw, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types'

const productData = {
  id: '1',
  seller_id: '1',
  category_id: '1',
  title: 'Summer Music Festival 2026 - VIP Pass',
  description: 'Experience the biggest music festival of the year with exclusive VIP access! This VIP pass includes premium seating, complimentary food and beverages, exclusive meet & greet with artists, and access to exclusive VIP lounges.',
  price: 299,
  original_price: 399,
  images: [
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
  ],
  stock: 50,
  is_event_ticket: true,
  event_date: '2026-07-15T18:00:00Z',
  event_location: 'Central Park, New York',
  status: 'active',
  views: 1250,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
  average_rating: 4.8,
  seller: {
    id: '1',
    username: 'FestivalPro',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    bio: 'Premier event organizer with 10+ years of experience',
    is_seller: true,
    created_at: '2025-01-01',
  },
  reviews: [
    { id: '1', user_id: '1', rating: 5, comment: 'Amazing experience! The VIP access was worth every penny.', created_at: '2026-01-10', user: { username: 'JohnD', avatar_url: null } },
    { id: '2', user_id: '2', rating: 5, comment: 'Best festival ever! Will definitely come back.', created_at: '2026-01-08', user: { username: 'SarahM', avatar_url: null } },
    { id: '3', user_id: '3', rating: 4, comment: 'Great organization and amazing artists!', created_at: '2026-01-05', user: { username: 'MikeR', avatar_url: null } },
  ],
}

const relatedProducts: Product[] = [
  {
    id: '3',
    seller_id: '3',
    category_id: '3',
    title: 'Tech Conference 2026 - Early Bird',
    description: 'Join the biggest tech conference',
    price: 499,
    original_price: 699,
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
    stock: 100,
    is_event_ticket: true,
    event_date: '2026-09-20T09:00:00Z',
    event_location: 'San Francisco Convention Center',
    status: 'active',
    views: 2100,
    created_at: '2026-01-03',
    updated_at: '2026-01-03',
    average_rating: 4.7,
  },
  {
    id: '5',
    seller_id: '5',
    category_id: '1',
    title: 'Comedy Night Live - VIP Seating',
    description: 'Enjoy a night of laughter',
    price: 75,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800'],
    stock: 30,
    is_event_ticket: true,
    event_date: '2026-05-10T20:00:00Z',
    event_location: 'The Laugh Factory, LA',
    status: 'active',
    views: 560,
    created_at: '2026-01-05',
    updated_at: '2026-01-05',
    average_rating: 4.5,
  },
  {
    id: '9',
    seller_id: '9',
    category_id: '1',
    title: 'Jazz Night Under the Stars',
    description: 'An enchanting evening of smooth jazz',
    price: 89,
    original_price: 129,
    images: ['https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800'],
    stock: 80,
    is_event_ticket: true,
    event_date: '2026-06-20T19:00:00Z',
    event_location: 'Rooftop Gardens, Chicago',
    status: 'active',
    views: 340,
    created_at: '2026-01-09',
    updated_at: '2026-01-09',
    average_rating: 4.9,
  },
]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const product = productData as Product
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/marketplace" className="inline-flex items-center text-[#94a3b8] hover:text-white mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Back to marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a2e]">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge variant="danger" className="absolute top-4 left-4">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                 <button
                   key={index}
                   onClick={() => setSelectedImage(index)}
                   className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                     selectedImage === index ? 'border-[#e94560]' : 'border-transparent'
                   }`}
                 >
                   <Image
                     src={image}
                     alt={`Image ${index + 1}`}
                     fill
                     sizes="80px"
                     className="object-cover"
                   />
                 </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant="accent" className="mb-2">Event Ticket</Badge>
                <h1 className="font-heading text-3xl font-bold text-white">
                  {product.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-[#e94560] border-[#e94560] text-white'
                      : 'border-[#2d2d44] text-[#94a3b8] hover:border-[#e94560] hover:text-[#e94560]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
                <button className="p-3 rounded-lg border border-[#2d2d44] text-[#94a3b8] hover:border-[#e94560] hover:text-[#e94560] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (product.average_rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-[#2d2d44]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#94a3b8]">
                {product.average_rating} ({(product.reviews || []).length} reviews)
              </span>
            </div>

            {product.is_event_ticket && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[#94a3b8]">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">
                    {new Date(product.event_date!).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#94a3b8]">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{product.event_location}</span>
                </div>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              {product.original_price && (
                <span className="text-xl text-[#94a3b8] line-through">
                  ${product.original_price}
                </span>
              )}
              {discount > 0 && (
                <Badge variant="success">Save ${product.original_price! - product.price}</Badge>
              )}
            </div>

            <p className="text-[#94a3b8] mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#94a3b8]">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-[#1a1a2e] border border-[#2d2d44] flex items-center justify-center text-white hover:border-[#e94560] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-[#1a1a2e] border border-[#2d2d44] flex items-center justify-center text-white hover:border-[#e94560] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="text-[#94a3b8]">{product.stock} available</span>
            </div>

            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </div>

            <Card className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Shield className="w-6 h-6 mx-auto mb-2 text-[#10b981]" />
                  <p className="text-sm text-[#94a3b8]">Secure Payment</p>
                </div>
                <div>
                  <Truck className="w-6 h-6 mx-auto mb-2 text-[#10b981]" />
                  <p className="text-sm text-[#94a3b8]">Fast Delivery</p>
                </div>
                <div>
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[#10b981]" />
                  <p className="text-sm text-[#94a3b8]">Easy Returns</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            Seller Information
          </h2>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#2d2d44]">
                {product.seller?.avatar_url && (
                  <Image
                    src={product.seller?.avatar_url || ''}
                    alt={product.seller?.username || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{product.seller?.username}</h3>
                <p className="text-sm text-[#94a3b8]">{product.seller?.bio}</p>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            Reviews ({(product.reviews || []).length})
          </h2>
          <div className="space-y-4">
            {(product.reviews || []).map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2d2d44] flex items-center justify-center text-white font-semibold">
                    {review.user?.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{review.user?.username}</h4>
                      <span className="text-sm text-[#94a3b8]">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-[#2d2d44]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[#94a3b8]">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            Related Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}