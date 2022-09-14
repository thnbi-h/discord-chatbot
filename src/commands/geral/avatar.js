const discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Mostra o avatar de um usuário",
  type: "1",
  options: [
    {
      name: "usuário",
      type: "6",
      description: "Usuário que você quer ver o avatar",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    let userMention = interaction.options.getUser("usúario");
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
