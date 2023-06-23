const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const quotaHandler = require('./quotaHandler');
const openai = require('openai');
const { generateResponse } = require('./openaiHandler');


openai.apiKey = process.env.OPENAI_API_KEY;

function handleCommand(interaction) {
  const commandName = interaction.commandName;

  const command = commands.find(cmd => cmd.data.name === commandName);

  if (!command) return;

  command.execute(interaction);
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
      const response = await openai.Completion.create({
        engine: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 60
      });

      const messages = response.choices[0].text.trim().split(/\n|\r/);
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
