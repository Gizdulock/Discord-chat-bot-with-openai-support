const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('summarize')
    .setDescription('Summarize a text with the AI')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Text to summarize')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
