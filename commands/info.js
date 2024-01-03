const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('معلومات مشترك')
		.addUserOption(option => option
			.setName('user')
			.setDescription('المستخدم')
			.setRequired(true)
		),

	async execute(interaction, client, Link, Count) {
		const { user } = interaction;
		const Id = user.username;
		if (Id !== '5a7d' && Id !== 'zb43') {
			return interaction.reply({ content: 'انت ليس ادمن 🔴', ephemeral: true });
		}

		const userId = interaction.options.getUser('user').id;

		const linkData = await Link.findOne({ userId });
		const userUrls = linkData ? linkData.urls : [];

		if (userUrls.length === 0) {
			return interaction.reply(`
المستخدم <@${userId}>

--------------------

ليس مشترك في البوت
		`);
		}

		const countData = await Count.findOne({ userId });
		const count = countData ? countData.count : 0;

		interaction.reply(`
المستخدم <@${userId}>

---------------------

عدد روابطه 「 ${count} 」

---------------------

الروابط في الخاص.
		`);

		if (userUrls.length > 0) {
			const pageSize = 25;
			const totalPages = Math.ceil(userUrls.length / pageSize);

			for (let currentPage = 0; currentPage < totalPages; currentPage++) {
				const startIndex = currentPage * pageSize;
				const endIndex = startIndex + pageSize;
				const pageUrls = userUrls.slice(startIndex, endIndex);

				const formattedUrls = pageUrls.map((url, index) => `${startIndex + index + 1}. ${url}`).join('\n');
				const messageContent = `روابط <@${userId}>\n${formattedUrls}`;

				await interaction.user.send(messageContent); // إرسال الرسالة للمستخدم عبر الخاص
			}
		}
	},
};