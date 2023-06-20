require('dotenv').config();
const { prefix } = require('./config.json');
const { Client, Intents } = require('discord.js');
const { DISCORD_BOT_TOKEN } = process.env;
const { handleCommand } = require('./handleCommand.js');

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

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  handleCommand(message);
});


client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  handleCommand(message);
});

client.login(DISCORD_BOT_TOKEN);

