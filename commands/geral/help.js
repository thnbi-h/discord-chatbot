const { userMention } = require('@discordjs/builders');

module.exports = {
	name: "help",
	description: "precisa de alguma ajuda?",
	type: 1,
	
	run: async (client, interaction, args) => {
		const id = interaction.user.id;
		const user = userMention(id);

		const embed = {
			"type": "rich",
			"title": `Eu sou a ajuda!`,
			"description": `Olá ${user}, me chamo aifbot e sou um bot de discord para facilitar a vida de estudantes de telecomunicações.\n\nMeus comandos são basicamente algumas cálculadoras, um gerenciador de horário e alguns comandos de entretenimento, (ah! e eu consigo te escutar).\n\n**Comandos**\nhttps://hnbi.notion.site/Comandos-2ff6646ae3c24446a92bedec8792e693 \n\n**GitHub**\nhttps://github.com/aifbot/discord-chatbot/`,
			"color": 0x366414,
			"thumbnail": {
			  "url": `https://images-ext-2.discordapp.net/external/R_MP8kq4JiKupEHN_1Ihaqr_dwkrlKKz4G0GYHbAwA0/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1019291298458509424/a649d2a8bfaa20f28b4ae6cc3226b37c.webp?width=530&height=530`,
			  "height": 0,
			  "width": 0
			}
		}
		interaction.reply({ embeds: [embed] });
	},
};