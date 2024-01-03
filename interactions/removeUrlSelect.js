module.exports = {
	name: 'removeUrlSelect',
	async execute(interaction, client, Link, Count) {
		const userId = interaction.user.id;
		const urlIndex = parseInt(interaction.values[0]);

		try {
			const linkData = await Link.findOne({ userId });
			const userUrls = linkData ? linkData.urls : [];

			if (userUrls && userUrls[urlIndex]) {
				const removedUrl = userUrls.splice(urlIndex, 1)[0];
				await linkData.save();
				interaction.reply({ content: `تم حذف الرابط: \`${removedUrl}\``, ephemeral: true });
			} else {
				interaction.reply({ content: 'حدث خطأ أثناء حذف الرابط.', ephemeral: true });
			}
		} catch (error) {
			console.log('حدث خطأ أثناء حذف الرابط.', error);
			interaction.reply({ content: 'حدث خطأ أثناء حذف الرابط.', ephemeral: true });
		}
	},
};