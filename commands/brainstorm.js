const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('brainstorm')
    .setDescription('Brainstorm ideas with the AI')
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('Topic to brainstorm about')
        .setRequired(true)),
  async execute(interaction) {
    await execute(interaction);
  },
};
