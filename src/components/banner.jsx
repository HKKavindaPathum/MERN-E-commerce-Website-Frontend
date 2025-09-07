import { useNavigate } from "react-router-dom";
import bannerImg from "../../public/banner.png";
import bannerImage from "../../public/bannerImage.png";


export default function Banner() {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full rounded-3xl shadow-2xl border-4 border-yellow-600 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImg})`,
      minHeight: '450px' }}
    >
      <div className="absolute inset-0 bg-pink-50/70"></div>
      <div className="relative container mx-auto px-16 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
            Beauty Products
          </h1>
          <p className="text-gray-700 mb-6 max-w-md">
            Discover our wide selection of high-quality beauty products that
            bring out your natural glow.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={bannerImage}
            alt="Beauty Products"
            className="rounded-full shadow-lg max-w-md border-4 border-yellow-600"
          />
        </div>
      </div>
    </section>
  )
};
