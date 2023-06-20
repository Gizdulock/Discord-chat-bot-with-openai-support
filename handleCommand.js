const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const quotaHandler = require('./quotaHandler');

const commands = [
  {
    data: new SlashCommandBuilder().setName('quota').setDescription('Display current API quota usage.'),
    async execute(interaction = new CommandInteraction()) {
      const quota = await quotaHandler.getQuota();
      await interaction.reply(`Current API quota usage: ${quota}`);
    }
  },
  {
    data: new SlashCommandBuilder().setName('status').setDescription('Display bot status.'),
    async execute(interaction = new CommandInteraction()) {
      await interaction.reply('Bot is online.');
    }
  },
  {
    data: new SlashCommandBuilder().setName('help').setDescription('Display list of commands.'),
    async execute(interaction = new CommandInteraction()) {
      await interaction.reply('Available commands: /quota, /status, /help');
    }
  }
];

module.exports = commands;
