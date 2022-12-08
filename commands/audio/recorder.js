const { createWriteStream } = require("fs");
const { pipeline } = require("stream");
const { EndBehaviorType, getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const { AttachmentBuilder } = require("discord.js");
const prism = require("prism-media");
const clearGravacoes = require("../../tools/clear");

async function createListeningStream( VoiceReceiver, interaction, client, filename, out) {
	const opusStream = VoiceReceiver.subscribe(interaction.member.id, {
		end: {
			behavior: EndBehaviorType.AfterSilence,
			duration: 500,
		},
	});

	const prismStream = new prism.opus.OggLogicalBitstream({
		opusHead: new prism.opus.OpusHead({
			channelCount: 2,
			sampleRate: 48000,
		}),
		crc: false,
	});
	
	pipeline(opusStream, prismStream, out, (err) => {
		if (err) {
			console.error(err);
		} else if (opusStream.readableEnded) {
			audioResponse(interaction, filename, client);
		}
	});
}

function disconnectFromChannel(interaction) {
	const connection = getVoiceConnection(interaction.guild.id);
	if (connection) {
		connection.destroy();
	}
}

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

function audioResponse(interaction, filename, client) {
	try {
		const attachment = new AttachmentBuilder().setFile(filename);
		const channel = client.channels.cache.get(interaction.channelId);
		channel.send({
			files: [attachment],
			content: `Gravação de **${interaction.member.user.username} | 💁**`,
		});
		disconnectFromChannel(interaction);
		clearGravacoes();
	} catch (err){
		console.error(err);
	} 
}

module.exports = {
	name: "gravar",
	description: "grava sua voz obs: caso o audio seja muito grande, pode ser que o bot não consiga enviar o arquivo.",
	type: 1,

	run: async (client, interaction, args) => {
		try {
			if (!interaction.member.voice.channelId) {
				await interaction.reply({
					content: "Você precisa estar em um canal de voz para usar esse comando! ** | 💁** ",
					ephemeral: true,
				});
			}
			const connection = await connectToChannel(interaction);
			const receiver = connection.receiver;
			const date = Date.now();
			const filename = `./gravacoes/${interaction.member.user.username}-${date}.ogg`;
			const out = createWriteStream(filename);
			
			receiver.speaking.on("start", () => {
				createListeningStream(receiver, interaction, client, filename, out)});

			interaction.reply({
				content: "Gravação iniciada! ** | 🎙️** ",
				ephemeral: true,
			});
		} catch (err) {
			console.warn(err);
			await interaction.reply({ content: "houve algum problema ao iniciar a gravação! ** | 😞** ",});
		}
	},
};
