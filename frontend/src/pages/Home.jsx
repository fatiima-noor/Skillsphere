import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className="container mx-auto p-4 flex-grow text-center">
      {isAuthenticated ? (
        <>
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user.username || 'User'}!
          </h1>
          <p className="text-lg mb-6">
            Ready to continue your learning journey? Head to your dashboard to explore opportunities.
          </p>
          <div className="space-x-4">
            <Link
              to={user.role === 'learner' ? '/learner' : user.role === 'mentor' ? '/mentor' : '/admin'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/profile"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              View Profile
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">Welcome to SkillSphere</h1>
          <p className="text-lg mb-6">Connect with mentors for real-time microlearning.</p>
          <div className="space-x-4">
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </Link>
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Register
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;