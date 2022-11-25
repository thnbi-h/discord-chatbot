const {
	joinVoiceChannel,
	getVoiceConnection,
	createAudioPlayer,
	createAudioResource,
} = require("@discordjs/voice");
const { join } = require("node:path");
const Transcriber = require("discord-speech-to-text");
const transcriber = new Transcriber(process.env.WIT_TOKEN);

function voiceJoin(interaction) {
	const connection = joinVoiceChannel({
		channelId: interaction.member.voice.channel.id,
		guildId: interaction.guild.id,
		adapterCreator: interaction.guild.voiceAdapterCreator,
		selfDeaf: false,
		selfMute: false,
	});
	return connection;
}

function disconnectFromChannel(interaction) {
	const connection = getVoiceConnection(interaction.guild.id);
	if (connection) {
		connection.destroy();
	}
}

function transcribe(interaction) {
	const connection = voiceJoin(interaction);
	connection.receiver.speaking.on("start", (userId) => {
		transcriber
			.listen(connection.receiver, userId, interaction)
			.then((data) => {
				if (!data.transcript.text) return;
				let text = data.transcript.text.toLowerCase();
				const channel = interaction.client.channels.cache.get(
					interaction.channelId
				);
				if (
					text.includes("desligar") ||
					text.includes("desconectar") ||
					text.includes("tchau") ||
					text.includes("sair")
				) {
					channel.send(
						`**Tchau! ${interaction.member.user.username} | 👋**`
					);
					disconnectFromChannel(interaction);
				} else if (text.includes("oi") || text.includes("olá")) {
					channel.send(`**Olá! 👋**`);
				} else if (text.includes("como vai")) {
					channel.send(`**Estou bem! E você?**`);
				} else if (text.includes("quem é você")) {
					channel.send(
						`**Olá, eu sou conhecido como aifbot, mas pode me chamar como quiser!**`
					);
				} else if (text.includes("toque")) {
					try {
						const player = createAudioPlayer();
						connection.subscribe(player);
						const resource = createAudioResource(
							join(
								__dirname,
								"../../assets/audios/gris-theme.mp3"
							),
							{ inlineVolume: true }
						);
						resource.volume.setVolume(0.8);
						player.play(resource);
						channel.send(`Gris, Pt. 1 · Berlinist ℗ Berlinist / Nomada Studio`);
					} catch (error) {
						console.error(error);
					}
				} else {
					channel.send(`${text}`);
				}
			});
	});
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
		transcribe(interaction);
	},
};
