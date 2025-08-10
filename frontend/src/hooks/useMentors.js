// src/hooks/useMentors.js
import { useState, useEffect } from 'react';
import { fetchMentors, searchMentorAvailability } from '../api/mentors';

export const useMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMentors = async () => {
    setLoading(true);
    const result = await fetchMentors();
    if (result.success) {
      setMentors(result.data);
      setError(null);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const loadAvailability = async (filters) => {
    setLoading(true);
    const result = await searchMentorAvailability(filters);
    if (result.success) {
      setAvailability(result.data);
      setError(null);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMentors();
  }, []);

  return { mentors, availability, loading, error, loadAvailability };
};
