//server
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton , MessageEmbed } = require('discord.js');
const fs = require('fs')



module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('معلومات السيرفر'),

	async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {

    const verificationLevels = { NONE: '0', LOW: '1', MEDIUM: '2', HIGH: '3', VERY_HIGH: '4' };
    let on = interaction.guild.presences.cache.filter(e => e.status == 'online').size - 1 || 0;
    let idle = interaction.guild.presences.cache.filter(e => e.status == 'idle').size + 1 || 0;
    let dnd = interaction.guild.presences.cache.filter(e => e.status == 'dnd').size || 0;
    const owner = await interaction.guild.fetchOwner();
    
    var embed = new MessageEmbed()
      .addFields([
        {
          name: `🆔 Server ID: `,
          value: `**${interaction.guild.id}**`
        },
        {
          name: `📅 Created On: `,
          value: `**<t:${parseInt(interaction.guild.createdAt / 1000)}:R>**`
        },
        {
          name: `👑 Owned by: `,
          value: `**${owner}**`
        },
        {
          name: `👥 Members: (**${interaction.guild.memberCount}**)`,
          value: `**${Math.floor(on + idle + dnd)}** **Online \n${interaction.guild.premiumSubscriptionCount} Boosts ✨**`
        },
        {
          name: `💬 Channels: (${interaction.guild.channels.cache.size})`,
          value: `**${interaction.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}** **Text | ${interaction.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size} Voice**`
        },
        {
          name: `🌍 Others: `,
          value: `**Verification Level: ${verificationLevels[interaction.guild.verificationLevel]}**`
        },
        {
          name: `🔐 Roles:`,
          value: `**(${interaction.guild.roles.cache.size})**`
        }
      ])
      .setColor(`RANDOM`)
      .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })});
    interaction.reply({ embeds: [embed] });
  },
}