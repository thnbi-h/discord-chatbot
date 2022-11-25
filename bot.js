const { config } = require("dotenv");
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");

config();
// cria instancia do cliente
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.on("ready", () => {
	client.user.setActivity('/help', {type: ActivityType.Listening});
	console.log("Estou pronto!");

});

["commands", "aliases"].forEach((f) => (client[f] = new Collection()));
["commands", "events"].forEach((f) => require(`./handlers/${f}`)(client));

// faz login no discord usando a token do config.json
client.login(process.env.TOKEN);
