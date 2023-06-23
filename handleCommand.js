const { SlashCommandBuilder } = require('@discordjs/builders');
const { OpenAIApi } = require('openai');
const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

async function execute(interaction) {
  const message = interaction.options.getString('message');
  const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nUser: ${message}\nAI:`;

  try {
    console.log('Sending prompt to OpenAI API:', prompt);
    async function generateResponse(prompt) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
     });
  return response.choices[0].text.trim();
}

    console.log('Received response from OpenAI API:', response);
    await interaction.reply(response.choices[0].text.trim());
  } catch (error) {
    console.error('Error occurred during OpenAI API call:', error);
    await interaction.reply('An error occurred while processing your request. Please try again later.');
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with AI')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to send to AI')
        .setRequired(true)),
  execute
};
