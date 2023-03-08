module.exports = {
	name: "lei-de-ohm",
	description: "calcula a lei de ohm",
	type: 1,
	options: [
		{
			name: "resistencia",
			description:
				"Informe a resistência em ohms, caso seja o valor que você quer decobrir, coloque 0",
			type: 10,
			required: true,
		},
		{
			name: "corrente",
			type: 10,
			description:
				"Informe a corrente em amperes, caso seja o valor que você quer decobrir, coloque 0",
			required: true,
		},
		{
			name: "tensao",
			type: 10,
			description:
				"Informe o valor em volts, caso seja o valor que você quer decobrir, coloque 0",
			required: true,
		},
	],

	async run(client, interaction) {
		const R = interaction.options.getNumber("resistencia");
		const I = interaction.options.getNumber("corrente");
		const V = interaction.options.getNumber("tensao");

		if (R == 0) {
			const resultado = V / I;
			interaction.reply(`A resistência é ${resultado} ** Ohms ** Ω`);
		} else if (I == 0) {
			const resultado = V / R;
			interaction.reply(`A corrente é ${resultado} ** Amperes 🔌**`);
		} else if (V == 0) {
			const resultado = R * I;
			interaction.reply(`A tensão é ${resultado} ** Volts ⚡**`);
		}
	},
};
