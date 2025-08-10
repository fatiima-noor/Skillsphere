// src/components/common/Chatbot.jsx
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const dummyBotAnswers = {
  hi: 'Hey there! How can I help you today?',
  hello: 'Hello! What do you want to know?',
  how: 'I’m just a simple chatbot with dummy answers!',
  help: 'Sure! Ask me anything, I will try to help.',
  
  mentor: 'We have several mentors available across various fields. You can check the "Mentors" page for full details!',
  mentors: 'We have several mentors available across various fields. You can check the "Mentors" page for full details!',
  
  slot: 'Mentor slots are flexible and updated regularly. Please visit the bookings section to see available slots.',
  slots: 'Mentor slots are flexible and updated regularly. Please visit the bookings section to see available slots.',
  
  payment: 'We offer multiple payment plans — monthly, quarterly, and yearly. Check the pricing page for more info!',
  plan: 'We offer multiple payment plans — monthly, quarterly, and yearly. Check the pricing page for more info!',
  pricing: 'We offer multiple payment plans — monthly, quarterly, and yearly. Check the pricing page for more info!',
  
  skillsphere: 'Skillsphere is a platform connecting learners with expert mentors for skill development and career growth.',

  default: 'Sorry, I don’t understand that yet. Try asking something else!',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // chat window toggle
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your friendly bot. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: input.trim() };
    setMessages((msgs) => [...msgs, userMsg]);

    // Prepare bot reply (dummy logic)
    const lowerInput = input.toLowerCase();
    let botReply = dummyBotAnswers.default;

    for (const key in dummyBotAnswers) {
      if (lowerInput.includes(key)) {
        botReply = dummyBotAnswers[key];
        break;
      }
    }

    // Add bot message after a short delay for realism
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: botReply }]);
    }, 500);

    setInput('');
  };

  // Handle Enter key press to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat icon button fixed at bottom-right */}
      <button
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
        className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        style={{ width: 56, height: 56 }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-16 right-5 z-50 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col"
          style={{ height: 400 }}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chatbot</h3>
            <button
              onClick={toggleChat}
              aria-label="Close Chatbot"
              className="text-white hover:text-gray-300 font-bold"
            >
              &times;
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex-grow p-3 overflow-y-auto"
            style={{ fontSize: '0.875rem' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t p-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
