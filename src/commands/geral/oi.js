module.exports = {
	name: "oi",
	description: "respondo oi",
	type: 1,

	async run(client, interaction) {
		interaction.reply(`**oi ${interaction.user.username} 👋**`);
	},
};
