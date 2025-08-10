import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMentorDetails, fetchMentorAvailability } from '../../api/mentors';
import AvailabilityCalendar from '../../components/mentor/AvailabilityCalendar';
import BookingForm from '../../components/learner/BookingForm';

export default function MentorProfile() {
  const { id } = useParams();
  const [availability, setAvailability] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [mentorRes, availabilityRes] = await Promise.all([
        fetchMentorDetails(id),
        fetchMentorAvailability(id)
      ]);
      if (mentorRes.success) setMentor(mentorRes.data);
      if (availabilityRes.success) setAvailability(availabilityRes.data);
    };
    loadData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {/* Mentor bio section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold">{mentor?.user.name}</h2>
        <p className="text-gray-600">{mentor?.bio}</p>
      </div>
      
      {/* Availability calendar */}
      <AvailabilityCalendar slots={availability} />

      {/* Booking button */}
      <button 
        className="bg-indigo-600 text-white px-4 py-2 rounded" 
        onClick={() => setShowBooking(true)}
      >
        Book Session
      </button>

      {/* Show BookingForm when requested */}
      {showBooking && (
        <BookingForm 
          mentorId={mentor?.id} 
          onClose={() => setShowBooking(false)} 
        />
      )}
    </div>
  );
}
