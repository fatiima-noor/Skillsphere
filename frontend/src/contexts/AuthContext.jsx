import { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as loginApi, 
  register as registerApi, 
  changePassword as changePasswordApi,
  getProfile
} from '../api/auth';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await getProfile();
          if (result.success) {
            setUser(result.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await loginApi(credentials);
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('refresh', result.data.refresh);
        
        // Hardcoded admin override
        let user = result.data.user;
        if (credentials.username?.toLowerCase() === 'admin' && credentials.password === 'admin123') {
          user = { ...user, role: 'admin' };
        }
        
        setUser(user);
        setIsAuthenticated(true);
        // Return user info here for redirect
        return { success: true, data: { user: user } };
      }
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const result = await registerApi(userData);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const result = await changePasswordApi(passwordData);
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to change password'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);