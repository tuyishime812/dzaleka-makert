import Link from 'next/link'

const topics = [
  { title: 'Getting Started', desc: 'Learn how to create an account and make your first purchase.' },
  { title: 'Selling on Dzaleka', desc: 'Everything you need to know about listing products and managing orders.' },
  { title: 'Payments & Payouts', desc: 'Understanding our payment system and payout schedules.' },
  { title: 'Shipping & Delivery', desc: 'Information about shipping options and delivery times.' },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-[#94a3b8] mb-10">Find answers and get support.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {topics.map((t) => (
            <div key={t.title} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
              <p className="text-[#94a3b8] text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[#94a3b8] mb-4">Still need help?</p>
          <Link href="/contact" className="px-6 py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
