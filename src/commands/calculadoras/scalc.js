const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "scalc",
	description: "é uma cáculadora simples, só que no discord",
	type: 1,
	options: [
		{
			name: "numero1",
			type: 10,
			description: "primeiro numero",
			required: true,
		},
		{
			name: "numero2",
			type: 10,
			description: "segundo numero",
			required: true,
		},
		{
			name: "operacao",
			type: 3,
			description: "Qual operção você deseja realizar com estes dois números",
			required: true,
			choices: [
				{
					name: "somar",
					value: "+",
				},
				{
					name: "subtrair",
					value: "-",
				},
				{
					name: "multiplicar",
					value: "*",
				},
				{
					name: "dividir",
					value: "/",
				},
			],
		},
	],

	async run(client, interaction) {
		const n1 = interaction.options.getNumber("numero1");
		const n2 = interaction.options.getNumber("numero2");
		const operacao = interaction.options.getString("operacao");
		let resultado;

		if (operacao == "+") {
			resultado = n1 + n2;
		}

		if (operacao == "-") {
			resultado = n1 - n2;
		}

		if (operacao == "*") {
			resultado = n1 * n2;
		}

		if (operacao == "/") {
			resultado = n1 / n2;
		}

		const embed = new EmbedBuilder()
			.setColor("#008000")
			.setTitle("Calculadora")
			.setDescription(`O resultado da operação é: ${resultado} ** | 🧑‍🏫**`);

		interaction.reply({ embeds: [embed] });
	},
};
