import { Users, Target, Heart, Trophy } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Elite Motors</h1>
          <p className="text-xl">Where Passion Meets Excellence</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in 2010, Elite Motors has grown to become one of the most trusted names in luxury automotive sales.
              Our journey began with a simple vision: to provide car enthusiasts with access to the world's finest vehicles,
              backed by exceptional service and expertise.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Over the years, we've built lasting relationships with our clients, earning their trust through our
              commitment to quality, transparency, and unparalleled customer service. Every vehicle in our showroom
              is carefully selected and thoroughly inspected to meet our exacting standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, Elite Motors stands as a beacon of excellence in the automotive industry, offering an curated
              collection of premium vehicles from the world's most prestigious manufacturers.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Showroom"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every aspect of our business
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for automobiles drives everything we do
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through transparency
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                Honest dealings and ethical practices always
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join the Elite Motors Family</h2>
          <p className="text-xl mb-8">Experience the difference of working with automotive professionals who care</p>
          <button className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors">
            Visit Our Showroom
          </button>
        </div>
      </div>
    </div>
  );
}
