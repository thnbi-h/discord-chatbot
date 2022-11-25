const {  readdirSync } = require("fs");

let count = 0;
module.exports = (client) => {
	slashCommands = [];
	const load = async (dirs) => {
		const commands = readdirSync(`./commands/${dirs}/`).filter((f) =>
			f.endsWith(".js")
		);
		for (let file of commands) {
			const command = require(`../commands/${dirs}/${file}`);
			client.commands.set(command.name, command);
			slashCommands.push(command);

			console.log(`O comando ${command.name} foi carregado com sucesso!`);
			count++;
		}
	};
	client.on("ready", async () => {
		await client.application.commands.set(slashCommands);
		console.log(`Todos os ${count} comandos carregados!`);
	});
	readdirSync("./commands/").forEach((dirs) => {
		load(dirs);
	});
};
