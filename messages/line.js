//خط

module.exports = {
		name: 'خط',
   async execute(message, client, subscribers, userData, saveSubscribers, saveUserData, loadSubscribers, loadUserData) {
		 message.delete()
		 .then(() => {
			 const channel = message.channel;
			 channel.send({files: ["https://cdn.discordapp.com/attachments/1149446711832490044/1159873783239295057/IMG_20230923_105202_177.jpg"]})
		 });
		},
};