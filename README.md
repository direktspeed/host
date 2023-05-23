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
creates /dev/input you will write to this file
creates /run equal to linux run holds taskId mappings
creates /run.socket offers a REPL to the current running host equal to a shell session.
creates /tasks equal to linux proc
creates /var/log/output you will read this file

</pre>

if you execute it and it is already running it will return a peerconnection so that you can connect to 
tasks remote as a whole or indipendent is equal to a linux shell.



```
awesomeos-shell path or pwd gets used
```
gives you a live repl for the running host via the run.socket 
