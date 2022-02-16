import { Client } from 'minecraft-protocol';

/**
 * The protocol scheme used by [`protodef`](https://www.npmjs.com/package/protodef) to define the protocol between the client and the server
 */
export declare const scheme: { [key: string]: any };

export declare class LCPlayer {
  /**
   * Creates a new LunarClient player
   * @param client Node Minecraft Protocol Client
   * @param channel LC Plugin Channel to use
   */
  constructor(
    client: Client,
    channel: 'lunarclient:pm' | 'Lunar-Client' = 'lunarclient:pm'
  );

  /**
   * Node Minecraft Protocol Client
   * @readonly
   */
  client: Client;
  /**
   * Plugin channel used
   * @readonly
   */
  channel: 'lunarclient:pm' | 'Lunar-Client';
  /**
   * Waypoints loaded by the client
   */
  waypoints: Waypoint[];
  /**
   * Current teammates of the client (Array of UUIDs)
   */
  teammates: string[];

  /**
   * Add a waypoint to the client
   * @param waypoint Waypoint to add
   * @returns True if successful
   */
  addWaypoint(waypoint: Waypoint): boolean;
  /**
   * Remove a waypoint from the client
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
    level: 'error' | 'info' | 'success' | 'warning' = 'info'
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
}

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
