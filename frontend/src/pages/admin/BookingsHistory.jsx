// src/pages/admin/BookingsHistory.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api';

const dummyBookings = [
  {
    id: 1,
    learner: 'Fatima Noor',
    mentor: 'Aroob',
    scheduled_time: '2025-08-12T10:00:00Z',
    duration_minutes: 60,
    status: 'confirmed',
  },
  {
    id: 2,
    learner: 'Ali Khan',
    mentor: 'Noor',
    scheduled_time: '2025-08-15T14:30:00Z',
    duration_minutes: 90,
    status: 'pending',
  },
];

export default function BookingsHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/bookings/history/');
        if (
          response.data &&
          Array.isArray(response.data.bookings) &&
          response.data.bookings.length > 0
        ) {
          setBookings(response.data.bookings);
        } else {
          // fallback to dummy data if API returns empty list
          setBookings(dummyBookings);
        }
      } catch (err) {
        setError('Failed to load bookings history.');
        setBookings(dummyBookings);
      }
      setLoading(false);
    }
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Bookings History</h2>

      {loading && <p className="text-center font-semibold">Loading bookings...</p>}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Learner</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mentor</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Scheduled Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Duration (mins)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{b.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{b.learner}</td>
                  <td className="border border-gray-300 px-4 py-2">{b.mentor}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(b.scheduled_time).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{b.duration_minutes}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{b.status}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
