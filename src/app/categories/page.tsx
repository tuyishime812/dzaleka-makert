import Link from 'next/link'

const categories = [
  { name: 'Food & Groceries', slug: 'food', description: 'Fresh produce, snacks, and daily essentials', icon: '🍎' },
  { name: 'Clothing & Fashion', slug: 'clothing', description: 'Traditional and modern clothing', icon: '👕' },
  { name: 'Handcrafts & Art', slug: 'handcrafts', description: 'Unique handmade items and artwork', icon: '🎨' },
  { name: 'Electronics', slug: 'electronics', description: 'Phones, accessories, and gadgets', icon: '📱' },
  { name: 'Home & Living', slug: 'home', description: 'Furniture, decor, and household items', icon: '🏠' },
  { name: 'Services', slug: 'services', description: 'Professional and personal services', icon: '🔧' },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-[#94a3b8] mb-12">Browse products by category</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/marketplace?category=${cat.slug}`}
              className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-6 hover:border-[#e94560] transition-colors"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
              <p className="text-[#94a3b8] text-sm">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
