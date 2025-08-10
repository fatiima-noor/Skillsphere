import api from './index';

// Login function
export const login = async (credentials) => {
  try {
    const response = await api.post('/login/', credentials);
    return {
      success: true,
      data: {
        token: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || 'Login failed',
      errors: error.response?.data
    };
  }
};

// Register function
export const register = async (userData) => {
  try {
    const response = await api.post('/register/', userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || 'Registration failed',
      errors: error.response?.data
    };
  }
};

// Get profile function
export const getProfile = async () => {
  try {
    const response = await api.get('/profile/');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch profile',
    };
  }
};

// Update profile function
export const updateProfile = async (profileData) => {
  try {
    const response = await api.patch('/profile/', profileData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
      errors: error.response?.data?.errors,
    };
  }
};

// Change password function (NEW - make sure this is exported)
export const changePassword = async (passwordData) => {
  try {
    const response = await api.patch('/change-password/', passwordData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to change password',
      errors: error.response?.data?.errors,
    };
  }
};