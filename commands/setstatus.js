//setstatus
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../json/config.json')
const fs = require('fs')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setstatus')
    .setDescription('تغيير حاله البوت')
     .addStringOption(option => 
    option.setName('status')
        .setDescription('الحاله؟')
        .setRequired(true)
        .addChoices(
{name: 'Online', value: 'online'},
{name: 'Idle', value: 'idle'},
{name: 'Do Not Disturb', value: 'dnd'},
{name: 'Invisible', value: 'invisible'}
         )
),
  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
    if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

    const statuss = interaction.options.getString('status');

    // Change bot status
await interaction.client.user.setStatus(statuss);

      config.status = statuss;
      fs.writeFileSync('./json/config.json', JSON.stringify(config, null, 2));

    await interaction.reply(`Bot status updated to **${statuss}**`);
  },
}