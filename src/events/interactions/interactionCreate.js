module.exports = async (client, interaction) => {
	if (!interaction.type === 2) {
		return;
	}

	const command = client.commands.get(interaction.commandName);
	const args = interaction.options;
	if (!command) {
		return;
	}

	try {
		await command.run(client, interaction, args);
	} catch (err) {
		console.error(err);
		await interaction.reply({
			content: "Ocorreu um erro ao executar esse comando! | 😵‍💫",
			ephemeral: true,
		});
	}
};
