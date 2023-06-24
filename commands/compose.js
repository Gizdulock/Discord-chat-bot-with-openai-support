const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compose')
    .setDescription('Compose a text with the AI')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Prompt to send to the AI')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
 
