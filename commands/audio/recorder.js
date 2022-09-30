const { createWriteStream } = require("fs");
const { pipeline } = require("stream");
const {
	EndBehaviorType,
	VoiceReceiver,
	getVoiceConnection,
	VoiceConnection,
} = require("@discordjs/voice");
const { User, InteractionCollector } = require("discord.js");
const prism = require("prism-media");

function createListeningStream(VoiceReceiver, interaction) {
	const opusStream = VoiceReceiver.subscribe(interaction.member.id, {
		end: {
			behavior: EndBehaviorType.AfterSilence,
			duration: 1000,
		},
	});

	const prismStream = new prism.opus.OggLogicalBitstream({
		opusHead: new prism.opus.OpusHead({
			channelCount: 2,
			sampleRate: 48000,
		}),
		pageSizeControl: {
			maxPackets: 10,
		},
		crc: false,
	});

	let date = Date.now();
	const filename = `./gravacoes/${date}-${interaction.member.id}.ogg`;
	const out = createWriteStream(filename);
	pipeline(opusStream, prismStream, out, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("Gravação finalizada!");
		}
	});
}

module.exports = {
	name: "record",
	description: "grava sua voz",
	type: 1,

	run: async (client, interaction, args) => {
		try {
			if (!interaction.member.voice.channelId) {
				return interaction.reply({
					content:
						"Você precisa estar em um canal de voz para usar esse comando! ** | 💁** ",
					ephemeral: true,
				});
			}
			const connection = getVoiceConnection(interaction.guild.id);
			const receiver = connection.receiver;
			receiver.speaking.on("start", () => {
				createListeningStream(receiver, interaction);
			});
			await interaction.reply({
				content: "Começando a gravar...",
				ephemeral: true,
			});
		} catch (err) {
			console.warn(err);
			await interaction.reply({
				content: "houve algum problema",
				ephemeral: true,
			});
		}
	},
};
