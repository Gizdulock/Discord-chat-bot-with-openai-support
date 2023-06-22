require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { DISCORD_BOT_TOKEN, CLIENT_ID } = process.env;
const { handleCommand } = require('./handleCommand.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guildId, prefix } = require('./config.json');
const { loadConfig } = require('./configHandler.js');
const openai = require('openai');

const config = loadConfig();
openai.apiKey = process.env.OPENAI_API_KEY;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;

  handleCommand(interaction);
});

client.once('ready', async () => {
  console.log('A bot elindult.');

  const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);

  (async () => {
    try {
      console.log('Az alkalmazás (/) parancsok frissítése elkezdődött.');

      const commands = [
        {
          name: 'quota',
          description: 'Display current API quota usage.'
        },
        {
          name: 'status',
          description: 'Display bot status.'
        },
        {
          name: 'help',
          description: 'Display list of commands.'
        },
        {
          name: 'chat',
          description: 'Start a conversation with ChatGPT.'
        }
      ];

      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands },
      );

      console.log('Az alkalmazás (/) parancsok sikeresen frissítve lettek.');
    } catch (error) {
      console.error(error);
    }
  })();
});

client.login(DISCORD_BOT_TOKEN);
