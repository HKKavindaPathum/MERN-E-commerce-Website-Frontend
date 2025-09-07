export default function AboutPage() {
  return (
    <div className="w-full h-full bg-pink-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="font-semibold text-pink-600">Beauty Bliss</span> – 
          your one-stop destination for skincare, makeup, and haircare products.  
          We believe beauty is more than skin deep; it’s about confidence, 
          self-expression, and care.  
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-pink-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To provide high-quality beauty products that enhance your natural glow.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-pink-600 mb-3">Our Values</h2>
            <p className="text-gray-600">
              We value authenticity, sustainability, and making self-care accessible to all.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-pink-600 mb-3">Our Promise</h2>
            <p className="text-gray-600">
              Delivering trusted products that are safe, cruelty-free, and effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
