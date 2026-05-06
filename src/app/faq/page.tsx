const faqs = [
  { q: 'How do I create a seller account?', a: 'Click on "Become a Seller" and fill out the registration form with your business details.' },
  { q: 'How do payments work?', a: 'Buyers pay through our secure payment system. Sellers receive payouts after order confirmation.' },
  { q: 'Is there a listing fee?', a: 'Currently, listing products on Dzaleka Business is free for all sellers.' },
  { q: 'How do I track my order?', a: 'You can track your orders from your dashboard under the "My Orders" section.' },
  { q: 'What if I receive a damaged item?', a: 'Contact the seller or our support team immediately. We have a refund/return policy in place.' },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-[#94a3b8] mb-10">Find answers to common questions about Dzaleka Business.</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-6 group">
              <summary className="text-lg font-semibold cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-[#e94560] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#94a3b8] mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
