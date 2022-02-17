const { InstantConnectProxy } = require('prismarine-proxy');
const { LCPlayer, convertHexColor } = require('../src');

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
});
