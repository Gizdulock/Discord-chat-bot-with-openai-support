const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translate a text with the AI')
    .addStringOption(option =>
      option.setName('source_lang')
        .setDescription('Source language')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('target_lang')
        .setDescription('Target language')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Text to translate')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
 
