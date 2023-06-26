const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const { createWebhook } = require('../../webhooks');
const { webhookIds, saveWebhookIdsToFile } = require('./globals');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addwebhook')
    .setDescription('Add a webhook to send promotion/demotion logs.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to send the webhooks into.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
  async execute(interaction) {
    if (webhookIds.includes(interaction.options.getChannel('channel').id)) {
      const carEmbed = new EmbedBuilder()
        .setColor(0xeb4d42)
        .setTitle('There is a webhook already registered to this channel')
        .setDescription('To remove a pre-existing webhook, use /removewebhooks.');

      await interaction.reply({ embeds: [carEmbed], ephemeral: true });
    } else {
      const scwEmbed = new EmbedBuilder()
        .setColor(0x79FF77)
        .setTitle('Successfully created webhook')
        .setDescription(`Webhooks will now send in ${interaction.options.getChannel('channel')}.`);

      await interaction.reply({ embeds: [scwEmbed], ephemeral: true });

      webhookIds.push(interaction.options.getChannel('channel').id);
      saveWebhookIdsToFile();

      // Call createWebhook when the client is ready
      interaction.client.once('ready', () => {
        createWebhook(interaction.options.getChannel('channel').id);
      });

      console.log(webhookIds);
    }
  },
};