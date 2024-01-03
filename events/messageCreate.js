module.exports = {
    name: 'messageCreate',
    async execute(message, client, Link, Count) {
const con = message.content;
let command = client.messages.get(con);

const msg1 = (`to <@!768569490631688293> **`);

const msg2 = (`لـ <@!768569490631688293> ** |:moneybag:`);

if (con.endsWith(msg1) || con.endsWith(msg2)) {

command = client.messages.get('buyUrls');
        }

        try {
            await command.execute(message, client, Link, Count);
        } catch (error) {
            // console.error(error);
            // await interaction.reply({ content: 'حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
            // const channel = client.channels.cache.get('1157271140255944765');
            // channel.send(`error:\n\`\`\`${error}\`\`\``);
        }
    }
};