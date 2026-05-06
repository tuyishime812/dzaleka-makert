import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Dzaleka Business</h1>
        <div className="space-y-6 text-[#94a3b8]">
          <p className="text-lg">
            Dzaleka Business is a community-driven marketplace platform that empowers local entrepreneurs and connects them with customers across the region.
          </p>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Story</h2>
            <p>Founded with the vision of creating economic opportunities within the Dzaleka community, our platform bridges the gap between local sellers and buyers, making commerce accessible to everyone.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Community empowerment through economic opportunity</li>
              <li>Transparency and trust in every transaction</li>
              <li>Supporting local businesses and artisans</li>
              <li>Innovation in digital commerce</li>
            </ul>
          </section>
          <div className="pt-6">
            <Link href="/marketplace" className="px-6 py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
