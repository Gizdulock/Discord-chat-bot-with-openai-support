const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { handleCommand } = require('./commands/handleCommand.js');

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  handleCommand(message);
});

client.login(token);
