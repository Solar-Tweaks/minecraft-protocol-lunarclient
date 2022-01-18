# minecraft-protocol-lunarclient
![GitHub package.json version](https://img.shields.io/github/package-json/v/Solar-tweaks/node-minecraft-protocol-lunarclient?style=for-the-badge)

Custom packets used by Lunar Client for node-minecraft-protocol

# Usage 🛠️
```js
const lunarclient = require('minecraft-protocol-lunarclient');

/* Register the channel for the Minecraft Client */
lunarclient.registerClient(client);

/**
 * Send a LC Packet to the Minecraft Client
 * For the channel name if you chose `Lunar-Client` put that one of course instead of `lunarclient:pm`
*/
client.writeChannel('lunarclient:pm', {
  // Packet to send
  id: 'teammates',

  // Content of the packet
  leader: '827f8c48-cdb2-4105-af39-df5a64f93490',
  lastMs: 25,
  players: [
    {
      player: 'd204eee2-9224-4046-9e98-4da572fe2c4b',
      posMap: []
    }
  ]
});
```

# Authors 💖
Thanks to Beanes#4501 for the scheme!