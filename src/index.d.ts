import { Client } from 'minecraft-protocol';

/**
 * The protocol scheme used by [`protodef`](https://www.npmjs.com/package/protodef) to define the protocol between the client and the server.
 */
export declare const scheme: { [key: string]: any };

export type LunarChannelResolvable = 'lunarclient:pm' | 'Lunar-Client';

export interface LCPlayerOptions {
  /**
   * LC Plugin Channel to use
   */
  channel?: LunarChannelResolvable;
  /**
   * Whether or not to use the old registration method
   */
  oldChannelRegistration?: boolean;
}

export declare class LCPlayer {
  /**
   * Creates a new LunarClient player.
   * @param client Node Minecraft Protocol Client
   * @param options Options for the player
   */
  constructor(client: Client, options?: LCPlayerOptions);

  /**
   * Node Minecraft Protocol Client
   */
  readonly client: Client;
  /**
   * Plugin channel used
   */
  readonly channel: LunarChannelResolvable;
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
   * Current mod settings for the client. Key (mod id): Value (mod setting)
   */
  modSettings: { [key: string]: ModSetting };

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
  /**
   * Set the state of the given Staff Mod for the client.
   * @param mod Staff mod to apply the state to
   * @param state State to apply
   */
  setStaffModState(mod: StaffMod | StaffModResolvable, state: boolean): void;
  /**
   * Set a server rule for the client.
   * @param serverRule Server rule to set the value to
   * @param value Value to set, usually a boolean but should be `NEUTRAL` or `FORCED_OFF` when the server rule is minimap status
   */
  setServerRule(
    serverRule: ServerRule | ServerRuleResolvable,
    value: boolean | MiniMapStatus | MiniMapStatusResolvable
  ): void;
  /**
   * Set a force state for a given mod. Forced enabled or forced disabled.
   * Warning: You should not rely on this because the client is not handling the packet correctly
   * and doesn't work all the time.
   * @param mod Mod to set the setting for
   * @param enabled Whether the mod should be force enabled or force disabled
   * @param options
   * @returns True if successful
   */
  addModSetting(
    mod: string,
    enabled: boolean,
    options?: AddModSettingOptions
  ): boolean;
  /**
   * Remove a forced state for the given mod.
   * @param mod Mod to remove the forced state
   * @returns True if successful
   */
  removeModSetting(mod: string): boolean;
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
  RED,
  BLUE,
  GREEN,
  YELLOW,
  AQUA,
  WHITE,
  PINK,
  GRAY,
}

/**
 * List of all the known staff mods
 */
export declare enum StaffMod {
  XRAY,
}

export type StaffModResolvable = 'XRAY';

/**
 * List of all server rules.
 * The documentation for those rules can be found [here](https://github.com/LunarClient/BukkitAPI-NetHandler/blob/master/src/main/java/com/lunarclient/bukkitapi/nethandler/client/obj/ServerRule.java)
 */
export declare enum ServerRule {
  /**
   * Whether or not minimap is allowed.
   * Expected value: (String) `NEUTRAL` or `FORCED_OFF`
   */
  MINIMAP_STATUS,
  /**
   * Whether or not the server will store waypoints, instead of the client
   */
  SERVER_HANDLES_WAYPOINTS,
  /**
   * A warning message will be shown when attempting to disconnect if the current
   * game is competitive.
   */
  COMPETITIVE_GAME,
  /**
   * If this server forces shaders to be disabled
   */
  SHADERS_DISABLED,
  /**
   * If the server runs legacy enchanting (pre 1.8)
   */
  LEGACY_ENCHANTING,
  /**
   * If this server has enabled voice chat
   */
  VOICE_ENABLED,
  /**
   * Whether to revert combat mechanics to 1.7
   */
  LEGACY_COMBAT,
}

export type ServerRuleResolvable =
  | 'minimapStatus'
  | 'serverHandlesWaypoints'
  | 'competitiveGame'
  | 'shadersDisabled'
  | 'legacyEnchanting'
  | 'voiceEnabled'
  | 'legacyCombat';

/**
 * MinimapStatus values for the server rule
 */
export declare enum MiniMapStatus {
  NEUTRAL,
  FORCED_OFF,
}

export type MiniMapStatusResolvable = 'NEUTRAL' | 'FORCED_OFF';

export enum Mod {}

/**
 * Waypoint object. Used when creating waypoints.
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

export interface AddModSettingOptions {
  /**
   * Whether or not to send the `ModSettings` packet. Useful when you need to set multiple mods without sending a tons of packets.
   */
  sendPacket: boolean;
  /**
   * I don't know what this is ¯\\\_(ツ)\_/¯
   */
  properties: any;
}

/**
 * Mod Setting object. Used in the `LCPlayer#modSettings` property.
 */
export interface ModSetting {
  enabled: boolean;
  properties: { [key: string]: any };
}
