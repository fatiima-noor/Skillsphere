import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const MentorApply = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/mentor/apply/', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.detail || 'Application submitted successfully!');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Please login to apply as a mentor.</p>;

  // If user is already mentor or application submitted logic can be added here (if backend exposes it)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Apply to Become a Mentor</h2>
      <p className="mb-4">
        Ready to share your knowledge? Submit your application now.
      </p>

      {message && <p className="mb-4 text-center text-green-600">{message}</p>}

      <form onSubmit={handleApply}>
        {/* No input needed since backend accepts empty post for application */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default MentorApply;
