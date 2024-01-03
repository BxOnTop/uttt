const { readdirSync } = require('node:fs');

module.exports = (client,table,Link,Count) => {
table.addRow(`---------------`, `----------`);

    const eventFiles = readdirSync(`./events`).filter(file => file.endsWith('.js'));
	
    for (const file of eventFiles) {
      const event = require(`../events/${file}`);
      if (event.name) {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client,Link,Count));
        }
        table.addRow(event.name, "🟤 Working");
      } else {
        table.addRow(file, "🔴 Not working");
      }
		}
};