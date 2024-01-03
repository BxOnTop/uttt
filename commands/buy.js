//sub
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton , MessageEmbed } = require('discord.js');
const fs = require('fs')



module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('شراء روابط')
    .addNumberOption(option => option
      .setName('count')
      .setDescription('عدد الروابط')
      .setRequired(true)
      .setMinValue(1)
    ),
	async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
  const userId = interaction.user.id;
	const count = interaction.options.getNumber('count');
 let currentCount = subscribers[userId]?.count;
if(!currentCount) currentCount = 0;
const tax = Math.floor(count * 50000 * (20) / (19) + (1))

const embed = new MessageEmbed()
		.setDescription(`C 768569490631688293 ${tax}`)

interaction.reply({content: 'حوله هذا المبلغ 👇👇 فقط داخل التكت <#1149608854255059014>\nㅤ', embeds :[embed]})
  },
};