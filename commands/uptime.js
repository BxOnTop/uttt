//uptime
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('كم البوت له شغال'),

  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    try {
			const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  await interaction.reply(`البوت شغال له:   ${hours}h ${minutes}m ${seconds}s`)

    } catch (error) {
      console.error(error);
      await interaction.reply({content: 'حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
    }
  },
}