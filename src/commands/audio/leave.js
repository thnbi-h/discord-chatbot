const { getVoiceConnection } = require("@discordjs/voice");

function disconnectFromChannel(interaction) {
	const connection = getVoiceConnection(interaction.guild.id);
	if (connection) {
		connection.destroy();
	}
}

module.exports = {
	name: "sair",
	description: "o bot sai do canal de voz",
	type: 1,

	async run(args, interaction) {
		try {
			interaction.reply("até mais!");
			disconnectFromChannel(interaction);
		} catch (error) {
			console.error(error);
		}
	},
};
