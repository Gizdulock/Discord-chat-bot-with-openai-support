const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('learn')
    .setDescription('Learn about a topic with the AI')
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('Topic to learn about')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
