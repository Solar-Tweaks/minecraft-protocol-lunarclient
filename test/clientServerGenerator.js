const {
  createServer: _createServer,
  createClient: _createClient,
} = require('minecraft-protocol');

let port = 25565;

module.exports = () => {
  function createServer() {
    port++;
    return _createServer({
      'online-mode': false,
      version: '1.8.9',
      port,
      validateChannelProtocol: false,
    });
  }

  function createClient() {
    return _createClient({
      username: 'test',
      version: '1.8.9',
      host: 'localhost',
      port,
      validateChannelProtocol: false,
    });
  }

  const server = createServer();
  const client = createClient();
  return { server, client };
};
