require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateResponse(message) {
  const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nUser: ${message}\nAI:`;

  try {
    const gptResponse = await openai.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.7,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });

    const response = gptResponse.data.choices[0].text.trim();
    return response;
  } catch (error) {
    console.error('Error occurred during OpenAI API call:', error);
    throw error;
  }
}

module.exports = {
  generateResponse
};
