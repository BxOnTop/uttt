const roleId = '1147910823797334086';
const { MessageSelectMenu, MessageActionRow } = require('discord.js');
module.exports = {
	name: 'removeButton',
	async execute(interaction, client, Link, Count) {
		const userId = interaction.user.id;
		const member = await interaction.guild.members.fetch(userId);

		try {
			const countData = await Count.findOne({ userId });

			if (!countData) {
				console.log(`لا يوجد بيانات عداد للمستخدم ${userId}.`);
				return;
			}

			const { count } = countData;

			const linkData = await Link.findOne({ userId });
			const userUrls = linkData ? linkData.urls : [];

			if (member.roles.cache.has(roleId)) {
				if (userUrls.length > 0) {
					const pageSize = 25;
					const totalPages = Math.ceil(userUrls.length / pageSize);

					await interaction.reply({ content: 'اختر الرابط الذي ترغب في حذفه:', ephemeral: true });
					interaction.deleteReply();

					for (let currentPage = 0; currentPage < totalPages; currentPage++) {
						const startIndex = currentPage * pageSize;
						const endIndex = startIndex + pageSize;
						const pageUrls = userUrls.slice(startIndex, endIndex);

						const options = pageUrls.map((url, index) => ({
							label: `${startIndex + index + 1}. ${url}`,
							value: (startIndex + index).toString(),
						}));

						const selectMenu = new MessageSelectMenu()
							.setCustomId('removeUrlSelect')
							.setPlaceholder('اختر الرابط الذي ترغب في حذفه')
							.addOptions(options);

						const actionRow = new MessageActionRow().addComponents(selectMenu);

						await interaction.followUp({ content: 'اختر الرابط الذي ترغب في حذفه:', components: [actionRow], ephemeral: true });
					}
				} else {
					interaction.reply({ content: 'لا يوجد روابط لحذفها.', ephemeral: true });
				}
			} else {
				interaction.reply({ content: 'ليس لديك الرتبة المطلوبة لاستخدام هذا الزر.', ephemeral: true });
			}
		} catch (error) {
			console.log('حدث خطأ في استرداد البيانات.', error);
		}
	},
};