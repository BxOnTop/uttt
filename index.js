const axios = require('axios')
const fs = require('fs')
const Discord = require("discord.js")
const ascii = require('ascii-table')
const { startServer } = require('./web/web.js')
const client = new Discord.Client({ intents: 34373 })
const mongoose = require('mongoose')
const table = new ascii("ALL").setJustify();
//table.setHeading('name', 'status')
/////////////////////////////////
let Link;
let Count;
(async () => {
	const databaseURL = process.env.mdb;

	// تأسيس اتصال MongoDB
	await mongoose.connect(databaseURL)
		.then(() => {
			console.log("🟢 | mongodb");
		})
		.catch(() => {
			console.log(`🔴 | mongodb`);
		});

	// تعريف نموذج الرابط
	const LinkSchema = new mongoose.Schema({
		userId: String,
		urls: [String]
	});

	const CountSchema = new mongoose.Schema({
		userId: String,
		count: Number
	});

	Link = mongoose.model('Link', LinkSchema); // تعديل هنا
 Count = mongoose.model('Count', CountSchema);

	// استدعاء وتنفيذ الملفات في المجلد "handlers"
	const { readdirSync } = require("node:fs");
	readdirSync("./handlers").forEach((handler) => {
		require(`./handlers/${handler}`)(client, table, Link, Count);
	});
	client.login(process.env.token);
	startServer();
})();




/////////////////////////////////

const checkUrls = async () => {
	try {
		const users = await Link.find({});
		const allUrls = users.flatMap(user => user.urls);

		if (Array.isArray(allUrls)) {
			const requests = allUrls.map(async url => {
				try {
					const response = await axios.get(url);
					//console.log(`تمت الاستجابة بنجاح من ${url}`);
					//console.log(response.data);
				} catch (error) {
				//	console.log(`حدث خطأ أثناء الاستجابة من ${url}`);
					//console.log(error);
				}
			});

			await Promise.all(requests);
		} else {
			// معالجة خطأ البيانات غير الصالحة هنا
		}
	} catch (error) {
		// معالجة الأخطاء هنا
	}
};

setInterval(checkUrls, 15000);
//============ [ERRORS] ============\\
process.on('uncaughtException', (error) => {
	console.log(error);

});

process.on('unhandledRejection', (error) => {
	console.log(error);

});

process.on('rejectionHandled', (error) => {
	console.log(error);

});
//============ [ERRORS] ============\\