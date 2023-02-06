const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rockpaperscissors')
		.setDescription('Zahraj si se mnou kámen, nůžky, papír!'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(interaction.client.color)
            .setTitle(":rock: Kámen :scissors: Nůžky :page_facing_up: Papír!")
            .setDescription("Zmáčknutím tlačítka potvrď svou volbu");
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("rock")
                    .setLabel("Kámen")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("scissors")
                    .setLabel("Nůžky")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("paper")
                    .setLabel("Papír")
                    .setStyle(ButtonStyle.Success),
            )
        const message = await interaction.reply({
            embeds: [embed],
            components: [row]
        });
        
        const seznam = ["kamen", "nuzky", "papir"];
        const volba = seznam[Math.floor(Math.random()*seznam.length)];

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

        collector.on("collect", async (i) => {
            if (i.customId == "rock") {
                if (volba == "kamen") {
                    await interaction.editReply({
                        content: `${i.user.username} :rock:    :crossed_swords:    :rock: ${i.client.user.username}\nJe to remíza`,
                        embeds: [],
                        components: []
                    });
                } else if (volba == "papir") {
                    await interaction.editReply({
                        content: `${i.user.username} :rock:    :crossed_swords:    :page_facing_up: ${i.client.user.username}\nVyhrává ${i.client.user.username}`,
                        embeds: [],
                        components: []
                    });
                } else {
                    await interaction.editReply({
                        content: `${i.user.username} :rock:    :crossed_swords:    :scissors: ${i.client.user.username}\nGratuluji, vyhrál jsi, ${i.user.username}!`,
                        embeds: [],
                        components: []
                    });
                }
            }
            if (i.customId === "scissors") {
                if (volba == "kamen") {
                    await interaction.editReply({
                        content: `${i.user.username} :scissors:    :crossed_swords:    :rock: ${i.client.user.username}\nVyhrává ${i.client.user.username}`,
                        embeds: [],
                        components: []
                    });
                } else if (volba == "papir") {
                    await interaction.editReply({
                        content: `${i.user.username} :scissors:    :crossed_swords:    :page_facing_up: ${i.client.user.username}\nGratuluji, vyhrál jsi, ${i.user.username}!`,
                        embeds: [],
                        components: []
                    });
                } else {
                    await interaction.editReply({
                        content: `${i.user.username} :scissors:    :crossed_swords:    :scissors: ${i.client.user.username}\nJe to remíza`,
                        embeds: [],
                        components: []
                    });
                }
            }
            if (i.customId === "paper") {
                if (volba == "kamen") {
                    await interaction.editReply({
                        content: `${i.user.username} :page_facing_up:    :crossed_swords:    :rock: ${i.client.user.username}\nGratuluji, vyhrál jsi, ${i.user.username}!`,
                        embeds: [],
                        components: []
                    });
                } else if (volba == "papir") {
                    await interaction.editReply({
                        content: `${i.user.username} :page_facing_up:    :crossed_swords:    :page_facing_up: ${i.client.user.username}\nJe to remíza`,
                        embeds: [],
                        components: []
                    });
                } else {
                    await interaction.editReply({
                        content: `${i.user.username} :page_facing_up:    :crossed_swords:    :scissors: ${i.client.user.username}\nVyhrává ${i.client.user.username}`,
                        embeds: [],
                        components: []
                    });
                }
            }
            collector.stop();
        });
        collector.on("end", async (collected, reason) => {
            if (reason == "time") {
                await interaction.editReply({
                    content: `Je mi líto, čas vypršel`,
                    embeds: [],
                    components: []
                });
            }
        });
	},
};
