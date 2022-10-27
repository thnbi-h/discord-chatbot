const {
	VoiceConnectionStatus,
	joinVoiceChannel,
	entersState,
	EndBehaviorType,
	getVoiceConnection,
} = require("@discordjs/voice");
const { pipeline } = require("stream");
const prism = require("prism-media");
const { createWriteStream, readFileSync } = require("fs");

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

async function voiceRecognition(
	VoiceReceiver,
	interaction,
	client,
	filename,
	out
) {
	// cria uma stream de audio do canal de voz
	const opusStream = VoiceReceiver.subscribe(interaction.member.id, {
		end: {
			behavior: EndBehaviorType.AfterSilence,
			duration: 500,
		},
	});

	// modula a stream
	const prismStream = new prism.opus.OggLogicalBitstream({
		opusHead: new prism.opus.OpusHead({
			channelCount: 1,
			sampleRate: 8000,
		}),
		crc: false,
	});

	pipeline(opusStream, prismStream, out, (err) => {
		if (err) {
			console.error(err);
		} else if (opusStream.readableEnded) {
			sendAudioToWitAi(filename, client, interaction);
		}
	});
}

async function sendAudioToWitAi(filename, client, interaction) {
	const { Wit } = require("node-wit");
	const clientWit = new Wit({
		accessToken: process.env.WITAI_TOKEN,
	});

	const audio = readFileSync(filename);
	const response = await clientWit.message(audio, {});

	const channel = client.channels.cache.get(interaction.channelId);
	channel.send({ content: `${response.text}` });
}

module.exports = {
	name: "recognition",
	description: "ativa a função de reconhecimento de voz do aifbot",
	type: 1,
	run: async (client, interaction, args) => {
		if (!interaction.member.voice.channel)
			return interaction.reply(
				"Você precisa estar em um canal de voz para usar este comando!"
			);
		try {
			connectToChannel(interaction);
			const connection = getVoiceConnection(interaction.guild.id);
			const receiver = connection.receiver;

			let date = Date.now();
			const filename = `./gravacoes/${interaction.member.user.username}-${date}.ogg`;
			const out = createWriteStream(filename);

			receiver.speaking.on("start", () => {
				voiceRecognition(receiver, interaction, client, filename, out);
			});

			interaction.reply({
				content: "Escutando ** | 🎙️** ",
				ephemeral: true,
			});
		} catch (error) {
			console.error(error);
		}
	},
};
