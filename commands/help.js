const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Ukáže info o botovi a všechny příkazy bota'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(interaction.client.color)
            .setTitle('Info o MarkBotovi')
            .setDescription('Jsem bot, kterého vytvořil Šimon Kubeš v rámci své maturitní práce')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { name: '/help', value: 'Tento příkaz - zobrazí info o botovi', inline: true },
                { name: '/rockpaperscissors', value: 'Zahraj si se mnou kámen, nůžky papír', inline: true },
                { name: '/svatek', value: 'Zjisti, kdy má dané jméno svátek', inline: true },

                { name: '/kick', value: 'Vyhodí uživatele ze serveru', inline: true },
                { name: '/ban', value: 'Trvale zabanuje uživatele ze serveru', inline: true },
                { name: '/clear', value: 'Vymaže určitý počet zpráv', inline: true },

                { name: '/setwelcomechannel', value: 'Nastaví kanál pro vítání nových uživatelů', inline: true },
                { name: '/removewelcomechannel', value: 'Odebere kanál pro vítání nových uživatelů', inline: true },
                { name: '/dmwelcome', value: 'Zapne/vypne vítání nových uživatelů v soukromých zprávách', inline: true },
            );
		await interaction.reply({
            embeds: [embed]
        });
	},
};
