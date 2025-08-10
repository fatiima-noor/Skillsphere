// src/components/learner/MentorCard.jsx
import React, { useState } from 'react';
import { createBooking } from '../../api/bookings';

export default function MentorCard({ mentor, learnerId, onBookingSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleBook() {
    setLoading(true);
    setError('');
    try {
      // For MVP, schedule now + 1hr duration, booking_request = 0 (adjust as needed)
      await createBooking({
        scheduled_time: new Date().toISOString(),
        duration_minutes: 60,
        learner: learnerId,
        mentor: mentor.id,
        booking_request: 0,
      });
      onBookingSuccess(`Booked ${mentor.name} successfully!`);
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded p-4 shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg mb-1">{mentor.name}</h3>
        <p><strong>Skills:</strong> {mentor.skills?.join(', ') || 'N/A'}</p>
        <p><strong>Rating:</strong> {mentor.rating?.toFixed(1) || 'N/A'} ⭐</p>
        <p><strong>Available Dates:</strong> {mentor.availableDates?.join(', ') || 'N/A'}</p>
      </div>

      <button
        disabled={loading}
        onClick={handleBook}
        className={`mt-4 px-4 py-2 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Booking...' : 'Book Mentor'}
      </button>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
}
