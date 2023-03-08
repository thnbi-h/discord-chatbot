const horarios = require("../../models/Horario.js");

module.exports = {
	name: "horario",
	description: "Mostra o horário do usuário",
	type: 1,
	async run(client, interaction) {
		const { id } = interaction.user;
		const horario = await horarios.findOne({ idUser: id });
		if (!horario) {
			return interaction.reply("Você não tem um horário criado");
		}

		const horarioEmbed = {
			title: "📅 Horário de aulas: ",
			description: `\n**Segunda-Feira** ☀️\n\n13:30 ${horario["Segunda-feira"].primeira}\n\n15:40 ${horario["Segunda-feira"].segunda}\n\n**Terça-Feira** 🌸\n\n13:30 ${horario["Terça-feira"].primeira}\n\n15:40 ${horario["Terça-feira"].segunda}\n\n**Quarta-Feira** 🤗\n\n13:30 ${horario["Quarta-feira"].primeira}\n\n15:40 ${horario["Quarta-feira"].segunda}\n\n**Quinta-Feira** 🌈\n\n13:30 ${horario["Quinta-feira"].primeira}\n\n15:40 ${horario["Quinta-feira"].segunda}\n\n**Sexta-Feira** 🥳\n\n13:30 ${horario["Sexta-feira"].primeira}\n\n15:40 ${horario["Sexta-feira"].segunda} \n\n`,
			color: 0x008000,
			footer: {
				text: "Caso deseje editar use o comando criar novamente",
			},
		};
		interaction.reply({ embeds: [horarioEmbed] });
	},
};
