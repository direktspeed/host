const net = require('node:net');
const repl = require('node:repl');
const fs = require('node:fs/promises');

const path = process.argv.find(a=>a.startsWith('PATH=')) || process.cwd;

const replListen = (socket) => {
      connections += 1;
      useGlobal: true,
      repl.start({
        prompt: 'Node.js via Unix socket> ',
        input: socket,
        output: socket,
      }).on('exit', () => {
        socket.end();
      });
    }

const listen = async () => {
  let connections = 0;  
  await fs.readFile(`${path}.sock`).then(
    () => [net.createConnection({path})].map(replListen)),
    fs.unlink(`${path}.sock`)).then(()=>{
      net.createServer(replListen).listen(`${path}.sock`);
    })
}

const init = () => fs.readdir(path).then(
  listen, _doesNotExist => {
    return fs.mkdir(path,{recursive:true}).then(listen);
  }.catch(console.error)
)

repl.start({ useGlobal: true, prompt: 'Node.js via stdin> ', input: process.stdin, output: process.stdout, });

process.on('exit',() => fs.unlink(`${path}.sock`))
