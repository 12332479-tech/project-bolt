import { Calendar, DollarSign } from 'lucide-react';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-gray-600">{car.brand}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{car.year}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{car.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center text-blue-600">
            <DollarSign className="h-5 w-5" />
            <span className="text-2xl font-bold">
              {car.price.toLocaleString()}
            </span>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
