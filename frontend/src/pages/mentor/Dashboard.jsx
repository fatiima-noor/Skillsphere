import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';

function MentorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from your API
  const [mentorStats] = useState({
    totalSessions: 47,
    totalEarnings: 2350,
    averageRating: 4.8,
    totalStudents: 23,
    thisMonthSessions: 12,
    thisMonthEarnings: 600,
  });

  const [sessionRequests] = useState([
    {
      id: 1,
      learnerName: 'Alex Johnson',
      learnerAvatar: 'https://images.unsplash.com/photo-150700321雖然1169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      topic: 'React Hooks Deep Dive',
      preferredDate: '2025-08-12',
      preferredTime: '14:00',
      duration: '1 hour',
      budget: 50, // Changed to number
      message: "Hi! I'm struggling with useEffect and custom hooks. Would love your guidance!",
      requestedAt: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      learnerName: 'Maria Garcia',
      learnerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      topic: 'JavaScript ES6+ Features',
      preferredDate: '2025-08-13',
      preferredTime: '10:30',
      duration: '45 minutes',
      budget: 40, // Changed to number
      message: 'Need help understanding arrow functions, destructuring, and async/await.',
      requestedAt: '5 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      learnerName: 'David Kim',
      learnerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      topic: 'Node.js Backend Setup',
      preferredDate: '2025-08-14',
      preferredTime: '16:00',
      duration: '2 hours',
      budget: 100, // Changed to number
      message: 'Complete beginner to backend. Want to learn Express.js and MongoDB integration.',
      requestedAt: '1 day ago',
      status: 'pending',
    },
  ]);

  const [upcomingSessions] = useState([
    {
      id: 1,
      learnerName: 'Emma Wilson',
      learnerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face',
      topic: 'Advanced React Patterns',
      date: '2025-08-11',
      time: '15:00',
      duration: '1.5 hours',
      earnings: 75, // Changed to number
    },
    {
      id: 2,
      learnerName: 'John Martinez',
      learnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      topic: 'JavaScript Testing',
      date: '2025-08-12',
      time: '11:00',
      duration: '1 hour',
      earnings: 50, // Changed to number
    },
  ]);

  const [recentSessions] = useState([
    {
      id: 1,
      learnerName: 'Sarah Davis',
      topic: 'React State Management',
      completedAt: '2025-08-09',
      duration: '1 hour',
      earnings: 50, // Changed to number
      rating: 5,
      feedback: 'Excellent session! Very clear explanations.',
    },
    {
      id: 2,
      learnerName: 'Mike Chen',
      topic: 'JavaScript Fundamentals',
      completedAt: '1995-08-08',
      duration: '45 minutes',
      earnings: 40, // Changed to number
      rating: 5,
      feedback: 'Great teacher, will book again!',
    },
    {
      id: 3,
      learnerName: 'Lisa Wang',
      topic: 'CSS Flexbox',
      completedAt: '2025-08-07ಸ07',
      duration: '30 minutes',
      earnings: 30, // Changed to number
      rating: 4,
      feedback: 'Helpful session, understood the concepts better.',
    },
  ]);

  const [availabilityStatus, setAvailabilityStatus] = useState('available');

  const handleRequestAction = (requestId, action) => {
    // In a real app, this would make an API call
    console.log(`${action} request ${requestId}`);
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );

  // Get current date for dynamic filtering
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Mentor Dashboard 👨‍🏫
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.username || 'Mentor'}! You have{' '}
                {sessionRequests.length} new session requests.
              </p>
            </div>

            {/* Availability Toggle */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-600 mb-2">Availability Status</p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setAvailabilityStatus('available')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    availabilityStatus === 'available'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => setAvailabilityStatus('busy')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    availabilityStatus === 'busy'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Busy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-800">{mentorStats.totalSessions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-800">${mentorStats.totalEarnings}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-gray-800">{mentorStats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Students Helped</p>
                <p className="text-2xl font-bold text-gray-800">{mentorStats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Session Requests Alert */}
        {sessionRequests.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4 4h7l5 5v7H4V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  You have {sessionRequests.length} new session requests!
                </h3>
                <p className="text-gray-600">
                  Review and respond to learner requests to grow your mentoring impact.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          <TabButton
            id="overview"
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="requests"
            label={`Requests (${sessionRequests.length})`}
            isActive={activeTab === 'requests'}
            onClick={setActiveTab}
          />
          <TabButton
            id="sessions"
            label="My Sessions"
            isActive={activeTab === 'sessions'}
            onClick={setActiveTab}
          />
          <TabButton
            id="earnings"
            label="Earnings"
            isActive={activeTab === 'earnings'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Today's Sessions
              </h3>

              {upcomingSessions.filter((session) => session.date === today).length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions
                    .filter((session) => session.date === today)
                    .map((session) => (
                      <div key={session.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={session.learnerAvatar}
                              alt={session.learnerName}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-800">{session.topic}</h4>
                              <p className="text-sm text-gray-600">with {session.learnerName}</p>
                              <p className="text-sm text-green-600 font-medium">
                                {session.time} • {session.duration}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">${session.earnings}</p>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors mt-2">
                              Start Session
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">No sessions scheduled for today</p>
                  <p className="text-xs text-gray-400">Take a well-deserved break!</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-purple-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Recent Sessions
              </h3>

              <div className="space-y-4">
                {recentSessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{session.topic}</h4>
                      <p className="text-sm text-gray-600">with {session.learnerName}</p>
                      <p className="text-xs text-gray-500">
                        {session.completedAt} • {session.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${session.earnings}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Pending Session Requests</h3>

              {sessionRequests.length > 0 ? (
                <div className="space-y-6">
                  {sessionRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <img
                            src={request.learnerAvatar}
                            alt={request.learnerName}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{request.learnerName}</h4>
                            <p className="text-sm text-gray-600">Requested {request.requestedAt}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-green-600">${request.budget}</span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h5 className="font-medium text-gray-800 mb-2">Session Details:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Topic: </span>
                            <span className="font-medium">{request.topic}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration: </span>
                            <span className="font-medium">{request.duration}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Preferred Date: </span>
                            <span className="font-medium">{request.preferredDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Preferred Time: </span>
                            <span className="font-medium">{request.preferredTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-gray-800 mb-2">Message from learner:</h5>
                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg italic">
                          "{request.message}"
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRequestAction(request.id, 'accept')}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'decline')}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Decline
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                          Send Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No pending requests</h4>
                  <p className="text-sm">
                    New session requests will appear here when learners book with you.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">My Sessions</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  All Sessions
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                  Upcoming
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                  Completed
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Upcoming Sessions */}
              {upcomingSessions.map((session) => (
                <div key={session.id} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={session.learnerAvatar}
                        alt={session.learnerName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{session.topic}</h4>
                        <p className="text-sm text-gray-600">with {session.learnerName}</p>
                        <p className="text-sm text-blue-600 font-medium">
                          {session.date} at {session.time} • {session.duration}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${session.earnings}</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Completed Sessions */}
              {recentSessions.map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{session.topic}</h4>
                      <p className="text-sm text-gray-600">
                        with {session.learnerName} • {session.duration}
                      </p>
                      <p className="text-xs text-gray-500">Completed on {session.completedAt}</p>
                      {session.feedback && (
                        <p className="text-sm text-gray-700 mt-2 italic bg-yellow-50 ）p-2 rounded">
                          "{session.feedback}"
                        </p>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-green-600">${session.earnings}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mt-1 inline-block">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-8">
            {/* Earnings Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">This Month</h4>
                <p className="text-3xl font-bold text-green-600">${mentorStats.thisMonthEarnings}</p>
                <p className="text-sm text-gray-600">
                  {mentorStats.thisMonthSessions} sessions completed
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Total Earnings</h4>
                <p className="text-3xl font-bold text-blue-600">${mentorStats.totalEarnings}</p>
                <p className="text-sm text-gray-600">All time earnings</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Average per Session</h4>
                <p className="text-3xl font-bold text-purple-600">
                  ${Math.round(mentorStats.totalEarnings / mentorStats.totalSessions)}
                </p>
                <p className="text-sm text-gray-600">Per session rate</p>
              </div>
            </div>

            {/* Earnings History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Earnings History</h3>

              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">{session.topic}</h4>
                      <p className="text-sm text-gray-600">with {session.learnerName}</p>
                      <p className="text-xs text-gray-500">
                        {session.completedAt} • {session.duration}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${session.earnings}</p>
                      <p className="text-xs text-gray-500">Payment received</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total This Period:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${recentSessions.reduce((total, session) => total + session.earnings, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Payment Settings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Current Rate</h4>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-blue-600">$50</span>
                    <span className="text-gray-600 ml-2">per hour</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Update Rate
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Payment Method</h4>
                  <div className="flex items-center">
                    <span className="text-gray-700">PayPal: ***@email.com</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions for Overview */}
        {activeTab === 'overview' && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab('requests')}
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
               JL
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold">{sessionRequests.length}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">View Requests</span>
              </button>

              <Link
                to="/profile"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">Edit Profile</span>
              </Link>

              <button
                onClick={() => setActiveTab('earnings')}
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">View Analytics</span>
              </button>

              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">Set Schedule</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorDashboard;