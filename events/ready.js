const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const { status, activity } = require('../json/config.json')
const { joinVoiceChannel } = require('@discordjs/voice');
const mongoose = require('mongoose');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
console.log(`Client User + Tag: ${client.user.tag}\n ${client.guilds.cache.size} Servers.`)

	client.user.setStatus(status);

	client.user.setActivity(activity, {
		type: "STREAMING",
		url: `https://www.twitch.tv/${activity}`
	});

	client.channels.fetch("1157454340563419228")
		.then((channel) => {
			const VoiceConnection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator
			});
		}).catch((error) => { return; });
// 	const channel = client.channels.cache.get("1159877365032292495");
// const embed = new MessageEmbed()
// .setTitle("فعل نفسك")
// .setDescription("لتفعيل نفسك اضغط على ( 🟢 )")
// .setColor("RANDOM");
// const actionRow = new MessageActionRow()
// .addComponents(
// 		new MessageButton()
// 				.setCustomId('verify')
// 				.setEmoji('🟢')
// 				.setStyle('SECONDARY')
// );
// channel.send({embeds: [embed], components: [actionRow]})
    }
}