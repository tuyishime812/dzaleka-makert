export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
        <div className="space-y-6 text-[#94a3b8]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Delivery Areas</h2>
            <p>We currently deliver within Dzaleka and surrounding areas. Some sellers may offer extended delivery options.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Delivery Times</h2>
            <p>Most orders are delivered within 1-3 business days. Delivery times may vary based on seller location and product availability.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Shipping Fees</h2>
            <p>Shipping fees are calculated at checkout based on delivery location and order size. Some sellers offer free shipping on qualifying orders.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Order Tracking</h2>
            <p>Once your order is shipped, you'll receive a confirmation with tracking details. You can also track your orders from your dashboard.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
