const scheme = require('./scheme');

class LCPlayer {
  constructor(client, channel = 'lunarclient:pm') {
    this.client = client;
    this.channel = channel;
    this.waypoints = [];
    this.teammates = [];

    this.client.write('custom_payload', {
      channel: 'REGISTER',
      data: Buffer.from(this.channel),
    });
    this.client.registerChannel(this.channel, scheme);
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
    this.#sendTeammateList();
    return true;
  }

  removeTeammate(uuid) {
    if (!this.teammates.find((t) => t === uuid)) return false;
    this.teammates = this.teammates.filter((t) => t !== uuid);
    this.#sendTeammateList();
    return true;
  }

  #sendTeammateList() {
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
}

const WaypointColor = {
  RED: 0xff0000,
  BLUE: 0x0000ff,
  GREEN: 0x00ff00,
  YELLOW: 0xffff00,
  AQUA: 0x00ffff,
  WHITE: 0xffffff,
  PINK: 0xff00ff,
  GRAY: 0x808080,
};

module.exports = {
  LCPlayer,
  WaypointColor,
};
