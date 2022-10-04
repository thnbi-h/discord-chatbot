const discord = require("discord.js");

module.exports = {
	name: "trafegoTelefonico",
	description: "calcula o trafego telefonico de um usuario",
	type: 1,
      options: [
         {
            name: "Au",
            description: "Informe o valor do trafego, caso seja o valor que você quer decobrir, coloque 0",
            type: 10,
            required: true,
         },
         {
            name: "tempo-de-amostragem",
            description: "Informe o tempo de amostragem em segundos, caso seja o valor que você quer decobrir, coloque 0",
            type: 10,
            required: true,
         },
         {
            name: "numero-de-chamadas",
            description: "Informe o numero de chamadas no tempo, caso seja o valor que você quer decobrir, coloque 0",
            type: 10,
            required: true,
         },
         {
            name: "tempo-medio-de-chamada",
            description: "Informe o tempo medio de chamada em segundos, caso seja o valor que você quer decobrir, coloque 0",
            type: 10,
            required: true,
         }
      ],

	run: async (client, interaction, args) => {
		const Au = interaction.options.getNumber("Au");
      const tempoDeAmostragem = interaction.options.getNumber("tempo-de-amostragem");
      const numeroDeChamadas = interaction.options.getNumber("numero-de-chamadas");
      const tempoMedioDeChamada = interaction.options.getNumber("tempo medio de chamada");

      if (Au == 0) {
         const resultado = (numeroDeChamadas/tempoDeAmostragem)*tempoMedioDeChamada;
         interaction.reply(`O trafego é ${resultado} ** Erlangs **`);
      }
      else if (tempoDeAmostragem == 0) {
         const resultado = (numeroDeChamadas/Au)*tempoMedioDeChamada;
         interaction.reply(`O tempo de amostragem é ${resultado} ** segundos **`);
      }
      else if (numeroDeChamadas == 0) {
         const resultado = (Au/tempoDeAmostragem)*tempoMedioDeChamada;
         interaction.reply(`O numero de chamadas é ${resultado} ** chamadas **`);
      }
      else if (tempoMedioDeChamada == 0) {
         const resultado = (Au/tempoDeAmostragem)*numeroDeChamadas;
         interaction.reply(`O tempo medio de chamada é ${resultado} ** segundos **`);
      }
      
	},
};
