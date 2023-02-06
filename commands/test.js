const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Testovací příkaz'),
	async execute(interaction) {
		await interaction.reply("Tohle je test");
	},
};
