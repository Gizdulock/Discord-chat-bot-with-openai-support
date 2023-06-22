require('dotenv').config();
const { OpenAI } = require('openai');

async function generateResponse(apiKey, prompt) {
  const openai = new OpenAI(apiKey);
  const gptResponse = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 60
  });
  return gptResponse.choices[0].text.trim();
}

module.exports = {
  generateResponse
};
