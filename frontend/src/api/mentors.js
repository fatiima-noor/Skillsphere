// src/api/mentors.js
import axios from './index';

export async function getMentors() {
  try {
    const response = await axios.get('/api/mentors/mentor/list/');
    return response.data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
}
