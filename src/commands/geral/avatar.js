const discord = require("discord.js");

module.exports = {
  "name" : "avatar",
  "description" : "mostra o avatar de um usuario",
  "type" : 1,
  "options" : [
    {
      "name" : "usuario",
      "type" : 6,
      "description" : "usuario que voce quer ver o avatar",
      "required" : false,
    },
  ],
  run: async (client, interaction, args) => {
    let userMention = interaction.options.getUser("usuario");
    let person;

    if (!userMention) {
      person = interaction.user;
    } else {
      person = userMention;
    }

    const embed = new Discord.EmbedBuilder()
      .setTitle(`Imagem de ${person.username}`)
      .setImagem(person.displayAvatarURL())
      .setURL(
        person.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
      );

    interaction.reply({ embeds: [embed] });
  },
};
