const discord = require("discord.js");

module.exports = {
  name: "oi",
  description: "responde",
  options: [
    {
      name: "usuário",
      type: "6",
      description: "usuário que vai ser respondido",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    if (!userMention) {
      person = interaction.user;
    } else {
      person = userMention;
    }

    interaction.reply(`pong! ${person.username}`);
  },
};
