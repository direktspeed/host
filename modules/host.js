const net = require('node:net');
const repl = require('node:repl');
const fs = require('node:fs/promises');
const { Duplex, Writable, Readable } = require('node:stream')
const path = process.argv.find(a=>a.startsWith('PATH=')) || process.cwd;
const peers = [];
const RTCPeerConnection = () => {
      const peer = peers[peers.push({})-1];
      peer.ondatachannel = async (channel) => {
            const connection = tryConnect(path); 
            const stream = Duplex.toWeb(connection.input) 
            const input = stream.writable.getWriter();
            channel.onmessage = (msg) => input.write(msg); // replServer.input.push bad idea none generiic?
            for await (const output of stream.readable) {
                  channel.postMessage(output);
            }            
      }
}

//Duplex.toWeb(replListen(Duplex.fromWeb(
// Readable.toWeb(process.stdin),
// Writable.toWeb(process.stdout)
//)))

const replListen = (socket) => {
      replListen.connections = (replListen.connections || 0) += 1;
      return repl.start({
        useGlobal: true,
        prompt: 'Node.js via Unix socket> ',
        input: socket,
        output: socket,
      }).on('exit', () => {
        socket.end();
      });
}

const resetSocket = (path) => () => fs.unlink(`${path}.sock`)).then(()=>{
      net.createServer(replListen).listen(`${path}.sock`);
      return Duplex.toWeb(net.createConnection({path}));
})

const tryConnect = (path) => () => [net.createConnection({path})].map(async (connection) => (
await Duplex.toWeb(connection).readable.getReader().read()
).value.startsWith('Node.js') && Duplex.toWeb(connection)).find(connection=>connection) || resetSocket(path);

const listen = async (path) => 
await fs.readFile(`${path}.sock`).then(
tryConnect(`${path}.sock`), resetSocket(`${path}.sock`)
);

const init = (path) => fs.readdir(path).then(
  listen, _doesNotExist => {
    return fs.mkdir(path,{recursive:true}).then(listen);
  }.catch(console.error)
);

const [_replServer,stream] = init();
Readable.toWeb(process.stdin).pipeTo(stream.writeable);

// repl.start({ useGlobal: true, prompt: 'Node.js via stdin> ', input: process.stdin, output: process.stdout, });
// process.on('exit',() => fs.unlink(`${path}.sock`))
