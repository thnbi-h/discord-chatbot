const {
	VoiceConnectionStatus,
	joinVoiceChannel,
	entersState,
} = require("@discordjs/voice");

async function connectToChannel(interaction) {
	const connection = joinVoiceChannel({
		channelId: interaction.member.voice.channel.id,
		guildId: interaction.guild.id,
		adapterCreator: interaction.guild.voiceAdapterCreator,
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 2_000);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

module.exports = {
	name: "join",
	description: "entra no seu canal de voz",
	type: 1,

	run: async (client, interaction) => {
		if (!interaction.member.voice.channel)
			return interaction.reply(
				"Você precisa estar em um canal de voz para usar este comando!"
			);
		else {
			try {
				connectToChannel(interaction);
				interaction.reply("entrou no canal de voz");
			} catch (error) {
				console.error(error);
			}
		}
	},
};