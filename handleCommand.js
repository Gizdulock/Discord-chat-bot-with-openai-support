require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { generateResponse } = require('./openaiHandler');

async function execute(interaction) {
  const message = interaction.options.getString('message');
  const response = await generateResponse(message);

  try {
    await interaction.reply(response);
  } catch (error) {
    console.error('Error occurred during interaction reply:', error);
  }
}

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
