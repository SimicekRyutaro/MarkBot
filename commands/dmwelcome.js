const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dmwelcome')
		.setDescription('Zapne/vypne vítání nových uživatelů v soukromých zprávách')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addBooleanOption(option => 
            option
                .setName("bool")
                .setDescription("True - zapne vítání v soukromých zprávách, False - vypne vítání v soukromých zprávách")
                .setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
        const bool = interaction.options.getBoolean("bool");
        try {
            await db.set(`dmwelcome_${interaction.guild.id}`, bool);
            if (bool == true) {
                await interaction.reply({
                    content: "Vítání uživatelů v soukromých zprávách zapnuto"
                });
            } else {
                await interaction.reply({
                    content: "Vítání uživatelů v soukromých zprávách vypnuto"
                });
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
