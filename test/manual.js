const { InstantConnectProxy } = require('prismarine-proxy');
const { LCPlayer, ServerRule } = require('../src');

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
    // host: 'localhost',
    // port: 25568,
  },
});

proxy.on('incoming', (data, meta, toClient, toServer) => {
  toClient.write(meta.name, data);
  // if (meta.name === 'custom_payload')
  //   console.log(Buffer.from(data.data).toString('ascii'), data);
});

proxy.on('outgoing', (data, meta, toClient, toServer) => {
  toServer.write(meta.name, data);
  // if (meta.name === 'custom_payload') console.log(data);
});

proxy.on('start', (client) => {
  const player = new LCPlayer(client);
  // player.addCooldownManual('bow', 9000, 261);
  player.addCooldownManual('pearl', 16000, 368);
  // player.setStaffModeState(StaffMod.XRAY, true);
  player.setServerRule(ServerRule.LEGACY_COMBAT, true);
  console.log(player.addModSetting('bossbar', false, { sendPacket: false }));
  console.log(player.addModSetting('freelook', false));
  // setTimeout(() => {
  //   player.removeCooldownManual('pearl');
  // }, 1500);
});
