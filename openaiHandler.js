require('dotenv').config();
const axios = require('axios');

async function generateResponse(message) {
  const messages = [
    {
      "role": "system",
      "content": "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly."
    },
    {
      "role": "user",
      "content": message
    }
  ];

  try {
    const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const response = gptResponse.data.choices[0].message.content.trim();
    return response;
  } catch (error) {
    console.error('Error occurred during OpenAI API call:', error);
    throw error;
  }
}

module.exports = {
  generateResponse
};
