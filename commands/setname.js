//setname
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setname')
    .setDescription('تغيير اسم البوت')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('اسم البوت؟')
        .setRequired(true)
    ),
  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
    if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

    const name = interaction.options.getString('name');

    // Change bot name
    await interaction.client.user.setUsername(name);

    await interaction.reply(`Bot name updated to ${name}`);
  },
}