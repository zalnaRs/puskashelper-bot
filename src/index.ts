import { Client, Events, GatewayIntentBits } from 'discord.js';
import { token } from '../config.json';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (rc) => {
  console.log(`Elindult! ${rc.user.tag}`);
});

client.login(token);
