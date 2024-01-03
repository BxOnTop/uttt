const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
		name: 'closeB',
		async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
const channel = interaction.channel;

try {
channel.delete();
} catch (error) {
console.log(error)
channel.send('لا يمكنني حذف التيكت')
}
},
}