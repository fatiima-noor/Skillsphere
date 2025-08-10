import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, updateProfile } from '../api/auth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom'; // Add this import

const Profile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    interests: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      const result = await getProfile();
      if (result.success) {
        setFormData({
          username: result.data.username,
          email: result.data.email,
          first_name: result.data.first_name || '',
          last_name: result.data.last_name || '',
          bio: result.data.bio || '',
          interests: result.data.interests || ''
        });
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    const result = await updateProfile(formData);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  };

  if (profileLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your personal details.</p>
        </div>
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 m-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Your profile changes have been saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  label="Username"
                  required
                  error={errors.username}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email address"
                  required
                  error={errors.email}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  label="First name"
                  error={errors.first_name}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  label="Last name"
                  error={errors.last_name}
                />
              </div>

              <div className="sm:col-span-6">
                <Input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  label="Bio"
                  error={errors.bio}
                />
              </div>

              <div className="sm:col-span-6">
                <Input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  label="Interests"
                  error={errors.interests}
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
            {user?.role !== 'admin' && (
              <Link 
                to="/change-password" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Change Password
              </Link>
            )}
            <div className={`flex space-x-3 ${user?.role === 'admin' ? 'ml-auto' : ''}`}>
              <Button
                type="button"
                variant="danger"
                onClick={logout}
              >
                Logout
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;