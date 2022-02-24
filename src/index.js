const scheme = require('./scheme');
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

// console.log(JSON.stringify(scheme, null, 2));

module.exports = {
  scheme,
  LCPlayer,
  WaypointColor,
  StaffMod,
  ServerRule,
  MiniMapStatus,
  convertHexColor,
};
