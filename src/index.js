const scheme = require('./scheme');
const { LCPlayer, StaffMod, WaypointColor } = require('./LCPlayer');

// Utility functions
const convertHexColor = require('./utils/convertHexColor');

// const util = require('util');
// console.log(
//   util.inspect(scheme1, { showHidden: false, depth: null, colors: true })
// );

module.exports = {
  scheme,
  LCPlayer,
  StaffMod,
  WaypointColor,
  convertHexColor,
};
