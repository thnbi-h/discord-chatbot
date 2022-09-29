const { getVoiceConnection } = require("@discordjs/voice");
const { client } = require("discord.js");

async function disconnectFromChannel(interaction) {
	const connection = getVoiceConnection(interaction.guild.id);
	if (connection) {
		connection.destroy();
	}
}

module.exports = {
	name: "leave",
	description: "o bot sai do canal de voz",
	type: 1,

	run: async (client, interaction) => {
		try {
			interaction.reply("até mais!");
			disconnectFromChannel(interaction);
		} catch (error) {
			console.error(error);
		}
	},
};
