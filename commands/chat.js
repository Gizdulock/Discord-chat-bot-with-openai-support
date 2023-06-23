const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../handleCommand.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with the AI')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to send to the AI')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
