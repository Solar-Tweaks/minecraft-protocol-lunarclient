const { InstantConnectProxy } = require('prismarine-proxy');
const { LCPlayer, WaypointColor } = require('../src');

const proxy = new InstantConnectProxy({
  loginHandler: (client) => {
    return { username: client.username, auth: 'microsoft' };
  },
  serverOptions: {
    version: '1.8.9',
  },
  clientOptions: {
    version: '1.8.9',
    host: 'hypixel.net',
  },
});

proxy.on('incoming', (data, meta, toClient, toServer) => {
  toClient.write(meta.name, data);
});

proxy.on('outgoing', (data, meta, toClient, toServer) => {
  toServer.write(meta.name, data);
});

proxy.on('start', (client) => {
  const player = new LCPlayer(client);
  player.addWaypoint({
    name: 'Spawn',
    color: WaypointColor.PINK,
    x: 0,
    y: 64,
    z: 0,
    forced: false,
    visible: true,
  });

  player.addTeammate('64fb990d-5c85-43cd-a3b1-98a44b385493');

  setTimeout(() => {
    player.removeTeammate('64fb990d-5c85-43cd-a3b1-98a44b385493');
    player.removeAllWaypoints();
  }, 5000);
});
