const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute: handleCommand } = require('../handleCommand.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Starts a chat with the AI.')
    .addStringOption(option => option.setName('message').setDescription('Your message to the AI.').setRequired(true)),
  async execute(interaction) {
    handleCommand(interaction);
  },
};
