import { Client } from 'minecraft-protocol';

export declare const scheme: { [key: string]: any };
export declare const channel: string;
export declare function registerClient(
  client: Client,
  altChannel?: boolean
): void;
