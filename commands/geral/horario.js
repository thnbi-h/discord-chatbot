const { EmbedBuilder, Events } = require("discord.js");

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
      const turma = interaction.options.getString("turma");
      let embed = new EmbedBuilder()
         .setColor("#008000")
         .setTitle(`Horario da turma **${turma} | 📅**`)
         .setDescription(
            `**Segunda-Feira**\n\n**Terça-Feira**\n\n**Quarta-Feira**\n\n**Quinta-Feira**\n\n**Sexta-Feira**\n\n**Sábado**\n\n**Domingo**`
         );

      await interaction.reply({ embeds: [embed] });

      client.on(Events.MessageCreate, async (message) => {
         embed = new EmbedBuilder()
            .setColor("#008000")
            .setTitle(`**${message}**`)
            .setDescription(
               `**Segunda-Feira**\n\n**Terça-Feira**\n\n**Quarta-Feira**\n\n**Quinta-Feira**\n\n**Sexta-Feira**\n\n**Sábado**\n\n**Domingo**`
            )
         interaction.editReply({ embeds: [embed] });
      })
   }
}