const discord = require("discord.js");

module.exports = {
	name: "oi",
	description: "respondo oi",
	type: 1,

	run: async (client, interaction, args) => {
		interaction.reply(`**oi ${interaction.user.username} 👋**`);
	},
};
