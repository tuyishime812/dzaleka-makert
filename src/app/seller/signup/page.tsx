import Link from 'next/link'

export default function SellerSignupPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Become a Seller</h1>
          <p className="text-[#94a3b8]">Start selling your products on Dzaleka Business</p>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input type="text" placeholder="Enter your business name" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white">
                <option>Select a category</option>
                <option>Food & Groceries</option>
                <option>Clothing & Fashion</option>
                <option>Handcrafts & Art</option>
                <option>Electronics</option>
                <option>Home & Living</option>
                <option>Services</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors">
              Create Seller Account
            </button>
          </form>
          <p className="text-center text-[#94a3b8] text-sm mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#e94560] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
