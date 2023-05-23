# host
A Host is a File based Task Manager / Queue. it implements a REPL with file interfaces.

## Concepts
in unix and bsd you can pipe files as input and output file descriptors / handels
this implements the same concept based on a supplyed directory

### Usage
```
awesomeos-host path or pwd gets used
```
<pre>
creates /bin equal to linux bin holds executeable tasks
creates /dev/ equal to linux dev holds input output for devices.
creates /dev/stdin,stderr,stdout links to tasks/self you will write to this file
creates /run equal to linux run holds taskId mappings
./components.js link ../tasks/components.js and runs it
creates /run.socket offers a REPL to the current running host equal to a shell session.
creates /tasks equal to linux proc all files in this directory represent running tasks. including
./self/2 stderr, 1 stdout, 0 stdin, ./components.js  equal to linux cloudinit but written in ECMAScript is equal to the package or dockerfile.
</pre>

if you execute it and it is already running it will return a new peerconnection additional to the inital one so that you can connect to 
the hosts and tasks remote like you would do with ssh as a whole or indipendent is equal to a linux shell.

```
awesomeos-shell path or pwd gets used
```
gives you a live repl for the running host via the run.socket 


a minimal fs to run on. needs /tasks/tasks.js and tasks.js would need to export a transform stream implementation for the optional input content.
or a readablestream for a one off task

```
awesomeos-run path or pwd gets used
```

directly returns the output of the execution 
