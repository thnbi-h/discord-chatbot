const discord = require("discord.js");

module.exports = {
  name: "oi",
  description: "responde",
  type: "1",
  
  run: async (client, interaction, args) => {
    interaction.reply(`oi`);
  },
};
