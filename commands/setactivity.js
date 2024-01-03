//setactivity
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../json/config.json')
const fs = require('fs')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setactivity')
    .setDescription('تغيير وصف البوت')
     .addStringOption(option => 
    option.setName('activity')
        .setDescription('الوصف؟')
        .setRequired(true)
),
  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;
		if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

    const activityy = interaction.options.getString('activity');

    // Change bot status
    await client.user.setActivity(activityy, {
  type: "STREAMING",
  url: `https://www.twitch.tv/${activityy}`
});

      config.activity = activityy;
      fs.writeFileSync('./json/config.json', JSON.stringify(config, null, 2));

    await interaction.reply(`Bot activity updated to **${activityy}**`);
  },
}