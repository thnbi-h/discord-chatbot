const { config } = require("dotenv");
const {
	Client,
	GatewayIntentBits,
	Collection,
	ActivityType,
} = require("discord.js");
config();
const db = require("./handlers/db.js");

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
	client.user.setActivity("/help", { type: ActivityType.Listening });
	console.log("Estou pronto!");
});

["commands", "aliases"].forEach((f) => (client[f] = new Collection()));
["commands", "events"].forEach((f) => require(`./handlers/${f}`)(client));

client.login(process.env.TOKEN);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB");
});
