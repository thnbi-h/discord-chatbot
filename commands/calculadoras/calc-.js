const { EmbedBuilder } = require("discord.js");

module.exports = {
  "name" : "calc",
  "description" : "é uma cáculadora mais abrangente, só que no discord",
  "type" : 1,
   "options" : [
      {
         "name" : "expressao",
         "type" : 3,
         "description" : "expressão",
         "required" : true,
      }
   ],
     
run: async (client, interaction, args) => {
      try{
         let expressao = interaction.options.getString("expressao");
         let resultado = eval(expressao);
         const embed = new EmbedBuilder()
         .setColor("#008000")
         .setTitle("Calculadora")
         .setDescription(`O resultado da operação é: ${resultado} ** | 🧑‍🏫**`)
         interaction.reply({ embeds: [embed] });
      } catch(e){
         interaction.reply(`ops... aconteceu algum erro ao resolver essa conta, srry! ** | 😅**`)
         console.error(e);
      }
   },
};
