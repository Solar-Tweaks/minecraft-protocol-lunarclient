import { Client } from 'minecraft-protocol';

/**
 * The protocol scheme used by [`protodef`](https://www.npmjs.com/package/protodef) to define the protocol between the client and the server.
 */
export declare const scheme: { [key: string]: any };

export declare class LCPlayer {
  /**
   * Creates a new LunarClient player.
   * @param client Node Minecraft Protocol Client
   * @param channel LC Plugin Channel to use
   */
  constructor(client: Client, channel?: 'lunarclient:pm' | 'Lunar-Client');

  /**
   * Node Minecraft Protocol Client
   */
  readonly client: Client;
  /**
   * Plugin channel used
   */
  readonly channel: 'lunarclient:pm' | 'Lunar-Client';
  /**
   * Waypoints loaded by the client
   */
  waypoints: Waypoint[];
  /**
   * Current teammates of the client (Array of UUIDs)
   */
  teammates: string[];
  /**
   * Current active cooldowns (Array of ids, strings)
   */
  cooldowns: string[];

  /**
   * Add a waypoint to the client.
   * @param waypoint Waypoint to add
   * @returns True if successful
   */
  addWaypoint(waypoint: Waypoint): boolean;
  /**
   * Remove a waypoint from the client.
   * @param waypoint Waypoint object or waypoint name
   * @returns True if successful
   */
  removeWaypoint(waypoint: Waypoint | string): boolean;
  /**
   * Remove all waypoints loaded by the player
   */
  removeAllWaypoints(): void;
  /**
   * Send a notification to the client. This packet is not supported by the client by default! Solar Tweaks does implement this packet, so use this packet with that in mind.
   * @param message Message to send
   * @param durationMs Duration of the message in milliseconds
   * @param level Message level, set to `info` by default
   */
  sendNotification(
    message: string,
    durationMs: number,
    level?: 'error' | 'info' | 'success' | 'warning'
  ): void;
  /**
   * Add a teammate to the client. The TeamView mod must be enabled for this to work.
   * @param uuid UUID of the teammate to add (must be a valid UUID with dashes)
   * @returns True if successful
   */
  addTeammate(uuid: string): boolean;
  /**
   * Remove a teammate from the client. The TeamView mod must be enabled for this to work.
   * @param uuid UUID of the teammate to remove (must be a valid UUID with dashes)
   * @returns True if successful
   */
  removeTeammate(uuid: string): boolean;
  /**
   * Remove all teammates from the client. The TeamView mod must be enabled for this to work.
   */
  removeAllTeammates(): void;
  /**
   * Add a cooldown to the client.
   * @deprecated Protodef is not able to serialize the packet for some reason
   * @param id String id of the cooldown, used to remove it later
   * @param durationMs Duration of the message in milliseconds
   * @param iconId Icon id to use, same system as [minecraft ids](https://minecraft-ids.grahamedgecombe.com/)
   * @returns True if successful
   */
  addCooldown(id: string, durationMs: number, iconId: number): boolean;
  /**
   * Remove a cooldown from the client.
   * @deprecated Protodef is not able to serialize the packet for some reason
   * @param id String id of the cooldown
   * @returns True if successful
   */
  removeCooldown(id: string): boolean;
  /**
   * Add a cooldown to the client. (The packet is built manually by the library, this should not be used for production, it's a temporary replacement)
   * @param id String id of the cooldown, used to remove it later
   * @param durationMs Duration of the message in milliseconds
   * @param iconId Icon id to use, same system as [minecraft ids](https://minecraft-ids.grahamedgecombe.com/)
   * @returns True if successful
   */
  addCooldownManual(id: string, durationMs: number, iconId: number): boolean;
  /**
   * Remove a cooldown from the client. (The packet is built manually by the library, this should not be used for production, it's a temporary replacement)
   * @param id String id of the cooldown
   * @returns True if successful
   */
  removeCooldownManual(id: string): boolean;
}

/**
 * Converts a hexadecimal color to a number that can be used as a color (waypoint color for example)
 * @param color Hexadecimal representation of the color (works with and without a # at the beginning)
 * @returns The number to use or `NaN` if the provided hexadecimal color code is invalid
 */
export declare function convertHexColor(color: string): number;

/**
 * Some colors that can be used as a waypoint color
 */
export declare enum WaypointColor {
  RED = 0xff0000,
  BLUE = 0x0000ff,
  GREEN = 0x00ff00,
  YELLOW = 0xffff00,
  AQUA = 0x00ffff,
  WHITE = 0xffffff,
  PINK = 0xff00ff,
  GRAY = 0x808080,
}

/**
 * Waypoint object
 */
export interface Waypoint {
  /**
   * Name of the waypoint
   */
  name: string;
  /**
   * X coordinate of the waypoint
   */
  x: number;
  /**
   * Y coordinate of the waypoint
   */
  y: number;
  /**
   * Z coordinate of the waypoint
   */
  z: number;
  /**
   * Color of the waypoint
   */
  color: WaypointColor | number;
  /**
   * I don't really know what this is, if you know please tell me or open a pull request with this comment changed
   */
  forced: boolean;
  /**
   * If the waypoint is visible
   */
  visible: boolean;
}
