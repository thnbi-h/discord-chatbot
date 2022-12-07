const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const horarios = require("../../models/Horario.js");

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

const horario = {
	idUser: "",
	"Segunda-feira": {
		primeira: "",
		segunda: "",
	},
	"Terça-feira": {
		primeira: "",
		segunda: "",
	},
	"Quarta-feira": {
		primeira: "",
		segunda: "",
	},
	"Quinta-feira": {
		primeira: "",
		segunda: "",
	},
	"Sexta-feira": {
		primeira: "",
		segunda: "",
	},
};

async function criarHorario(interaction, client) {
	horario.idUser = interaction.user.id;
	const channel = interaction.channel;
	const dias = Object.keys(horario);
	const diasPreenchidos = dias.filter(
		(dia) => horario[dia].primeira !== "" && horario[dia].segunda !== ""
	);

	if (diasPreenchidos.length === dias.length) {
		channel.send({ content: "Horário registrado com sucesso!" });
		channel.messages.fetch({ limit: 8 }).then((messages) => {
			messages = messages.filter(
				(message) => message.author.id === client.user.id
			);
			channel.bulkDelete(messages);
			horarios.findOne({ idUser: horario.idUser }, (err, horarioDB) => {
				if (err) return console.error(err);
				if (horarioDB) {
					horarios.findOneAndUpdate(
						{ idUser: horario.idUser },
						{ $set: horario },
						(err, horarioDB) => {
							if (err) return console.error(err);
						}
					);
				} else {
					horarios.create(horario);
				}
			});
		});

		const horarioEmbed = {
			title: `📅 Horário de aulas: `,
			description: `\n**Segunda-Feira** ☀️\n\n13:30 ${horario["Segunda-feira"].primeira}\n\n15:40 ${horario["Segunda-feira"].segunda}\n\n**Terça-Feira** 🌸\n\n13:30 ${horario["Terça-feira"].primeira}\n\n15:40 ${horario["Terça-feira"].segunda}\n\n**Quarta-Feira** 🤗\n\n13:30 ${horario["Quarta-feira"].primeira}\n\n15:40 ${horario["Quarta-feira"].segunda}\n\n**Quinta-Feira** 🌈\n\n13:30 ${horario["Quinta-feira"].primeira}\n\n15:40 ${horario["Quinta-feira"].segunda}\n\n**Sexta-Feira** 🥳\n\n13:30 ${horario["Sexta-feira"].primeira}\n\n15:40 ${horario["Sexta-feira"].segunda} \n\n`,
			color: 0x008000,
			footer: {
				text: `Quando você quiser visualizar seu horário novamente, basta digitar o comando /horario`,
			},
		};

		channel.send({ embeds: [horarioEmbed] });
		return;
	}

	channel
		.send({ embeds: [criar], components: [selecionarDia] })
		.then(async (msg) => {
			const filter = (i) => i.customId === "selecionarDia";
			const collector = msg.createMessageComponentCollector({
				filter,
				time: 60000,
			});

			collector.on("collect", async (i) => {
				const dia = i.values[0];
				await i.deferUpdate();

				const primeiraAula = {
					title: `${dia}`,
					description: `Qual é a sua **primeira** aula na ${dia}?`,
					color: 0x008000,
					footer: {
						text: `(é só enviar no chat)`,
					},
				};

				const segundaAula = {
					title: `${dia}`,
					description: `Qual é a sua **segunda** aula na ${dia}?`,
					color: 0x008000,
					footer: {
						text: `(é só enviar no chat)`,
					},
				};

				await i.editReply({
					embeds: [primeiraAula],
					components: [],
					fetchReply: true,
				});

				const filter = (m) => m.author.id === interaction.user.id;
				let collector = channel.createMessageCollector({
					filter,
					max: 1,
					time: 60000,
				});

				collector.on("collect", async (m) => {
					const primeiraAula = m.content;
					horario[dia].primeira = primeiraAula;
					await m.delete();
					await i.editReply({
						embeds: [segundaAula],
						components: [],
					});
				});

				collector.on("end", async () => {
					collector = channel.createMessageCollector({
						filter,
						max: 1,
						time: 60000,
					});

					collector.on("collect", async (m) => {
						const segundaAula = m.content;
						horario[dia].segunda = segundaAula;
						const horarioDoDia = {
							title: `${dia}`,
							description: `13:30: ${horario[dia].primeira}\n15:30: ${horario[dia].segunda}`,
							color: 0x008000,
						};

						await m.delete();

						await i.editReply({
							embeds: [horarioDoDia],
						});

						criarHorario(interaction, client);
					});
				});
			});
		});
}
module.exports = {
	name: "criar",
	description: "Crie seu horário de aulas",
	type: 1,
	run: async (client, interaction, args) => {
		await criarHorario(interaction, client);
	},
};
