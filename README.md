# minecraft-protocol-lunarclient
![GitHub package.json version](https://img.shields.io/github/package-json/v/Solar-tweaks/minecraft-protocol-lunarclient?style=for-the-badge)

Custom packets used by Lunar Client for node-minecraft-protocol

# Usage 🛠️
```js
const { LCPlayer, WaypointColor } = require('minecraft-protocol-lunarclient');

// Instantiate the Lunar Client Player
// Using the node-minecraft-protocol client
const player = new LCPlayer(client);

// Adding a waypoint to the player
player.addWaypoint({
  name: 'Spawn',
  color: WaypointColor.PINK,
  x: 0,
  y: 64,
  z: 0,
  forced: false,
  visible: true,
});

// Removing the waypoint
player.removeWaypoint('Spawn');

// Sending a notification with "Hello World!" as text for a duration of 5 000ms and as a warning
player.sendNotification('Hello World!', 5000, 'warning');

// Adding teammates
player.addTeammate('827f8c48-cdb2-4105-af39-df5a64f93490');
player.addTeammate('64fb990d-5c85-43cd-a3b1-98a44b385493');

// Removing teammates
player.removeTeammate('64fb990d-5c85-43cd-a3b1-98a44b385493');
```

# Authors 💖
Thanks to Beanes#4501 for the scheme!