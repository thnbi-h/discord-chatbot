const {
	VoiceConnectionStatus,
	joinVoiceChannel,
	entersState,
	EndBehaviorType,
	getVoiceConnection,
} = require("@discordjs/voice");
const { pipeline } = require("stream");
const prism = require("prism-media");
const { config } = require("dotenv");
const { Wit, log } = require("node-wit");

const witclient = new Wit({
   accessToken: process.env.WIT_TOKEN,
   logger: new log.Logger(log.DEBUG), // optional
});


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


async function voiceRecognition(VoiceReceiver, interaction, client) {
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

	pipeline(opusStream, prismStream, witStream, (err) => {
		if (err) {
			console.error(err);
		} else {
		}
	});
}

module.exports = {
	name: "recognition",
	description: "ativa a função de reconhecimento de voz do aifbot",
	type: 1,
	run: async (client, interaction, args) => {
		// if (!interaction.member.voice.channel)
		// return interaction.reply("Você precisa estar em um canal de voz para usar este comando!");
		try {
			// connectToChannel(interaction);
			// const connection = getVoiceConnection(interaction.guild.id);
			// const receiver = connection.receiver;

			// receiver.speaking.on("start", () => {
			// voiceRecognition(receiver, interaction, client)});

			// interaction.reply({
			// content: "Escutando ** | 🎙️** ",
			// ephemeral: true,
			// });
			interaction.reply(JSON.stringify((await witclient.message("oi"))));
		} catch (error) {
			console.error(error);
		}
	},
};
