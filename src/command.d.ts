import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export {};

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
};
