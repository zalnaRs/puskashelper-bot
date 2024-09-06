import fs from 'node:fs';
import path from 'node:path';
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import { token } from '../config.json';
import type { Command } from './command';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, './commands');
const commandFolders = fs.readdirSync(foldersPath, { recursive: false });

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder.toString());
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath) satisfies Command;
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName) as Command;

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Bár, a puskásba a kiképzés spártai míg is, hiba!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'Bár, a puskásba a kiképzés spártai míg is, hiba!',
        ephemeral: true,
      });
    }
  }
});

client.once(Events.ClientReady, (rc) => {
  console.log(`Elindult! ${rc.user.tag}`);
});

client.login(token);
