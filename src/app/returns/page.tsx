export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Returns & Refunds</h1>
        <div className="space-y-6 text-[#94a3b8]">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Return Policy</h2>
            <p>We want you to be satisfied with your purchase. If you receive a damaged or incorrect item, you may request a return within 7 days of delivery.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How to Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to your dashboard and select the order</li>
              <li>Click "Request Return" and provide a reason</li>
              <li>Our team will review and approve eligible returns</li>
              <li>Follow the provided instructions to return the item</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Refunds</h2>
            <p>Once the returned item is received and inspected, refunds are processed within 3-5 business days to your original payment method.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Non-Returnable Items</h2>
            <p>Perishable goods, personal care items, and digital products are not eligible for return unless damaged upon delivery.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
