const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removewelcomechannel')
		.setDescription('Odebere textový kanál pro vítání nových uživatelů')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
        try {
            await db.delete(`welcomechannel_${interaction.guild.id}`);
            await interaction.reply({
                content: `Vítací kanál odebrán!`
            });
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: "Někde nastala chyba",
                ephemeral: true
            });
        }
	},
};
