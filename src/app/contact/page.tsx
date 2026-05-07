export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-[#94a3b8] mb-10">We&apos;d love to hear from you. Get in touch with our team.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" placeholder="Your email" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} placeholder="Your message" className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg focus:outline-none focus:border-[#e94560] text-white resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63651] transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-[#94a3b8]">dzalekabusiness@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-[#94a3b8]">+265 990 342 825</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Location</h3>
              <p className="text-[#94a3b8]">Dzaleka, Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
