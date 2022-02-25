const { assert } = require('chai');

const createBoth = require('./clientServerGenerator');
const { LCPlayer } = require('../src');

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
