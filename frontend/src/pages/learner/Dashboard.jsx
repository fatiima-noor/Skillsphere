import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function LearnerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from your API
  const [learnerStats] = useState({
    completedSessions: 12,
    totalHours: 24,
    currentStreak: 7,
    skillsLearned: 5
  });

  const [upcomingSessions] = useState([
    {
      id: 1,
      title: "React Hooks Deep Dive",
      mentor: "Sarah Chen",
      date: "2025-08-11",
      time: "14:00",
      duration: "1 hour",
      category: "Programming",
      mentorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      mentor: "Alex Rodriguez",
      date: "2025-08-12",
      time: "10:30",
      duration: "45 minutes",
      category: "Design",
      mentorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    }
  ]);

  const [recentSessions] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      mentor: "John Doe",
      completedAt: "2025-08-09",
      rating: 5,
      duration: "1 hour"
    },
    {
      id: 2,
      title: "CSS Grid Layout",
      mentor: "Jane Smith",
      completedAt: "2025-08-07",
      rating: 4,
      duration: "45 minutes"
    },
    {
      id: 3,
      title: "Git Version Control",
      mentor: "Mike Wilson",
      completedAt: "2025-08-05",
      rating: 5,
      duration: "30 minutes"
    }
  ]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.username || 'Learner'}! 👋
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-800">{learnerStats.completedSessions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Learning Hours</p>
                <p className="text-2xl font-bold text-gray-800">{learnerStats.totalHours}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">{learnerStats.currentStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Skills Learned</p>
                <p className="text-2xl font-bold text-gray-800">{learnerStats.skillsLearned}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="sessions" 
            label="My Sessions" 
            isActive={activeTab === 'sessions'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="progress" 
            label="Progress" 
            isActive={activeTab === 'progress'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming Sessions
              </h3>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{session.title}</h4>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <img src={session.mentorAvatar} alt={session.mentor} className="w-6 h-6 rounded-full mr-2" />
                            <span>{session.mentor}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {session.date} at {session.time} • {session.duration}
                          </p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming sessions scheduled.</p>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Recent Sessions
              </h3>
              <div className="space-y-4">
                {recentSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{session.title}</h4>
                      <p className="text-sm text-gray-600">with {session.mentor} • {session.duration}</p>
                      <p className="text-xs text-gray-500">{session.completedAt}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">My Learning Sessions</h3>
            
            <div className="mb-6">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">All Sessions</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Upcoming</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Completed</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelled</button>
              </div>
            </div>

            <div className="space-y-4">
              {[...upcomingSessions, ...recentSessions.map(s => ({...s, status: 'completed'}))].map((session, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{session.title}</h4>
                      <p className="text-sm text-gray-600">
                        with {session.mentor} • {session.duration || '1 hour'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {session.date ? `${session.date} at ${session.time}` : `Completed on ${session.completedAt}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {session.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                      {session.status === 'completed' ? (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Review
                        </button>
                      ) : (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            {/* Learning Path Progress */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Learning Progress</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Frontend Development</span>
                    <span className="text-sm text-gray-600">75% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">JavaScript Mastery</span>
                    <span className="text-sm text-gray-600">60% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
                    <span className="text-sm text-gray-600">30% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Achievements</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🏆
                  </div>
                  <p className="text-sm font-medium text-gray-800">First Session</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🔥
                  </div>
                  <p className="text-sm font-medium text-gray-800">7 Day Streak</p>
                  <p className="text-xs text-gray-600">Active</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    ⭐
                  </div>
                  <p className="text-sm font-medium text-gray-800">Quick Learner</p>
                  <p className="text-xs text-gray-600">Earned</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-50">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🎯
                  </div>
                  <p className="text-sm font-medium text-gray-800">Goal Crusher</p>
                  <p className="text-xs text-gray-600">Locked</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearnerDashboard;