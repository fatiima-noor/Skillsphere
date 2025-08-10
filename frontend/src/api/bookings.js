// src/api/bookings.js
import api from './index'; // axios instance with base URL and token headers

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings/create/', bookingData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || error.message || 'Booking failed'
    };
  }
};
