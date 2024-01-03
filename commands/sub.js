const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sub')
		.setDescription('اضافه مشترك')
		.addUserOption(option => option
			.setName('user')
			.setDescription('المستخدم')
			.setRequired(true)
		)
		.addNumberOption(option => option
			.setName('count')
			.setDescription('عدد الروابط')
			.setRequired(true)
			.setMinValue(1)
		),

	async execute(interaction, client, Link, Count) {
		const { user } = interaction;
		const Id = user.username;
		if (Id !== '5a7d' && Id !== 'zb43') {
			return interaction.reply({ content: 'انت ليس ادمن 🔴', ephemeral: true });
		}

		const userId = interaction.options.getUser('user').id;
		const member = await interaction.guild.members.fetch(userId);
		const count = interaction.options.getNumber('count');

		const role = interaction.guild.roles.cache.find((role) => role.name === 'HOSTER');

		if (role) {
			member.roles
				.add(role)
				.then(async () => {
					const linkData = await Link?.findOne({ userId });
					const userUrls = linkData ? linkData.urls : [];

					if (!linkData) {
						const newLink = new Link({ userId, urls: [] });
						await newLink.save();
					}

					const countData = await Count.findOne({ userId });
					const userCount = countData ? countData.count : 0;

					if (!countData) {
						const newCount = new Count({ userId, count: 0 });
						await newCount.save();
					}

					const newCountValue = userCount + count;
					await Count.updateOne({ userId }, { count: newCountValue });

					interaction.reply(`تم تسليم <@${userId}> ${count} رابط / روابط`);
				})
				.catch((error) => {
					console.log(error);
					interaction.reply({ content: 'حدث خطأ أثناء إضافة الرتبة.', ephemeral: true });
				});
		} else {
			interaction.reply({ content: 'لم يتم العثور على الرتبة المحددة.', ephemeral: true });
		}
	},
};