const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

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

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true
}
});

client.login(process.env.DISCORD_BOT_TOKEN);
