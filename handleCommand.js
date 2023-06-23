const { SlashCommandBuilder } = require('@discordjs/builders');
const openai = require('openai');
require('dotenv').config();

openai.apiKey = process.env.OPENAI_API_KEY;

async function execute(interaction) {
  const message = interaction.options.getString('message');
  const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nUser: ${message}\nAI:`;

  try {
    console.log('Sending prompt to OpenAI API:', prompt);
    const response = await openai.Completion.create({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 60
    });
    console.log('Received response from OpenAI API:', response);
    await interaction.reply(response.choices[0].text.trim());
  } catch (error) {
    console.error('Error occurred during OpenAI API call:', error);
    await interaction.reply('An error occurred while processing your request. Please try again later.');
  }
};

module.exports = {
  execute,
};
