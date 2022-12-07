module.exports = {
	name: "help",
	description: "precisa de alguma ajuda?",
	type: 1,

	run: async (client, interaction, args) => {
		interaction.reply(`**oi ${interaction.user.username}, para obter ajuda entre no link: https://hnbi.notion.site/Comandos-2ff6646ae3c24446a92bedec8792e693 **`);
	},
};