const discord = require("discord.js");

module.exports = {
	name: "tra",
	description: "calcula o trafego telefonico de um usuario",
	type: 1,
	options: [
		{
			name: "trafego",
			description:
				"Informe o valor do trafego, caso seja o valor que você quer decobrir, coloque 0",
			type: 10,
			required: true,
		},
		{
			name: "periodo",
			description:
				"Informe o tempo de amostragem em minutos, caso seja o valor que você quer decobrir, coloque 0",
			type: 10,
			required: true,
		},
		{
			name: "chamadas",
			description:
				"Informe o numero de chamadas no tempo, caso seja o valor que você quer decobrir, coloque 0",
			type: 10,
			required: true,
		},
		{
			name: "tmedio",
			description:
				"Informe o tempo medio de chamada em minutos, caso seja o valor que você quer decobrir, coloque 0",
			type: 10,
			required: true,
		},
	],

	run: async (client, interaction, args) => {
		const trafego = interaction.options.getNumber("au");
		const periodo = interaction.options.getNumber("periodo");
		const chamadas = interaction.options.getNumber("chamadas");
		const tmedio = interaction.options.getNumber("tmedio");

		if (trafego == 0) {
			const resultado = (chamadas * tmedio) / periodo;
			interaction.reply(`O trafego é ${resultado} ** Erlangs **`);
		} else if (periodo == 0) {
			const resultado = (chamadas / trafego) * tmedio;
			interaction.reply(
				`O tempo de amostragem é ${resultado} ** minutos **`
			);
		} else if (chamadas == 0) {
			const resultado = (trafego / tmedio) * periodo;
			interaction.reply(
				`O numero de chamadas é ${resultado} ** chamadas **`
			);
		} else if (tmedio == 0) {
			const resultado = (periodo / chamadas) * chamadas;
			interaction.reply(
				`O tempo medio de chamada é ${resultado} ** minutos **`
			);
		}
	},
};
