# host
A Host is a File based Task Manager / Queue. it implements a REPL with file interfaces.

## Concepts
in unix and bsd you can pipe files as input and output file descriptors / handels
this implements the same concept based on a supplyed directory

### Usage
```
awesomeos-host path or pwd gets used
```

creates tasks/available
creates tasks/run
creates tasks/output

under each directory you will find 
/taskId/output 
which contains at last ./stdout, ./stderr and any additional produced files if there are any.

if you execute it and it is already running it will return a peerconnection so that you can connect to 
tasks remote as a whole or indipendent

available/ contains tasks that are not scheduled or are used to get runned manual eg:
you can use them with a datachannel and only put them into running once the datachannel
is readable. this can also bypass the tasks running done failed directorys in that mode the task simply
emits its results in realtime. 

if tasks/run/id and no matching output id is there you can expect it to be such a peerconnection task.
