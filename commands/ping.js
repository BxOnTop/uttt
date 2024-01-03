//ping
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('سرعة استجابة البوت'),

  async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
    try {
      await interaction.reply('جارٍ قياس تأخير الروبوت...');
    await interaction.editReply(`تأخير الروبوت هو ${interaction.client.ws.ping} مللي ثانية.`);
    } catch (error) {
      console.error(error);
      await interaction.reply({content: 'حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
    }
  },
}