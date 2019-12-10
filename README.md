# event-broadcast: A dumified WebSocket wrapper

## Why did we build event-broadcast?
* #### Our goal is to make the learning curve to create websockets and real time applications lower. 

## why use event-broadcast?
* #### Multi platform: browsers, apps, servers - Anywhere JavaScript can run that allows WebSockets
* #### No server needed to get started.
* #### Free (Paid tier possible in the future)
* #### Get started in a few lines of code:  Seriously, copy the following code and put it in the `<body>` of you html then open your html multiple times and see them communicate with each other immediately.

#### Client side:
````html
<script src="https://unpkg.com/event-broadcast@latest"></script>
<script>
    var chat = new Ca$t();
    chat.on('open', function () {
        console.log('Connected');
        chat.emit('new-user-connected', {
            type: 'Browser'
        });
        chat.on('new-user-connected', function (data) {
            console.log('A new client has connected: ' + data.payload.type)
        });
        chat.on('m', function (data) {
            console.log('The message is: ' + data.payload.mymessage);
        })
    });
</script>
````
##### This may feel like a bunch of magic but, if you put the codes above to any of your pages, those pages will start communicating with each other.

#### Server side:
````js
var Ca$t = require('event-broadcast');

var chat = new Ca$t('https://www.my-super-awesome-domain.com');
chat.on('open', function () {
    console.log('Connected');
    chat.emit('new-user-connected', {type: 'Server'});
    chat.on('new-user-connected', function(data){
        console.log('A new client has connected: ' + data.payload.type)
    });
    chat.on('m', function (data) {
        console.log('The message is: ' + data.payload.mymessage);
    })
});
````

###### * Note:  Nothing you do in the internet is private thus use this software with caution.