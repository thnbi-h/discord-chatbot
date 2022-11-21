const { config } = require("dotenv");
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Collection } = require("discord.js");


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

client.once("ready", () => {
	console.log("Estou pronto!");
});

["commands", "aliases"].forEach((f) => (client[f] = new Collection()));
["commands", "events"].forEach((f) => require(`./handlers/${f}`)(client));

// faz login no discord usando a token do config.json
client.login(process.env.TOKEN);

