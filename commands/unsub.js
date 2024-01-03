const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsub')
		.setDescription('ازاله الاشتراك')
		.addUserOption(option => option
			.setName('user')
			.setDescription('المستخدم')
			.setRequired(true)
		),
	async execute(interaction, client, Link, Count) {
		const { user } = interaction;
		const Id = user.username;
		if (Id !== '5a7d' && Id !== 'zb43')
			return interaction.reply({ content: 'انت ليس ادمن 🔴', ephemeral: true });

		const userId = interaction.options.getUser('user').id;
		const member = await interaction.guild.members.fetch(userId);

		const role = interaction.guild.roles.cache.find((role) => role.name === 'HOSTER');

		if (role) {
			member.roles
				.remove(role)
				.then(async () => {
					const countData = await Count.findOne({ userId });
					if (!countData) {
						interaction.reply({ content: 'الشخص ليس مشترك من قبل.', ephemeral: true });
						return;
					}

					const linkData = await Link.findOne({ userId });

					if (!linkData || !linkData.urls) {
						interaction.reply({ content: 'لم يتم العثور على بيانات الرابط.', ephemeral: true });
						return;
					}

					const urls = linkData.urls;
					await Count.deleteOne({ userId });
					await Link.deleteOne({ userId });

					interaction.reply(`تم إلغاء الاشتراك من <@${userId}>`);
				})
				.catch((error) => {
					console.log(error);
					interaction.reply({ content: 'حدث خطأ أثناء إزالة الرتبة.', ephemeral: true });
				});
		} else {
			interaction.reply({ content: 'لم يتم العثور على الرتبة المحددة.', ephemeral: true });
		}
	},
};