//sub
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton , MessageEmbed } = require('discord.js');
const fs = require('fs')
const axios = require('axios')


module.exports = {
  data: new SlashCommandBuilder()
    .setName('check')
    .setDescription('فحص الرابط')
    .addStringOption(option => option
      .setName('url')
      .setDescription('الروابط')
      .setRequired(true)
    ),
	async execute(interaction, client, Link, Count) {
  const userId = interaction.user.username;
		
		if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});
	const url = interaction.options.getString('url');
		const embed = new MessageEmbed()
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
		.setTitle('فحص الرابط')
		.setDescription(`**الرابط : ${url}**`);
await axios.get(url).catch(()=>{null})
await axios.get(url)
			.then(() => {
       embed
				 .addFields([
				{
				name: `**الحاله:** `,
				value: `**شغال 🟢**`
									}
       ])
			})
			.catch(() => {
				embed
				.addFields([
					{
					name: `**الحاله:** `,
					value: `**خربان 🔴**`
										}
				 ])
			})
		interaction.reply({ embeds: [embed] });
	
  },
};