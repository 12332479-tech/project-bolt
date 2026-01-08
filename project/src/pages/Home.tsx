import { useEffect, useState } from 'react';
import { fetchCars } from '../services/api';
import { Car } from '../data/cars';
import CarCard from '../components/CarCard';
// @ts-ignore
import FeaturedSection from '../components/FeaturedSection';
import { Award, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError('Failed to load cars. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Elite Motors</h1>
          <p className="text-xl mb-8">Discover Your Dream Car Today</p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            Explore Collection
          </button>
        </div>
      </div>

      <FeaturedSection cars={cars} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Selection</h3>
            <p className="text-gray-600">Handpicked luxury and performance vehicles</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certified Quality</h3>
            <p className="text-gray-600">Every vehicle thoroughly inspected</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Best Deals</h3>
            <p className="text-gray-600">Competitive pricing on luxury cars</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
