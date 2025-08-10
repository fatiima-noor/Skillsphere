// src/components/learner/BookingForm.jsx
import React, { useState } from 'react';
import { createBooking } from '../../api/bookings';

const BookingForm = ({ mentorId, onBookingSuccess }) => {
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(60); // default 60 min
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!mentorId) {
      setError('Mentor ID missing');
      setLoading(false);
      return;
    }

    if (!scheduledTime) {
      setError('Please select a date and time');
      setLoading(false);
      return;
    }

    const bookingData = {
      scheduled_time: new Date(scheduledTime).toISOString(),
      duration_minutes: duration,
      mentor: mentorId,
      // assuming learner id and booking_request are handled on backend from auth
    };

    const result = await createBooking(bookingData);

    setLoading(false);
    if (result.success) {
      onBookingSuccess && onBookingSuccess(result.data);
    } else {
      setError(result.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '1rem auto' }}>
      <label>
        Select date and time:
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Duration (minutes):
        <input
          type="number"
          min="15"
          max="240"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
      </label>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Mentor'}
      </button>
    </form>
  );
};

export default BookingForm;
