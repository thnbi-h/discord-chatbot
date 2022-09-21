const discord = require("discord.js");

module.exports = {
  "name" : "calc",
  "description" : "é uma cáculadora, só que no discord e bem simples",
  "type" : 1,
   "options" : [
      {
         "name" : "numero1",
         "type" : 10,
         "description" : "primeiro numero",
         "required" : true,
      },
      {
         "name" : "numero2",
         "type" : 10,
         "description" : "segundo numero",
         "required" : true,
      },
      {
         "name" : "operacao",
         "type" : 3,
         "description" : "Qual operção você deseja realizar com estes dois números",
         "required" : true,
         "choices" : [
            {
               "name" : "somar",
               "value" : "+",
            },
            {
               "name" : "subtrair",
               "value" : "-",
            },
            {
               "name" : "multiplicar",
               "value" : "*",
            },
            {
               "name" : "dividir",
               "value" : "/",
            },
         ],
      },
   ],
     
run: async (client, interaction, args) => {

   let n1 = interaction.options.getNumber("numero1");
   let n2 = interaction.options.getNumber("numero2");
   let operacao = interaction.options.getString("operacao");
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
   const embed = new discord.EmbedBuilder()
   .setColor("#008000")
   .setTitle("Calculadora")
   .setDescription(`O resultado da operação é: ${resultado}`)

 interaction.reply({ embeds: [embed] });

  },
};
