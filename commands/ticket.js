//add
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('انشاء رساله فيها زر تيكت'),
  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
    if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});
		
      const actionRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setEmoji(`🔵`)
          .setStyle('SECONDARY')
          .setCustomId('ticketB'),
      );
const embed = new MessageEmbed()
.setTitle('شراء استضافة بوتات (UpTime)')
.setDescription(`
ㅤ
اضغط على ( 🔵 ) لإنشاء تيكت

شوف <#1162260206344999012> قبل انشاء التيكت
`)
.setColor('RANDOM');
      await interaction.reply({ embeds: [embed], components: [actionRow] });
  },
}