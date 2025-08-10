import React, { useState } from 'react';

export default function SearchFilters({ onFilterChange }) {
  const [skill, setSkill] = useState('');
  const [rating, setRating] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');

  const handleSkillChange = e => {
    const val = e.target.value;
    setSkill(val);
    onFilterChange({ skill: val, rating, availabilityDate });
  };

  const handleRatingChange = e => {
    const val = e.target.value;
    setRating(val);
    onFilterChange({ skill, rating: val, availabilityDate });
  };

  const handleDateChange = e => {
    const val = e.target.value;
    setAvailabilityDate(val);
    onFilterChange({ skill, rating, availabilityDate: val });
  };

  const clearFilters = () => {
    setSkill('');
    setRating('');
    setAvailabilityDate('');
    onFilterChange({ skill: '', rating: '', availabilityDate: '' });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-sm max-w-md">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Skill</label>
        <input
          type="text"
          value={skill}
          onChange={handleSkillChange}
          placeholder="Search by skill"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Rating</label>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All ratings</option>
          {[5,4,3,2,1].map(r => (
            <option key={r} value={r}>{r} star{r > 1 ? 's' : ''} & up</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold">Available On</label>
        <input
          type="date"
          value={availabilityDate}
          onChange={handleDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
