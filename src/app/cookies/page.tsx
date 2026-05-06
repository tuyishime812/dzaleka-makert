export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="space-y-6 text-[#94a3b8]">
          <p>Last updated: May 5, 2026</p>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How We Use Cookies</h2>
            <p>We use cookies to keep you signed in, remember your preferences, analyze site traffic, and improve our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Essential cookies:</strong> Required for the site to function properly</li>
              <li><strong className="text-white">Authentication cookies:</strong> Keep you signed in to your account</li>
              <li><strong className="text-white">Analytics cookies:</strong> Help us understand how visitors use our site</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
