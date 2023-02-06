const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Zabanuje uživatele ze serveru')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => 
            option
                .setName("pachatel")
                .setDescription("Uživatel, kterého chcete zabanovat")
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName("duvod")
                .setDescription("Důvod, kvůli kterému uživatele banujete")
                .setRequired(false))
		.setDMPermission(false),
	async execute(interaction) {
        const member = interaction.options.getMember("pachatel");
        let reason = interaction.options.getString("duvod");
        if (!reason) reason = "Neznámý důvod";
        const embed = new EmbedBuilder()
			.setColor(interaction.client.color)
			.setTitle("Uživatel zabanován")
			.setDescription(`Zabanovaný uživatel: ${member}\nDůvod: ${reason}`)
        try {
            await member.ban({
                reason: reason,
            });
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
