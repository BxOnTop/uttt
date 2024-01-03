//add
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('إضافة رابط'),
  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    const { user } = interaction;
    const userId = user.username;

if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});

const actionRow = new MessageActionRow()
				.addComponents(
        new MessageButton()
          .setLabel('Add')
          .setStyle('PRIMARY')
          .setCustomId('add'),
        new MessageButton()
          .setLabel('Remove')
          .setStyle('DANGER')
          .setCustomId('removeButton'),
        new MessageButton()
          .setLabel('List')
          .setStyle('SECONDARY')
          .setCustomId('listButton')
      );

      await interaction.reply({ content: `
Add - إضافة رابط

Remove - إزالة رابط

List - قائمة الروابط
`, components: [actionRow] });
  },
}