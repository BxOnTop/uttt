module.exports = {
	name: 'buyUrls',
	async execute(message, client, Link, Count) {
		const con = message.content;
		const id = message.author.id;
		const chid = message.channel.parentId;
		if (id != '282859044593598464') return;
		if (chid != '1147958122627993720') return;

		const numberRegex = /\$(50000|100000|150000|200000|250000|300000|350000|400000|450000|500000|550000|600000|650000|700000|750000|800000|850000|900000|950000|1000000|1050000|1100000|1150000|1200000|1250000)/g;
		const numbers = con.match(numberRegex);

		if (numbers) {
			var money = numbers[0].split('$')[1];
		}

		const count = money / 50000;

		const msg1 = `has transferred \`$${money}\` to <@!768569490631688293> **`;
		const msg2 = `قام بتحويل \`$${money}\` لـ <@!768569490631688293> ** |:moneybag:`;

		let codeRegex;

		if (con.endsWith(msg1)) codeRegex = /\| (.+),/;
		else if (con.endsWith(msg2)) codeRegex = /ـ (.+),/;
		else return;

		const UNT = con.match(codeRegex);

		const UN = UNT ? UNT[1] : null;

		const member = message.guild.members.cache.find(
			(member) => member.user.username === UN
		);

		if (!member) return message.reply('لم يتم العثور على العضو المحدد.');

		const userId = member.user.id;

		const role = message.guild.roles.cache.find(
			(role) => role.id === '1147910823797334086'
		);

		const channel = message.guild.channels.cache.get('1149403605556793395');

		if (!role) return message.reply('لم يتم العثور على الرتبة المحددة.');

		member.roles
			.add(role)
			.then(async () => {
				const linkData = await Link.findOne({ userId });
				const userUrls = linkData ? linkData.urls : [];

				if (!linkData) {
					const newLink = new Link({ userId, urls: [] });
					await newLink.save();
				}

				const countData = await Count.findOne({ userId });
				const userCount = countData ? countData.count : 0;

				if (!countData) {
					const newCount = new Count({ userId, count: 0 });
					await newCount.save();
				}

				const newCountValue = userCount + count;
				await Count.updateOne({ userId }, { count: newCountValue });

				const msg = `تم تسليم <@${userId}> ${count} رابط / روابط`;
				message.reply(msg);
				channel.send(msg);
			})
			.catch((error) => {
				console.log(error);
				message.reply('حدث خطأ أثناء إضافة الرتبة.');
			});
	},
};