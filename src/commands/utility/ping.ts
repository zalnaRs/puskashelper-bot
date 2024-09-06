import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../command';

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('valász: pong'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
} satisfies Command;

export const data = ping.data;
export const execute = ping.execute;
