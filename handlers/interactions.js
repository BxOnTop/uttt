const { Collection } = require('discord.js')
const fs = require('fs')


module.exports = (client, table) => { 
table.addRow(`---------------`, `----------`);
	
	const commandFiles = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));

	client.interactions = new Collection();
	
	for (const file of commandFiles) {
  try {
    const command = require(`../interactions/${file}`);
    client.interactions.set(command.name, command);
    
	table.addRow(`${command.name}`, `🟣 WORKING`);
  } catch (error) {
		console.log(error)
     table.addRow(`${file}`, `🔴 NOT WORKING`);
  }
}

}