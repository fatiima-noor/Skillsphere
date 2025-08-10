// src/pages/learner/MentorList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { getMentors } from '../../api/mentors';
import MentorCard from '../../components/learner/MentorCard';
import { AuthContext } from '../../contexts/AuthContext';

const dummyMentors = [
  { id: 1, name: 'Alia', skills: ['React', 'UI/UX'], rating: 4.5, availableDates: ['2025-08-10', '2025-08-15'] },
  { id: 2, name: 'Aroob', skills: ['Python', 'ML'], rating: 4.8, availableDates: ['2025-08-12', '2025-08-20'] },
  { id: 3, name: 'Josh', skills: ['Django', 'APIs'], rating: 4.3, availableDates: ['2025-08-11', '2025-08-13'] },
  { id: 4, name: 'Noor', skills: ['JavaScript', 'React'], rating: 4.7, availableDates: ['2025-08-10', '2025-08-14'] },
];

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({ skill: '', rating: '', availabilityDate: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext); // assume AuthContext gives current user info

  useEffect(() => {
    async function fetchMentors() {
      setLoading(true);
      try {
        const data = await getMentors();
        if (!data || data.length === 0) throw new Error('Empty mentor list');
        setMentors(data);
      } catch {
        setMentors(dummyMentors);
      }
      setLoading(false);
    }
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(m => {
    const skillMatch = filters.skill
      ? m.skills?.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()))
      : true;
    const ratingMatch = filters.rating ? m.rating >= Number(filters.rating) : true;
    const dateMatch = filters.availabilityDate
      ? m.availableDates?.includes(filters.availabilityDate)
      : true;
    return skillMatch && ratingMatch && dateMatch;
  });

  function handleBookingSuccess(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Mentors</h1>

      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-md shadow-md max-w-4xl mx-auto mb-8 flex flex-wrap gap-6 justify-center">
        <input
          type="text"
          placeholder="Skill"
          className="border rounded px-4 py-2 w-48"
          value={filters.skill}
          onChange={e => setFilters(f => ({ ...f, skill: e.target.value }))}
        />
        <select
          className="border rounded px-4 py-2 w-48"
          value={filters.rating}
          onChange={e => setFilters(f => ({ ...f, rating: e.target.value }))}
        >
          <option value="">All ratings</option>
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>
              {r} star{r > 1 ? 's' : ''} & up
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded px-4 py-2 w-48"
          value={filters.availabilityDate}
          onChange={e => setFilters(f => ({ ...f, availabilityDate: e.target.value }))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setFilters({ skill: '', rating: '', availabilityDate: '' })}
        >
          Clear Filters
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-4xl mx-auto mb-6 text-center font-semibold text-green-700">
          {message}
        </div>
      )}

      {/* Mentors Grid */}
      {loading ? (
        <div className="text-center font-semibold">Loading mentors...</div>
      ) : filteredMentors.length === 0 ? (
        <div className="text-center font-semibold">No mentors found matching the filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredMentors.map(m => (
            <MentorCard
              key={m.id}
              mentor={m}
              learnerId={user?.id || 1} // fallback 1 if user not available
              onBookingSuccess={handleBookingSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
