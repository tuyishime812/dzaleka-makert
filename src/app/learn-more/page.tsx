import Link from 'next/link'

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Dzaleka Business</h1>
        <div className="space-y-8 text-[#94a3b8]">
          <p className="text-lg">
            Dzaleka Business is a marketplace platform designed to empower entrepreneurs and artisans within the Dzaleka community, connecting them with customers locally and beyond.
          </p>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
            <p>To create economic opportunities for Dzaleka residents by providing a digital platform that showcases local businesses, products, and services to a wider market.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A digital marketplace for local sellers to list their products</li>
              <li>Secure payment processing and order management</li>
              <li>Tools for sellers to manage inventory and track sales</li>
              <li>Community events and networking opportunities</li>
              <li>Business resources and educational content</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Join Our Community</h2>
            <p>Whether you're a buyer looking for unique products or a seller ready to grow your business, Dzaleka Business is here for you.</p>
            <div className="flex gap-4 mt-6">
              <Link href="/marketplace" className="px-6 py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors">
                Browse Marketplace
              </Link>
              <Link href="/seller/signup" className="px-6 py-3 border border-[#e94560] text-[#e94560] font-semibold rounded-lg hover:bg-[#e94560] hover:text-white transition-colors">
                Become a Seller
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
