const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
		name: 'ticketB',
		async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
				const categoryID = '1147958122627993720';
				const category = interaction.guild.channels.cache.get(categoryID);
				const name = interaction.user.username;
			const id = interaction.user.id;
				// التحقق مما إذا كان هناك روم بنفسل اسم المستخدم
				const existingChannel = category.children.find(channel => channel.name === name);
				if (existingChannel) {
						interaction.reply({content: `انت بالفعل لديك تيكت ${existingChannel}`, ephemeral: true});
						return;
				}

				const channel = await interaction.guild.channels.create(name, {
						type: 'text',
						parent: category,
						permissionOverwrites: [
								{
										id: interaction.user.id,
										allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
								},
								{
										id: interaction.guild.roles.everyone,
										deny: ['VIEW_CHANNEL']
								}
						]
				});

				const embed = new MessageEmbed()
						.setTitle('إنشاء تيكت')
						.setDescription(`تم انشاء التيكت ${channel}`)
						.setColor('RANDOM');


const actionRow = new MessageActionRow()
				.addComponents(
        new MessageButton()
          .setEmoji(`🔴`)
          .setStyle('SECONDARY')
          .setCustomId('closeB'),
      );

			const embed2 = new MessageEmbed()
						.setTitle(`اهلا <@${id}>`)
						.setDescription(`
اضغط على ( 🔴 ) لإغلاق التيكت

التسليم تلقائي

اذا ما تعرف كيف توجه هنا <#1162260206344999012>
	 `)
						.setColor('RANDOM');
			
// إرسال رسالة الترحيب وزر إغلاق التذكرة
channel.send({content:`<@${id}>`,embeds: [embed2], components: [actionRow] });

				interaction.reply({ embeds: [embed], ephemeral: true });

		},
};