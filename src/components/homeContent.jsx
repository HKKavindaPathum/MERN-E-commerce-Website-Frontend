import { useNavigate } from "react-router-dom";
import Banner from "./banner";
import Skincare from "../../public/SkinCare.png";
import Makeup from "../../public/MakeUp.png";
import Haircare from "../../public/HairCare.png";

export default function HomeContent() {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="bg-pink-50 pt-4 flex flex-col items-center w-full">
      <Banner />

      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-10 text-center">
          Shop by Category
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Skincare */}
          <div
            onClick={() => goToCategory("skincare")}
            className="relative group flex-1 rounded-3xl border-3 border-yellow-600 overflow-hidden shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={Skincare}
              alt="Skincare"
              className="w-full h-64 md:h-80 object-cover brightness-90 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/50 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-pink-900">Skincare</h3>
            </div>
          </div>

          {/* Makeup */}
          <div
            onClick={() => goToCategory("makeup")}
            className="relative group flex-1 rounded-3xl border-3 border-yellow-600 overflow-hidden shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={Makeup}
              alt="Makeup"
              className="w-full h-64 md:h-80 object-cover brightness-90 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/50 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-pink-900">Makeup</h3>
            </div>
          </div>

          {/* Haircare */}
          <div
            onClick={() => goToCategory("haircare")}
            className="relative group flex-1 rounded-3xl border-3 border-yellow-600 overflow-hidden shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={Haircare}
              alt="Haircare"
              className="w-full h-64 md:h-80 object-cover brightness-90 group-hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-pink-50/50 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-pink-900">Haircare</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
