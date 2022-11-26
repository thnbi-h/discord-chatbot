const {
	EmbedBuilder,
	ActionRowBuilder,
	SelectMenuBuilder,
	Events,
	ButtonBuilder,
	ComponentType,
	messageLink,
	awaitMessageComponent,
} = require("discord.js");
const { channel } = require("node:diagnostics_channel");
const wait = require("node:timers/promises").setTimeout;

const criar = {
	title: `Criador de Horário 📅`,
	description: `Olá, vou auxiliar você a criar um horário para as suas aulas! 😊\n\nEcolha o dia da semana que você deseja registrar seu horário:`,
	color: 0x008000,
	thumbnail: {
		url: `https://images-ext-2.discordapp.net/external/R_MP8kq4JiKupEHN_1Ihaqr_dwkrlKKz4G0GYHbAwA0/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1019291298458509424/a649d2a8bfaa20f28b4ae6cc3226b37c.webp?width=671&height=671`,
		height: 0,
		width: 0,
	},
};

let horario = {};

const selecionarDia = new ActionRowBuilder().addComponents(
	new SelectMenuBuilder()
		.setCustomId("selecionarDia")
		.setPlaceholder("Escolha o dia da semana")
		.addOptions([
			{
				label: "Segunda-feira",
				value: "Segunda-feira",
			},
			{
				label: "Terça-feira",
				value: "Terça-feira",
			},
			{
				label: "Quarta-feira",
				value: "Quarta-feira",
			},
			{
				label: "Quinta-feira",
				value: "Quinta-feira",
			},
			{
				label: "Sexta-feira",
				value: "Sexta-feira",
			},
		])
);

function escolherDia(interaction) {
	if (interaction.replied || interaction.deferred) {
		interaction.editReply({
			embeds: [criar],
			components: [selecionarDia],
		});
	} else {
		interaction.reply({
			embeds: [criar],
			components: [selecionarDia],
		});
	}
	const collectorDia = interaction.channel.createMessageComponentCollector({
		componentType: ComponentType.SelectMenu,
		time: 60000,
	});

	collectorDia.on("collect", (i) => {
		if (i.customId === "selecionarDia") {
			dia = i.values[0];
			primeira(interaction, dia);
		}
	});
}

function primeira(interaction, dia) {
	const primeiraAula = {
		title: `${dia}`,
		description: `Qual é a sua **primeira** aula na ${dia}?`,
		color: 0x008000,
		footer: {
			text: `(é só enviar no chat)`,
		},
	};
	interaction.editReply({
		embeds: [primeiraAula],
		components: [],
	});

	let collectorPrimeira = interaction.channel.createMessageCollector({
		component: ComponentType.TextInput,
		time: 60000,
	});
	collectorPrimeira.on("collect", (i) => {
		if (i.content) {
			i.delete();
			segunda(interaction, dia);
		}
	});
}

async function segunda(interaction, dia) {
	const segundaAula = {
		title: `${dia}`,
		description: `Qual é a sua **segunda** aula na ${dia}?`,
		color: 0x008000,
		footer: {
			text: `(é só enviar no chat)`,
		},
	};
	interaction.editReply({
		embeds: [segundaAula],
	});
	const collectorSegunda = interaction.channel.createMessageCollector({
		component: ComponentType.TextInput,
		time: 60000,
	});
	collectorSegunda.on("collect", async (i) => {
		if (i.content) {
			const confirmar = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId("confirmar")
						.setLabel("Confirmar")
						.setStyle("Primary")
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("editar")
						.setLabel("Editar")
						.setStyle("Danger")
				);
			interaction.channel
				.send({ components: [confirmar] })
				.then(async (msg) => {
					const collectorConfirmar =
						msg.createMessageComponentCollector({
							componentType: ComponentType.Button,
							time: 60000,
						});
						collectorConfirmar.on("collect", async (i) => {
							msg.delete();
							if (i.customId === "confirmar") {
							escolherDia(interaction);
						} else if (i.customId === "editar") {
							primeira(interaction, dia);
						}
					});
				});
		}
	});
}

module.exports = {
	name: "horario",
	description: "mostra o horario das turmas",
	type: 1,
	options: [
		{
			name: "turma",
			type: 3,
			description: "turma que voce quer ver o horario",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		escolherDia(interaction);
	},
};
