module.exports = {
	name: 'addsubmit',
	async execute(interaction, client, Link, Count) {
		const userId = interaction.user.id;

		try {
			const countData = await Count.findOne({ userId });

			if (!countData) {
				console.log(`لا يوجد بيانات عداد للمستخدم ${userId}.`);
				return;
			}

			const { count } = countData;

			const linkData = await Link.findOne({ userId });
			const urls = linkData ? linkData.urls : [];

			const url = interaction.fields.getTextInputValue('url')

			if (!urls.includes(url)) {
				if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
					urls.push(url);
					await Link.updateOne({ userId }, { urls });
					interaction.reply({ content: `تم حفظ الرابط: \`${url}\``, ephemeral: true });
				} else {
					interaction.reply({ content: `\`${url}\` ليس برابط`, ephemeral: true });
				}
			} else {
				interaction.reply({ content: `\`${url}\` موجود بالفعل`, ephemeral: true });
			}
		} catch (error) {
			console.log('حدث خطأ في استرداد البيانات.', error);
		}
	},
};