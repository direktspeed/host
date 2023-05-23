const net = require('node:net');
const repl = require('node:repl');
const fs = require('node:fs/promises');

const path = process.argv.find(a=>a.startsWith('PATH=')) || process.cwd;
const listen = () => {
  let connections = 0;

  repl.start({
    useGlobal: true,
    prompt: 'Node.js via stdin> ',
    input: process.stdin,
    output: process.stdout,
  });

  net.createServer((socket) => {
    connections += 1;
    useGlobal: true,
    repl.start({
      prompt: 'Node.js via Unix socket> ',
      input: socket,
      output: socket,
    }).on('exit', () => {
      socket.end();
    });
  }).listen(`${path}.sock`);  
}

const init = () => fs.readdir(path).then(
  listen, async _doesNotExist => {
    return fs.mkdir(path,{recursive:true}).then(listen);
  }
)
