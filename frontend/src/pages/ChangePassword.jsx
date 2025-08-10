import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const result = await changePassword({ 
        old_password: oldPassword, 
        new_password: newPassword 
      });
      
      if (result.success) {
        setSuccess(result.message || 'Password changed successfully');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setError(result.message || 'Failed to change password');
      }
    } catch (err) {
      setError(err.message || 'Failed to change password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="container mx-auto p-6 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Change Password</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Old Password
              </label>
              <input
                id="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                required
                minLength="8"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium text-base"
            >
              Change Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChangePassword;