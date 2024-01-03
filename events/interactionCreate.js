module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, Link, Count) {
//Commands
if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true });

            try {
                await command.execute(interaction, client, Link, Count);
            } catch (error) {
                interaction.reply({ content: `Error executing ${interaction.commandName}`, ephemeral: true });
                console.error(error);
            }
        }
//btns & select
if (interaction.isButton() || interaction.isModalSubmit() || interaction.isSelectMenu()) {

	const { customId } = interaction;

	const command = client.interactions.get(customId);

	if
		(!command) {
		interaction.reply({ content: 'ما حصلت الأمر', ephemeral: true })
	} else {
		try {
			await command.execute(interaction, client, Link, Count);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
			const channel = client.channels.cache.get('1157271140255944765')

			channel.send(`error:\n\`\`\`${error}\`\`\``)
		}
		}
}
    }
};