const { assert } = require('chai');

const {
  createServer: _createServer,
  createClient: _createClient,
} = require('minecraft-protocol');
const { LCPlayer, WaypointColor } = require('../src');

let port = 25565;

describe('Plugin channel registration', () => {
  it('Default channel', (done) => {
    const { server, client } = createBoth();
    client.on('packet', (data, meta) => {
      if (meta.name === 'custom_payload')
        if (data.channel === 'REGISTER') {
          assert.equal(data.data.toString('ascii'), 'lunarclient:pm');
          done();
          client.end();
        }
    });
    server.on('login', (client) => {
      new LCPlayer(client);
      client.end();
    });
  });

  it('Alternative channel', (done) => {
    const { server, client } = createBoth();
    client.on('packet', (data, meta) => {
      if (meta.name === 'custom_payload')
        if (data.channel === 'REGISTER') {
          assert.equal(data.data.toString('ascii'), 'Lunar-Client');
          done();
          client.end();
        }
    });
    server.on('login', (client) => {
      new LCPlayer(client, 'Lunar-Client');
      client.end();
    });
  });
});

describe('Waypoints', () => {
  it('Add waypoint', (done) => {
    const { server, client } = createBoth();
    let packetCount = 0;
    client.on('packet', (data, meta) => {
      if (meta.name !== 'custom_payload') return;
      packetCount++;
      if (packetCount !== 2) return;
      assert.equal(
        data.data.toString('hex'),
        '1708576179706f696e740000ff00000000002a00000045000000110001'
      );
      done();
    });
    server.on('login', (client) => {
      const player = new LCPlayer(client);
      player.addWaypoint({
        name: 'Waypoint',
        color: WaypointColor.RED,
        x: 42,
        y: 69,
        z: 17,
        forced: false,
        visible: true,
      });
    });
  });

  it('Add two waypoint', (done) => {
    const { server } = createBoth();
    server.on('login', (client) => {
      const player = new LCPlayer(client);
      const waypoint = {
        name: 'Waypoint',
        color: WaypointColor.RED,
        x: 42,
        y: 69,
        z: 17,
        forced: false,
        visible: true,
      };
      player.addWaypoint(waypoint);
      assert.notOk(player.addWaypoint(waypoint));
      done();
    });
  });

  it('Remove waypoint', (done) => {
    const { server, client } = createBoth();
    let packetCount = 0;
    client.on('packet', (data, meta) => {
      if (meta.name !== 'custom_payload') return;
      packetCount++;
      if (packetCount !== 3) return;
      assert.equal(data.data.toString('hex'), '1808576179706f696e7400');
      done();
    });
    server.on('login', (client) => {
      const player = new LCPlayer(client);
      player.addWaypoint({
        name: 'Waypoint',
        color: WaypointColor.RED,
        x: 42,
        y: 69,
        z: 17,
        forced: false,
        visible: true,
      });
      player.removeWaypoint('Waypoint');
    });
  });

  it('Remove unknown waypoint', (done) => {
    const { server } = createBoth();
    server.on('login', (client) => {
      const player = new LCPlayer(client);
      assert.notOk(player.removeWaypoint('UnknownWaypoint'));
      done();
    });
  });

  it('Remove all waypoint', (done) => {
    const { server, client } = createBoth();
    let packetCount = 0;
    client.on('packet', (data, meta) => {
      if (meta.name !== 'custom_payload') return;
      packetCount++;
      if (packetCount === 4)
        assert.equal(data.data.toString('hex'), '1808576179706f696e7400');
      if (packetCount === 5) {
        assert.equal(data.data.toString('hex'), '180a576179706f696e74203200');
        done();
      }
    });
    server.on('login', (client) => {
      const player = new LCPlayer(client);
      player.addWaypoint({
        name: 'Waypoint',
        color: WaypointColor.RED,
        x: 42,
        y: 69,
        z: 17,
        forced: false,
        visible: true,
      });
      player.addWaypoint({
        name: 'Waypoint 2',
        color: WaypointColor.BLUE,
        x: 17,
        y: 42,
        z: 69,
        forced: true,
        visible: false,
      });
      player.removeAllWaypoints();
    });
  });
});

function createBoth() {
  function createServer() {
    port++;
    return _createServer({
      'online-mode': false,
      version: '1.8.9',
      port,
    });
  }

  function createClient() {
    return _createClient({
      username: 'test',
      version: '1.8.9',
      host: 'localhost',
      port,
    });
  }

  const server = createServer();
  const client = createClient();
  return { server, client };
}
