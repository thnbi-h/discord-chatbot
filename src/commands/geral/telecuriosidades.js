const discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "telecuriosidades",
	description: "envia uma curiosidade sobre as telecomunicações",
	type: 1,

	run: async (client, interaction, args) => {
		fs.readFile("assets/textos/curiosidades.json", "utf-8", (err, data) => {
			if (err) {
				console.error(err);
				return;
			}

			try {
				const curiosidades = JSON.parse(data);
				randomNum = Math.round(Math.random() * 40 + 1);
				interaction.reply(curiosidades[randomNum] + " **| 🤓**");
			} catch (e) {
				console.error(e);
			}
		});
	},
};
