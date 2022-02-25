const scheme = require('./scheme');

// console.log(JSON.stringify(scheme, null, 2));

const { LCPlayer } = require('./LCPlayer');

// Enums
const {
  WaypointColor,
  StaffMod,
  ServerRule,
  MiniMapStatus,
} = require('./constants');

// Utility functions
const convertHexColor = require('./utils/convertHexColor');

module.exports = {
  scheme,
  LCPlayer,
  WaypointColor,
  StaffMod,
  ServerRule,
  MiniMapStatus,
  convertHexColor,
};
