const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

function sendNotification(message, config) {
  const channel = client.channels.cache.get(config.notificationChannelId);
  if (channel) {
    channel.send(`${message} ${config.notificationRoleId ? `<@&${config.notificationRoleId}>` : ''}`);
  }
}

module.exports = {
  sendNotification
};
