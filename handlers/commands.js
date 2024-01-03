
const { Collection } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.token;
const { readdirSync } = require('fs');



module.exports = async (client, table) => {
    const commands = [];
    client.commands = new Collection();

        const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
	
  for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if (command.data?.name && command.data?.description) {
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
                table.addRow(`${command.data.name}`, '🟢 Working');
            } else {
                table.addRow(file, '🔴 Not Working');
							continue;
            }
        }
    const rest = new REST({ version: '9' }).setToken(token);
client.once('ready', async (c) => {
    try {
        await rest.put(
            `/applications/${c.user.id}/commands`,
            { body: commands, clientId: c.user.id }
        );

        console.log(`🟢 | Started refreshing ${commands.length} global application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
});
};
