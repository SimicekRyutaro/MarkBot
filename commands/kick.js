const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Vyhodí uživatele ze serveru')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
            option
                .setName("pachatel")
                .setDescription("Uživatel, kterého chcete vyhodit")
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName("duvod")
                .setDescription("Důvod, kvůli kterému uživatele vyhazujete")
                .setRequired(false))
		.setDMPermission(false),
	async execute(interaction) {
        const member = interaction.options.getMember("pachatel");
        let reason = interaction.options.getString("duvod");
        if (!reason) reason = "Neznámý důvod";
        const embed = new EmbedBuilder()
			.setColor(interaction.client.color)
			.setTitle("Uživatel vyhozen")
			.setDescription(`Vyhozený uživatel: ${member}\nDůvod: ${reason}`)
        try {
            await member.kick(reason);
		    await interaction.reply({
			    embeds: [embed]
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
