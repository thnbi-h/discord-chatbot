const {
	VoiceConnectionStatus,
	joinVoiceChannel,
	entersState,
	getVoiceConnection,
} = require("@discordjs/voice");
const fs = require("fs");
const Transcriber = require("discord-speech-to-text");
const {
	crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
} = require("libsodium-wrappers");

const transcriber = new Transcriber(process.env.WIT_TOKEN);

function join(interaction) {
	const connection = joinVoiceChannel({
		channelId: interaction.member.voice.channel.id,
		guildId: interaction.guild.id,
		adapterCreator: interaction.guild.voiceAdapterCreator,
		selfDeaf: false,
		selfMute: false,
	});
	connection.receiver.speaking.on("start", (userId) => {
		transcriber
			.listen(connection.receiver, userId, interaction)
			.then((data) => {
				if (!data.transcript.text) return;
				let text = data.transcript.text;
				const channel = interaction.client.channels.cache.get(
					interaction.channelId
				);
				if (text.includes("desligar")) {
					channel.send(`**Tchau! ${interaction.member.user.username} | 👋**`);
					disconnectFromChannel(interaction);
				} else {
					channel.send(text);
				}
			});
	});
}
async function disconnectFromChannel(interaction) {
	const connection = getVoiceConnection(interaction.guild.id);
	if (connection) {
		connection.destroy();
	}
}

module.exports = {
	name: "recognition",
	description: "ativa a função de reconhecimento de voz do aifbot",
	type: 1,
	run: async (client, interaction, args) => {
		interaction.reply({
			content: "Reconhecimento de voz ativado! ** | 🎙️** ",
			ephemeral: true,
		});
		join(interaction);
	},
};
