import React, { useEffect, useState } from 'react';
import api from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get('/admin/stats/'); // no explicit token header needed here
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center p-4">Loading admin stats...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{stats.total_users}</p>
        </div>

        <div className="bg-green-100 p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
          <p className="text-4xl font-bold">{stats.total_bookings}</p>
        </div>

        <div className="bg-purple-100 p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Sessions</h2>
          <p className="text-4xl font-bold">{stats.total_sessions}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
