const { assert } = require('chai');

const createBoth = require('./clientServerGenerator');
const { LCPlayer, WaypointColor } = require('../src');

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
      server.close();
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

  it('Add two waypoints', (done) => {
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
      server.close();
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
      server.close();
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
      server.close();
    });
  });

  it('Remove all waypoints', (done) => {
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
        server.close();
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
