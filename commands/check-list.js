const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-list')
		.setDescription('فحص روابط مستخدم')
		.addUserOption(option => option
			.setName('user')
			.setDescription('المستخدم')
			.setRequired(true)
		),
	async execute(interaction, client, Link, Count) {
		const userId = interaction.user.username;
		if (userId !== '5a7d' && userId !== 'zb43') {
			return interaction.reply({ content: 'انت ليس ادمن 🔴', ephemeral: true });
		}

		const user = interaction.options.getUser('user');

		// البحث عن المستخدم في قاعدة البيانات
		const userData = await Link.findOne({ userId: user.id });

		if (!userData || !userData.urls || userData.urls.length === 0) {
			return interaction.reply({ content: 'لا يوجد روابط متاحة لهذا المستخدم', ephemeral: true });
		}

		const embed = new MessageEmbed()
			.setAuthor({name:interaction.user.tag, iconURL: interaction.user.avatarURL()})
			.setTitle('فحص روابط مستخدم')
			.setDescription(`**المستخدم: ${user.username}**`)
			.addFields([{name:'**الحالة:**',value: 'جاري فحص الروابط...'}]);

		const initialReply = await interaction.reply({ embeds: [embed] });

		const fields = [];

		for (const url of userData.urls) {
			let result;
			try {
				result = await axios.get(url);
				fields.push({ name: `**الرابط: ${url}**`, value: '**شغال 🟢**' });
			} catch (error) {
				fields.push({ name: `**الرابط: ${url}**`, value: '**خربان 🔴**' });
			}

			// التحقق مما إذا كانت الرسالة قد تجاوزت الحد الأقصى المسموح به
			if (fields.length >= 25) {
				const embedChunk = new MessageEmbed()
					.setAuthor(interaction.user.tag, interaction.user.avatarURL())
					.setTitle('فحص روابط مستخدم')
					.setDescription(`**المستخدم: ${user.tag}**`)
					.addFields(fields);

				await interaction.followUp({ embeds: [embedChunk] });
				fields.length = 0; // إعادة تعيين المصفوفة للرسالة القادمة
			}
		}

		// إرسال الرسالة النهائية في حالة بقاء حقول غير مرسلة
		if (fields.length > 0) {
			const embedChunk = new MessageEmbed()
				.setAuthor({name:interaction.user.tag, iconURL: interaction.user.avatarURL()})
				.setTitle('فحص روابط مستخدم')
				.setDescription(`**المستخدم: ${user.username}**`)
				.addFields(fields);

			await interaction.followUp({ embeds: [embedChunk] });
		}
		interaction.deleteReply();
	},
};