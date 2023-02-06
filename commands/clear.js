const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Vymaže určitý počet zpráv')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => 
            option
                .setName("pocet")
                .setDescription("Počet zpráv k vymazání (1-100)") // Při zadání většího čísla dojde k chybě, takže to nikde nemusím omezovat
                .setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
        const pocet = interaction.options.getInteger("pocet");
        const channel = interaction.channel;
        try {
            await channel.bulkDelete(pocet);
            await interaction.reply(`Úspěšně smazáno ${pocet} zpráv`);
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: "Někde nastala chyba - počet musí být od 1 do 100",
                ephemeral: true
            });
        }
	},
};
