import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCarById } from '../services/api';
// import { cars } from '../data/cars';
import { Calendar, DollarSign, Check, ArrowLeft } from 'lucide-react';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarById(Number(id))
      .then(data => {
        // Parse features if string
        if (data && typeof data.features === 'string') {
            try {
                data.features = JSON.parse(data.features);
            } catch (e) {
                // If not json, maybe separate by comma
                data.features = data.features.split(',');
            }
        }
        setCar(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h2>
          <button
            onClick={() => navigate('/cars')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
              <p className="text-xl opacity-90">{car.brand}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{car.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-600">Price</span>
                    <div className="flex items-center text-blue-600">
                      <DollarSign className="w-6 h-6" />
                      <span className="text-3xl font-bold">{car.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <span className="text-gray-600">Year</span>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="text-xl font-semibold">{car.year}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/contact')}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                  >
                    Book Test Drive
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="w-full mt-3 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
                  >
                    Contact Dealer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
