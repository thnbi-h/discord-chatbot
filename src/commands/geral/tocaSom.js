const discord = require("discord.js");
const {
	AudioPlayerStatus,
	createAudioResource,
	VoiceConnectionStatus,
	joinVoiceChannel,
	entersState,
	createAudioPlayer,
	NoSubscriberBehavior,
	StreamType,
} = require("@discordjs/voice");

const player = createAudioPlayer();

function playSong() {
	const resource = createAudioResource(
		"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		{
			inputType: StreamType.Arbitrary,
		},
		{
			metadata: {
				title: "lofi",
			},
		}
	);
	const player = createAudioPlayer({
		behaviors: { noSubscriber: NoSubscriberBehavior.Play },
	});

	player.on("stateChange", (oldState, newState) => {
		if (
			oldState.status === AudioPlayerStatus.Idle &&
			newState.status === AudioPlayerStatus.Playing
		) {
			console.log("Playing audio output on audio player");
		} else if (newState.status === AudioPlayerStatus.Idle) {
			console.log("Playback has stopped. Attempting to restart.");
			player.play(resource);
		}
	});

	player.play(resource);

	player.on(AudioPlayerStatus.Idle, () => {
		connection.destroy();
	});
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

module.exports = {
	name: "tocaom",
	description: "toca um audio",
	type: 1,

	run: async (client, interaction, args) => {
		if (!interaction.member.voice.channel)
			return interaction.reply(
				"Você precisa estar em um canal de voz para usar este comando!"
			);
		else {
			try {
				const connection = await connectToChannel(interaction);
				connection.subscribe(player);
				playSong();
				interaction.reply("lesgo!");
			} catch (error) {
				console.error(error);
			}
		}
	},
};
