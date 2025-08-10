import { useState, useEffect } from 'react';
import api from '../../api';
import Button from '../../components/common/Button';

const MentorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingIds, setActionLoadingIds] = useState([]);

  // Fetch mentor applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/mentor/applications/');
        setApplications(res.data || []);
      } catch (err) {
        setError('Failed to load mentor applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Approve or reject application
  const handleApprove = async (id, status = 'approved') => {
    setActionLoadingIds((prev) => [...prev, id]);
    try {
      // API expects "mentor_status" string, let's use status param
      await api.put(`/mentor/applications/${id}/approve/`, { mentor_status: status });
      // Update locally by removing approved/rejected app or updating status
      setApplications((apps) => apps.filter((app) => app.id !== id));
    } catch (err) {
      alert('Failed to update application status.');
    } finally {
      setActionLoadingIds((prev) => prev.filter((appId) => appId !== id));
    }
  };

  if (loading) return <p>Loading mentor applications...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (applications.length === 0)
    return <p>No mentor applications at the moment.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Mentor Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border rounded-md p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="mb-3 sm:mb-0">
              <p>
                <strong>Username:</strong> {app.username}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Name:</strong> {app.first_name} {app.last_name}
              </p>
              <p>
                <strong>Bio:</strong> {app.bio || 'N/A'}
              </p>
              <p>
                <strong>Interests:</strong> {app.interests || 'N/A'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                disabled={actionLoadingIds.includes(app.id)}
                onClick={() => handleApprove(app.id, 'approved')}
                variant="primary"
                size="sm"
              >
                Approve
              </Button>
              <Button
                disabled={actionLoadingIds.includes(app.id)}
                onClick={() => handleApprove(app.id, 'rejected')}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorApplications;
