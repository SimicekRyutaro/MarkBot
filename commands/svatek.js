const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const json = JSON.parse(fs.readFileSync("svatky.json", "utf-8"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('svatek')
		.setDescription('Zjisti, kdy má dané jméno svátek!')
        .addStringOption(option =>
            option
                .setName("jmeno")
                .setDescription("Jméno, jehož datum svátku chceš zjistit")
                .setRequired(true)),
	async execute(interaction) {
        const input = interaction.options.getString("jmeno");
        const output = json[input];
        try {
            if (!output) {
                await interaction.reply(`Jméno ${input} není v českém kalendáři. Zkontroluj, že zadané jméno začíná velkým písmenem.`);
            } else {
                await interaction.reply(`${input} slaví svátek ${output}`);
            }
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: "Někde nastala chyba",
                ephemeral: true
            });
        }
	},
};
