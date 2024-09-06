import type { Client, Collection } from 'discord.js';

export {};

declare module 'discord.js' {
  interface Client<T> {
    commands: Collection<unknown, unknown>;
  }
}
