import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import ChatBotLogo from './ChatBotLogo';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your appointment assistant. I can help you with scheduling, rescheduling, cancellations, and any other appointment-related questions. How can I assist you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: 'I understand you need help with appointments. Could you please specify if you\'d like to schedule a new appointment, reschedule an existing one, or check appointment availability?'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 z-50 group"
      >
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full" />
        <ChatBotLogo className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <ChatBotLogo className="w-5 h-5 text-primary dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">AI Appointment Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-4 h-[380px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === 'user' ? 'flex justify-end' : 'flex justify-start items-end space-x-2'
                }`}
              >
                {message.type === 'bot' && (
                  <ChatBotLogo className="w-6 h-6 text-primary dark:text-blue-400 mb-2" />
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default ChatBot; 