const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');
const roleId = '1147910823797334086';

module.exports = {
	name: 'add',
	async execute(interaction, client, Link, Count) {
		const userId = interaction.user.id;
		const member = await interaction.guild.members.fetch(userId);
		if (member.roles.cache.has(roleId)) {
		let addurl = new Modal()
			.setCustomId('addsubmit')
			.setTitle("Fast Host")
			.addComponents(
				new TextInputComponent()
					.setCustomId('url')
					.setLabel('الرابط:')
					.setStyle('SHORT')
					.setRequired(true),
			);

		let userId = interaction.user.id;

		// استخدام userId كمعرف للبحث في النموذج Count
		const countData = await Count.findOne({ userId })

			const { count } = countData;

		// استخدام userId كمعرف للبحث في النموذج Link
		const linkData = await Link.findOne({ userId });

		if (!linkData || !linkData.urls) {
			interaction.reply({ content: 'لم يتم العثور على بيانات الرابط', ephemeral: true });
			return;
		}

		const urls = linkData.urls;

		if (urls.length >= count) {
			interaction.reply({ content: `لقد تجاوزت عدد الروابط المسموح به لك (${count})`, ephemeral: true });
			return;
		}

		showModal(addurl, {
			client: client,
			interaction: interaction,
		});
	 } else {
				interaction.reply({ content: 'ليس لديك الرتبة المطلوبة لاستخدام هذا الزر.', ephemeral: true });
		}
	},
};