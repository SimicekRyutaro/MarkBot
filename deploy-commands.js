const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Převede příkazy na formát k nahrání
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Konstrukce instance modulu REST
const rest = new REST({ version: '10' }).setToken(token);

// Nahrání příkazů
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// Metoda put obnoví všechny příkazy
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
