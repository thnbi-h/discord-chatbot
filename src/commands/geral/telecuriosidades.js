const fs = require("fs");

module.exports = {
	name: "curiosidade",
	description: "envia uma curiosidade sobre as telecomunicações",
	type: 1,

	async run(client, interaction) {
		fs.readFile("assets/textos/curiosidades.json", "utf-8", (err, data) => {
			if (err) {
				console.error(err);
				return;
			}

			try {
				const curiosidades = JSON.parse(data);
				let randomNum = Math.round(Math.random() * 40 + 1);
				interaction.reply(curiosidades[randomNum] + " **| 🤓**");
			} catch (e) {
				console.error(e);
			}
		});
	},
};
