const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
		name: 'verify',
		async execute(interaction, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {

const role = interaction.guild.roles.cache.find((role) => role.id === '1149372911661097142');

    if (!role) return interaction.reply({content: 'لم يتم العثور على الرتبة المحددة.', ephemeral: true });
			
    const member = interaction.member;
      member.roles
        .add(role)
        .then(() => {
					const embed = new MessageEmbed()
							.setTitle('فعل نفسك')
							.setDescription(`تم تفعيلك`)
							.setColor('RANDOM');

					interaction.reply({ embeds: [embed], ephemeral: true });
				})
				

		},
};