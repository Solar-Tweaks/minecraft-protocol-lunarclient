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

const StaffMod = {
  XRAY: 'XRAY',
};

const ServerRule = {
  MINIMAP_STATUS: 'minimapStatus',
  SERVER_HANDLES_WAYPOINTS: 'serverHandlesWaypoints',
  COMPETITIVE_GAME: 'competitiveGame',
  SHADERS_DISABLED: 'shadersDisabled',
  LEGACY_ENCHANTING: 'legacyEnchanting',
  VOICE_ENABLED: 'voiceEnabled',
  LEGACY_COMBAT: 'legacyCombat',
};

const MiniMapStatus = {
  NEUTRAL: 'NEUTRAL',
  FORCED_OFF: 'FORCED_OFF',
};

module.exports = {
  WaypointColor,
  StaffMod,
  ServerRule,
  MiniMapStatus,
};
