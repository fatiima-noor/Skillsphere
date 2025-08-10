import { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as loginApi, 
  register as registerApi, 
  changePassword as changePasswordApi,
  getProfile
} from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skipProfileFetch, setSkipProfileFetch] = useState(false); // new flag

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        if (skipProfileFetch) {
          // skip fetching profile right after login, use stored user
          setLoading(false);
          setSkipProfileFetch(false); // reset flag for future use
          return;
        }

        try {
          const result = await getProfile();
          if (result.success) {
            let profileUser = result.data;

            // Override role if username is admin (saved in localStorage)
            const storedUsername = localStorage.getItem('username');
            if (storedUsername?.toLowerCase() === 'admin') {
              profileUser = { ...profileUser, role: 'admin' };
            }

            setUser(profileUser);
            setIsAuthenticated(true);
          } else {
            logout();
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
  }, [token, skipProfileFetch]);

  const login = async (credentials) => {
    try {
      const result = await loginApi(credentials);
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('refresh', result.data.refresh);
        localStorage.setItem('username', credentials.username);  // save username

        setToken(result.data.token);
        setRefreshToken(result.data.refresh);

        // Admin override
        let userData = result.data.user;
        if (credentials.username?.toLowerCase() === 'admin' && credentials.password === 'admin123') {
          userData = { ...userData, role: 'admin' };
        }

        setUser(userData);
        setIsAuthenticated(true);
        setSkipProfileFetch(true); // skip profile fetch after login

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
    localStorage.removeItem('username');  // clean up username too
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
        token,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
