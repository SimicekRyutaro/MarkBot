const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setwelcomechannel')
		.setDescription('Nastaví textový kanál, kde bude bot vítat nové uživatele')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => 
            option
                .setName("channel")
                .setDescription("Kanál, kde bude bot vítat nové uživatele")
                .setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        try {
            await db.set(`welcomechannel_${interaction.guild.id}`, channel.id);
            await interaction.reply({
                content: `Vítací kanál přidán! Nové uživatele budu vítat v ${channel}`
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
