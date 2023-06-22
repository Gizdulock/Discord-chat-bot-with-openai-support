require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { generateResponse } = require('./openaiHandler');

function handleCommand(message, prefix) {
  const commandName = message.content.slice(prefix.length).trim().split(/ +/)[0];

  const command = commands.find(cmd => cmd.data.name === commandName);

  if (!command) return;

  command.execute(message);
}


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
      await interaction.reply('Available commands: /quota, /status, /help, /chat');
    }
  },
  {
    data: new SlashCommandBuilder().setName('chat').setDescription('Start a conversation with ChatGPT.'),
    async execute(interaction = new CommandInteraction()) {
      const prompt = interaction.options.getString('message');
      const response = await generateResponse(process.env.OPENAI_API_KEY, prompt);

      const messages = response.split(/\n|\r/);
      for (const message of messages) {
        await interaction.reply(message);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  }
];

module.exports = {
  handleCommand,
};
