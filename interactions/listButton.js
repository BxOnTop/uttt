const roleId = '1147910823797334086';

module.exports = {
	name: 'listButton',
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

					await interaction.reply({ content: 'هذه جميع روابطك:', ephemeral: true });
					interaction.deleteReply();

					for (let currentPage = 0; currentPage < totalPages; currentPage++) {
						const startIndex = currentPage * pageSize;
						const endIndex = startIndex + pageSize;
						const pageUrls = userUrls.slice(startIndex, endIndex);

						const formattedUrls = pageUrls.map((url, index) => `${startIndex + index + 1}. ${url}`).join('\n');
						const messageContent = `روابطك:\n${formattedUrls}`;

						await interaction.followUp({ content: messageContent, ephemeral: true });
					}
				} else {
					interaction.reply({ content: 'لا يوجد روابط محفوظة.', ephemeral: true });
				}
			} else {
				interaction.reply({ content: 'ليس لديك الرتبة المطلوبة لاستخدام هذا الزر.', ephemeral: true });
			}
		} catch (error) {
			console.log('حدث خطأ في استرداد البيانات.', error);
		}
	},
};