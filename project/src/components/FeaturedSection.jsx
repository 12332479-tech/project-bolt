import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const FeaturedSection = ({ cars }) => {
  const navigate = useNavigate();
  // Filter featured cars (in a real app, this would come from the API)
  // For now, we'll just take the first 2 as "featured" if no flag exists
  const featuredCars = cars.filter(car => car.isFeatured || car.id <= 2);

  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="text-yellow-400" />
              Featured Vehicles
            </h2>
            <p className="text-gray-400 mt-2">Exclusive offers on our premium fleet</p>
          </div>
          <Link to="/cars" className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCars.map((car) => (
            <div key={car.id} className="relative group overflow-hidden rounded-2xl">
              <div className="aspect-w-16 aspect-h-9 h-64">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3 inline-block">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{car.brand} {car.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      {car.specialPrice ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-yellow-400">${car.specialPrice.toLocaleString()}</span>
                          <span className="text-sm text-gray-400 line-through">${car.price.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => navigate(`/cars/${car.id}`)}
                      className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
