//ban
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs')


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('حظر مستخدم')
    .addUserOption(option => option
      .setName('user')
      .setDescription('المستخدم')
      .setRequired(true)
    ),
	async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
		if (userId !== '5a7d' && userId !== 'zb43')
		return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

        const userToBan = interaction.options.getMember('user');
        if (userToBan) {
           try { 
await interaction.guild.members.ban(userToBan);
interaction.reply(`
تم حظر <@${userToBan.user.id}>
`);
					 } catch (error) {
console.log(error)
              interaction.reply(`
لا يمكنني حظر <@${userToBan.user.id}> بسبب:
${error}
`)
					 }
					}
  },
};