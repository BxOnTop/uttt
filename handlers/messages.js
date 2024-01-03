const { Collection } = require('discord.js')
const fs = require('fs')

module.exports = (client, table) => { 
	table.addRow(`---------------`, `----------`);

	const commandFiles = fs.readdirSync('./messages').filter(file => file.endsWith('.js'));

	client.messages = new Collection();
	
	for (const file of commandFiles) {
  try {
    const command = require(`../messages/${file}`);
    client.messages.set(command.name, command);

	table.addRow(`${command.name}`, `🔵 WORKING`);
  } catch (error) {
		console.log(error)
     table.addRow(`${file}`, `🔴 NOT WORKING`);
  }
}
console.log(table.toString());
}