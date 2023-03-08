const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "avatar",
	description: "mostra o avatar de um usuario",
	type: 1,
	options: [
		{
			name: "usuario",
			type: 6,
			description: "usuario que voce quer ver o avatar",
			required: false,
		},
	],
	async run(client, interaction) {
		const userMention = interaction.options.getUser("usuario");
		let person;

		if (!userMention) {
			person = interaction.user;
		} else {
			person = userMention;
		}

		const embed = new EmbedBuilder()
			.setColor("#008000")
			.setTitle(`Avatar de **${person.username} | 🖼️**`)
			.setImage(person.displayAvatarURL({ dynamic: true, size: 4096 }));

		interaction.reply({ embeds: [embed] });
	},
};
