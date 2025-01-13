import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const fetchMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chatbot/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, { message });
    return response.data.response; 
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
