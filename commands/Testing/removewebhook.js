const { SlashCommandBuilder, ChannelType } = require('discord.js');
const noblox = require("noblox.js");
const { EmbedBuilder } = require('discord.js');
const { webhookIds, saveWebhookIdsToFile } = require('./globals');

async function startApp() {
    // ... your code to log in and other operations ...
}

startApp();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removewebhook')
        .setDescription('Remove a channel where webhooks would be sent.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to remove sending webhooks to.')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)),
    async execute(interaction) {
        const channelId = interaction.options.getChannel('channel').id;

        if (!webhookIds.includes(channelId)) {
            const carEmbed = new EmbedBuilder()
                .setColor(0xeb4d42)
                .setTitle(`No webhooks were registered for ${interaction.options.getChannel('channel')}`)
                .setDescription(`To add a new webhook channel, use /addwebhooks.`);

            await interaction.reply({ embeds: [carEmbed], ephemeral: true });
        } else {
            webhookIds.splice(webhookIds.indexOf(channelId), 1);
            saveWebhookIdsToFile();
            console.log(webhookIds)

            const scwEmbed = new EmbedBuilder()
                .setColor(0x79FF77)
                .setTitle(`Successfully deleted webhooks from ${interaction.options.getChannel('channel')}`)
                .setDescription(`To add a new webhook channel, use /addwebhooks.`);

            await interaction.reply({ embeds: [scwEmbed], ephemeral: true });
        }
    },
};