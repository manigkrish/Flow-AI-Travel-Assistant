import axios from 'axios';

// Replace with your OpenAI API key 
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
});

export const generateChatResponse = async (messages) => {
  try {
    // Format messages for OpenAI API
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
    
    const response = await api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI travel assistant named Flow. Help users plan their trips with suggestions for places to visit, accommodations, and activities.'
        },
        ...formattedMessages
      ],
      temperature: 0.7
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response');
  }
};

export const summarizeConversation = async (messages) => {
  try {
    const conversationText = messages
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Flow'}: ${msg.content}`)
      .join('\n');
    
    const response = await api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Summarize the following conversation in a short, concise title (maximum 8 words):'
        },
        {
          role: 'user',
          content: conversationText
        }
      ],
      temperature: 0.7,
      max_tokens: 30
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error summarizing conversation:', error);
    return 'New conversation';
  }
};

export default api;
