import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Error404 from './pages/Error404';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import LearnerDashboard from './pages/learner/Dashboard';
import MentorDashboard from './pages/mentor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import MentorList from './pages/learner/MentorList';
import BookingsHistory from './pages/admin/BookingsHistory';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              
              {/* Role-based routes */}
              <Route path="/learner" element={<PrivateRoute allowedRoles={['learner']}><LearnerDashboard /></PrivateRoute>} />
              <Route path="/learner/mentors" element={<PrivateRoute allowedRoles={['learner']}><MentorList /></PrivateRoute>} />
              
              <Route path="/mentor" element={<PrivateRoute allowedRoles={['mentor']}><MentorDashboard /></PrivateRoute>} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/bookings-history" element={<PrivateRoute allowedRoles={['admin']}><BookingsHistory /></PrivateRoute>} />
              
              <Route path="/404" element={<Error404 />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
