const { createWebhook: discordCreateWebhook } = require('discord.js');

module.exports = (client) => {
  client.on('ready', () => {
    // Access the bot's username using the client instance
    const botUsername = client.user.username;
    const botAvatar = client.user.avatarURL();

    function createWebhook(channelId) {
      discordCreateWebhook({
        name: botUsername,
        avatar: botAvatar,
        channel: channelId,
      })
        .then((webhook) => console.log(`Created webhook ${webhook} AND ${webhook.id}`))
        .catch(console.error);
    }

    // Export the createWebhook function
    module.exports = {
      createWebhook,
    };
  });
};