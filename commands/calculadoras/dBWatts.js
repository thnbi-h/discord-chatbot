module.exports = {
	"name" : "db-watts-calc",
	"description" : "convete watts para dbm e vice-versa",
	"type": 1,
	"options": [
		{
			"name" : "watts",
			"description" : "informe o valor em watts, caso seja o valor que você quer decobrir, coloque 0",
			"type" : 10,
			"required" : true,
		},
		{
			"name" : "dbm",
			"type" : 10,
			"description" : "informe o valor em dbm, caso seja o valor que você quer decobrir, coloque 0",
			"required" : true,
		},
	],

	run: async (client, interaction, args) => {
		let watts = interaction.options.getNumber("watts");
		let db = interaction.options.getNumber("dbm");
            
      if (watts == 0) {
         let resultado = 10 * Math.log10(db);
         interaction.reply(`O valor em watts é ${resultado} ** Watts **`);
         } else if (db == 0) {
         let resultado = Math.pow(10, watts / 10);
         interaction.reply(`O valor em dbm é ${resultado} ** dBm **`);
      }
   }
};
