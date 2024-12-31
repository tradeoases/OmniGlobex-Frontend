import { useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";

interface FavoriteItem {
  id: string;
  title: string;
  image: string;
  price?: string;
  supplier?: string;
}

const MyFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== id)
    );
    // TODO: Add API call to remove from backend
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Favorites
      </h1>
      
      <div className="h-px bg-gray-200 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 relative">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {item.title}
              </h3>
              {item.price && (
                <p className="text-blue-600 font-semibold mt-2">
                  {item.price}
                </p>
              )}
              {item.supplier && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.supplier}
                </p>
              )}
              <button
                onClick={() => handleRemoveFavorite(item.id)}
                className="absolute bottom-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-16">
          <FaHeart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-500">
           Favorites products/suppliers will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
