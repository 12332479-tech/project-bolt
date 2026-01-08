import React, { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';

const Reviews = ({ carId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock fetching reviews (Replace with actual API call)
  // const fetchReviews = async () => {
  //   const res = await fetch(`http://localhost:5000/api/reviews/car/${carId}`);
  //   const data = await res.json();
  //   setReviews(data);
  // };

  // For now, we'll use mock data if API fails or just to demonstrate
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews([
        { id: 1, rating: 5, comment: "Amazing car!", User: { username: "john_doe" }, createdAt: new Date().toISOString() }
      ]);
      setLoading(false);
    }, 1000);
  }, [carId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit review would go here
    console.log('Submitting review:', newReview);
    alert('Review submitted! (This is a demo)');
    setNewReview({ rating: 5, comment: '' });
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
      
      {/* Review List */}
      <div className="space-y-6 mb-8">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-semibold">{review.User?.username || 'Anonymous'}</span>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <span className="text-xs text-gray-400 mt-2 block">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Review Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`focus:outline-none ${newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Share your experience..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
