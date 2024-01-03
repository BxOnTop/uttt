//send
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('ارسال رساله بالبوت')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('الرسالة')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('embed')
                .setDescription('هل تبيه بامبيد ولا لا؟')
                .setRequired(false)),
    async execute(interaction) {
			const { user } = interaction;
			const userId = user.username;
if (userId !== '5a7d' && userId !== 'zb43')
return interaction.reply({content: 'انت ليس ادمن 🔴', ephemeral: true});
        const content = interaction.options.getString('content');
        const sendEmbed = interaction.options.getBoolean('embed') || false;
			interaction.reply({content:'تم ارسال الرسالة', ephemeral: true});
        if (sendEmbed) {
            const embed = new MessageEmbed()
                .setDescription(content)
                .setColor('RANDOM');
            await interaction.channel.send({ embeds: [embed] });
        } else {
            await interaction.channel.send(content);
        }
    },
};