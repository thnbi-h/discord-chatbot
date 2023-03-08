const { readdirSync } = require("fs");

module.exports = (client) => {
	const load = (dirs) => {
		const events = readdirSync(`./src/events/${dirs}/`).filter((f) =>
			f.endsWith(".js")
		);
		for (const file of events) {
			const event = require(`../events/${dirs}/${file}`);
			const eventName = file.split(".")[0];
			console.log(`O evento ${eventName} foi carregado com sucesso!`);

			client.on(eventName, event.bind(null, client));
		}
	};

	readdirSync("./src/events/").forEach((dirs) => {
		load(dirs);
	});
};
