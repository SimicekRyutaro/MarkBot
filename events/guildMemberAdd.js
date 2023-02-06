const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db")
const db = new QuickDB();

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		// DM Welcome
		const bool = await db.get(`dmwelcome_${member.guild.id}`)
		const embed = new EmbedBuilder()
			.setColor(member.client.color)
			.setTitle(`Vítej na serveru ${member.guild.name}!`)
			.setThumbnail(member.guild.iconURL())
			.setDescription("Aktuální členové serveru jsou určitě rádi, že tě vidí!");
		try {
			if (bool == true) {
				await member.send({
					embeds: [embed]
				});
			}
		} catch (error) {
			console.error(`Chyba při vítání uživatele - uživatel má pravděpodobně vypnuté DM`);
			console.error(error);
		}

		// Channel Welcome
		const channelID = await db.get(`welcomechannel_${member.guild.id}`);
		try {
			if (channelID != null) {
				const channel = await member.guild.channels.cache.get(channelID);
				await channel.send(`:wave: Právě dorazil ${member}! Přivítejte ho!`);
			}
		} catch (error) {
			console.error(`Chyba při vítání uživatele - pravděpodobně byl smazán daný kanál, nebo bot nemá oprávnění do něj psát`);
			console.error(error);
		}
	},
};