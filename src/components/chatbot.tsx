import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMessages, sendMessage } from '../service/chatService';
import '../styles/chatbot.css';
import robotIcon from './robot-icon.svg';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);

  const { data: fetchedMessages, isLoading: isMessagesLoading, error: fetchError } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    enabled: isOpen, 
  });

  const { mutate: sendChatMessage, status: messageStatus } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (botResponse) => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'bot', text: botResponse },
      ]);
      setInput('');
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    },
  });

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: 'user', text: input.trim() }]);
      sendChatMessage(input.trim());
      setInput(''); // Clear input after sending
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Please enter a message.' },
      ]);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-toggle" onClick={toggleChat}>
        <img src={robotIcon} alt="Chat" className="chat-icon" />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with Us</h4>
            <button onClick={toggleChat}>&times;</button>
          </div>

          <div className="chat-body">
            {isMessagesLoading && <div className="loading">Loading conversation...</div>}
            {fetchError && <div className="error">Failed to load messages. Please try again.</div>}

            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {/* Correcting the status check to 'pending' instead of 'loading' */}
            {messageStatus === 'pending' && <div className="loading">Loading response...</div>}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Allow 'Enter' to send messages
              disabled={messageStatus === 'pending'} // Disable input during pending status
            />
            <button onClick={handleSend} disabled={messageStatus === 'pending'}>
              {messageStatus === 'pending' ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
