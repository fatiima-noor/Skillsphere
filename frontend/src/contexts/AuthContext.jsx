import { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as loginApi, 
  register as registerApi, 
  changePassword as changePasswordApi,
  getProfile
} from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize tokens from localStorage, so if user reloads page tokens are preserved
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const result = await getProfile();
          if (result.success) {
            setUser(result.data);
            setIsAuthenticated(true);
          } else {
            logout(); // if token invalid or expired
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);  // <-- run effect when token changes

  const login = async (credentials) => {
    try {
      const result = await loginApi(credentials);
      if (result.success) {
        // Save tokens to state and localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('refresh', result.data.refresh);
        setToken(result.data.token);
        setRefreshToken(result.data.refresh);

        // Hardcoded admin override
        let userData = result.data.user;
        if (credentials.username?.toLowerCase() === 'admin' && credentials.password === 'admin123') {
          userData = { ...userData, role: 'admin' };
        }

        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, data: { user: userData } };
      }
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed',
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
        message: error.message || 'Registration failed',
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const result = await changePasswordApi(passwordData);
      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to change password',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setToken(null);
    setRefreshToken(null);
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
        changePassword,
        token,          // <-- new addition, safe to use in other components if needed
        refreshToken,   // <-- optional but here if you want it
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
