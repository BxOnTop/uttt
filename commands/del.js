//del
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del')
    .setDescription('حذف رسائل')
    .addNumberOption(option => option
      .setName('count')
      .setDescription('عدد الرسائل لحذفها')
      .setRequired(true)
      .setMinValue(1)
    ),
	async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
    if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

  const count = interaction.options.getNumber('count');
try {
interaction.reply({content: 'يتم الحذف...', ephemeral: true})
await interaction.channel.bulkDelete(count)
interaction.editReply(`تم حذف ${count} رسالة.`)
				} catch(error) {
                console.error('حدث خطأ أثناء حذف الرسائل:', error);
                interaction.reply('حدث خطأ أثناء حذف الرسائل.');
            };
  },
};