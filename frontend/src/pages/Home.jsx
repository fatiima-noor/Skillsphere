import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const { isAuthenticated, user } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does SkillSphere work?",
      answer: "SkillSphere connects learners with expert mentors for personalized, real-time microlearning sessions. Simply sign up, browse mentors, and start learning!"
    },
    {
      question: "What kind of skills can I learn?",
      answer: "Our platform covers a wide range of skills including programming, design, marketing, languages, music, and many more professional and personal development areas."
    },
    {
      question: "How long are the learning sessions?",
      answer: "Sessions are designed as microlearning experiences, typically ranging from 15 minutes to 2 hours, perfect for busy schedules."
    },
    {
      question: "Can I become a mentor?",
      answer: "Absolutely! If you have expertise in any field, you can apply to become a mentor and share your knowledge with eager learners."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content: "SkillSphere helped me master React in just 2 weeks. The personalized mentoring made all the difference!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Designer",
      content: "The bite-sized learning approach fits perfectly with my busy schedule. I've learned more here than in months of self-study.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "As a mentor on SkillSphere, I love sharing my knowledge and seeing learners grow. The platform makes it so easy!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <main className="flex-grow">
      {isAuthenticated ? (
        // Authenticated User View
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user.username || 'User'}!
          </h1>
          <p className="text-lg mb-6">
            Ready to continue your learning journey? Head to your dashboard to explore opportunities.
          </p>
          <div className="space-x-4">
            <Link
              to={user.role === 'learner' ? '/learner' : user.role === 'mentor' ? '/mentor' : '/admin'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/profile"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              View Profile
            </Link>
          </div>
        </div>
      ) : (
        // Non-authenticated User View with Enhanced UI
        <>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SkillSphere</span>
                  </h1>
                  <p className="text-xl mb-8 text-gray-200">
                    Connect with expert mentors for real-time microlearning. Transform your skills, one session at a time.
                  </p>
                  <div className="space-x-4">
                    <Link 
                      to="/register" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Start Learning
                    </Link>
                    <Link 
                      to="/login" 
                      className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                    >
                      Login
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                    alt="People collaborating and learning together"
                    className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                    Join 10,000+ Learners
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                Why Choose SkillSphere?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Real-Time Learning</h3>
                  <p className="text-gray-600">
                    Connect instantly with mentors for live, interactive learning sessions tailored to your pace and goals.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Expert Mentors</h3>
                  <p className="text-gray-600">
                    Learn from industry professionals and experienced practitioners who are passionate about sharing knowledge.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Microlearning</h3>
                  <p className="text-gray-600">
                    Bite-sized learning sessions that fit into your schedule. Learn effectively without overwhelming your day.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">10,000+</div>
                  <div className="text-blue-200">Active Learners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-200">Expert Mentors</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50,000+</div>
                  <div className="text-blue-200">Sessions Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">4.9/5</div>
                  <div className="text-blue-200">Average Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                What Our Community Says
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    <div className="flex text-yellow-400 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="mb-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-left border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                        <svg 
                          className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {openFaq === index && (
                        <p className="mt-4 text-gray-600 animate-fadeIn">{faq.answer}</p>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of learners who are already transforming their skills with SkillSphere.
              </p>
              <div className="space-x-4">
                <Link 
                  to="/register" 
                  className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Home;