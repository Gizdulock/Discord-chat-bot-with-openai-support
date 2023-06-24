// commands/toggleChat.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('togglechat')
    .setDescription('Toggle the bot to respond without /chat command'),
  async execute(interaction) {
    interaction.client.chatEnabled = !interaction.client.chatEnabled;
    await interaction.reply(`Chat without /chat command is now ${interaction.client.chatEnabled ? 'enabled' : 'disabled'}.`);
  },
};
