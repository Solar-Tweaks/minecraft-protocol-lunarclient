const varint = require('varint');
const scheme = require('./scheme');

class LCPlayer {
  constructor(client, options = {}) {
    this.client = client;
    this.channel = options.channel ?? 'lunarclient:pm';
    this.waypoints = [];
    this.teammates = [];
    this.cooldowns = [];
    this.modSettings = {};

    if (options.oldChannelRegistration)
      this.client.write('custom_payload', {
        channel: 'REGISTER',
        // Null character is used to separate the channels when sending multiple
        // https://wiki.vg/Plugin_channels#minecraft:register
        data: Buffer.from(`${this.channel}\u0000`),
      });
    this.client.registerChannel(
      this.channel,
      scheme,
      !options.oldChannelRegistration
    );
  }

  addWaypoint(waypoint) {
    if (this.waypoints.find((w) => w.name === waypoint.name)) return false;
    this.waypoints.push(waypoint);
    this.client.writeChannel(this.channel, {
      id: 'waypoint_add',
      name: waypoint.name,
      world: '',
      color: waypoint.color,
      x: waypoint.x,
      y: waypoint.y,
      z: waypoint.z,
      forced: waypoint.forced,
      visible: waypoint.visible,
    });
    return true;
  }

  removeWaypoint(waypoint) {
    const _waypoint = typeof waypoint === 'string' ? waypoint : waypoint.name;
    if (!this.waypoints.find((w) => w.name === _waypoint)) return false;
    this.waypoints = this.waypoints.filter((w) => w.name !== _waypoint);
    this.client.writeChannel(this.channel, {
      id: 'waypoint_remove',
      name: _waypoint,
      world: '',
    });
    return true;
  }

  removeAllWaypoints() {
    this.waypoints.forEach((waypoint) => {
      this.removeWaypoint(waypoint.name);
    });
    this.waypoints = [];
  }

  sendNotification(message, durationMs, level = 'info') {
    this.client.writeChannel(this.channel, {
      id: 'notification',
      message,
      durationMs,
      level,
    });
  }

  addTeammate(uuid) {
    if (this.teammates.find((t) => t === uuid)) return false;
    this.teammates.push(uuid);
    this.sendTeammateList();
    return true;
  }

  removeTeammate(uuid) {
    if (!this.teammates.find((t) => t === uuid)) return false;
    this.teammates = this.teammates.filter((t) => t !== uuid);
    this.sendTeammateList();
    return true;
  }

  removeAllTeammates() {
    this.teammates = [];
    this.sendTeammateList();
  }

  sendTeammateList() {
    const players = [];
    this.teammates.forEach((uuid) => {
      players.push({
        player: uuid,
        posMap: [
          { key: 'x', value: 0 },
          { key: 'y', value: 0 },
          { key: 'z', value: 0 },
        ],
      });
    });
    this.client.writeChannel(this.channel, {
      id: 'teammates',
      leader: this.client.uuid,
      lastMs: 0,
      players,
    });
  }

  addCooldown(id, durationMs, iconId) {
    if (this.cooldowns.find((c) => c === id)) return false;
    this.cooldowns.push(id);
    setTimeout(() => {
      this.cooldowns = this.cooldowns.filter((c) => c !== id);
    }, durationMs);
    this.client.writeChannel(this.channel, {
      id: 'cooldown',
      message: id,
      durationMs,
      iconId,
    });
    return true;
  }

  removeCooldown(id) {
    if (!this.cooldowns.find((c) => c === id)) return false;
    this.cooldowns = this.cooldowns.filter((c) => c !== id);
    this.client.writeChannel(this.channel, {
      id: 'cooldown',
      message: id,
      durationMs: 0,
      iconId: 0,
    });
    return true;
  }

  addCooldownManual(id, durationMs, iconId) {
    if (this.cooldowns.find((c) => c === id)) return false;
    this.cooldowns.push(id);
    setTimeout(() => {
      this.cooldowns = this.cooldowns.filter((c) => c !== id);
    }, durationMs);
    this.client.write('custom_payload', {
      channel: this.channel,
      data: this.buildCooldownPacket(id, durationMs, iconId),
    });
    return true;
  }

  removeCooldownManual(id) {
    if (!this.cooldowns.find((c) => c === id)) return false;
    this.cooldowns = this.cooldowns.filter((c) => c !== id);
    this.client.write('custom_payload', {
      channel: this.channel,
      data: this.buildCooldownPacket(id, 0, 0),
    });
    return true;
  }

  buildCooldownPacket(id, durationMs, iconId) {
    const packet = Buffer.alloc(14 + id.length);
    packet.write('03', 'hex');
    varint.encode(id.length, packet, 1);
    packet.write(id, 2);
    let durationMsHex = durationMs.toString(16);
    for (let index = 0; index < 4 - durationMsHex.length; index++) {
      durationMsHex = '0' + durationMsHex;
    }
    packet.write(durationMsHex, 8 + id.length, 'hex');
    packet.write('0' + iconId.toString(16), 12 + id.length, 'hex');
    return packet;
  }

  setStaffModState(mod, state) {
    this.client.writeChannel(this.channel, {
      id: 'staff_mods',
      mod,
      state,
    });
  }

  setServerRule(serverRule, value) {
    const isMinimapStatus = serverRule === 'minimapStatus';
    if (isMinimapStatus && typeof value !== 'string')
      throw new Error('Value for server rule MINIMAP_STATUS must be a string');
    if (!isMinimapStatus && typeof value !== 'boolean')
      throw new Error(`Value for server rule ${serverRule} must be a boolean`);
    this.client.writeChannel(this.channel, {
      id: 'server_rule',
      rule: serverRule,
      boolean: isMinimapStatus ? false : value,
      integer: 0,
      float: 0,
      string: isMinimapStatus ? value : '',
    });
  }

  addModSetting(mod, enabled, options) {
    if (this.modSettings[mod]) return false;
    this.modSettings[mod] = {
      enabled,
      properties: options?.properties ?? {},
    };
    if (options?.sendPacket ?? true) this.sendModSettings();
    return true;
  }

  removeModSetting(mod) {
    if (!this.modSettings[mod]) return false;
    delete this.modSettings[mod];
    this.sendModSettings();
    return true;
  }

  sendModSettings() {
    this.client.writeChannel(this.channel, {
      id: 'mod_settings',
      settings: JSON.stringify(this.modSettings),
    });
  }
}

module.exports = {
  LCPlayer,
};
