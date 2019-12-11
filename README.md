# event-broadcast: A dumified WebSocket wrapper

## Why did we build event-broadcast?
*  Our goal is to make the learning curve to create websockets and real time applications lower. 

## Why use event-broadcast?
*  Multi platform: browsers, apps, servers - Anywhere JavaScript can run that allows WebSockets
*  No server needed to get started.
*  Free (Paid tier possible in the future)
*  Get started in a few lines of code:  Seriously, copy the following code and put it in the `<body>` of you html then open your html multiple times and see them communicate with each other immediately.

#### In the browser:
````html
<script src="https://unpkg.com/event-broadcast@latest"></script>
<script>
    var chat = new Ca$t();
    chat.on('open', function () {
        chat.emit('new-user-connected', {
            type: 'Browser'
        });
        chat.on('new-user-connected', function (data) {
            console.log('A new client has connected: ' + data.payload.type)
        });
    });
</script>
````
##### This may feel like a bunch of magic but, if you put the codes above to any of your pages, those pages will start communicating with each other.

#### In a NodeJs server:
````js
var Ca$t = require('event-broadcast');

var chat = new Ca$t('https://www.my-super-awesome-domain.com');
chat.on('open', function () {
    chat.emit('new-user-connected', {type: 'Server'});
    chat.on('new-user-connected', function(data){
        console.log('A new client has connected: ' + data.payload.type)
    });
});
````
# API Docs:
### `Ca$t('domain')`:
The constructor that initialize the connection. The `domain` parameter is not required.  The library will try to automatically detect your domain or host name.  It is recommended to provide your domain name to make sure your applications (website or servers) are in the same channel and ablet to communicate with each other.
### Parameters:
#### `domain` : `(String) Not required`
The string that will identify your application's channel (Usually your app's domain).  All apps that share the same domain will be in the same channel, this includes webapps, mobile apps and node servers.
````javascript
let mainChannel = new Ca$t('https://domain.com');
````
---
### `Ca$t.emit('event-name', {payload})`:
Creates and fires an event along with a payload if provided.
### Parameters:
#### `event-name` : `(String) Required`
The event identifier that will be emitted/fired.  This must match the event listener.
#### `{payload}` : `(JSON) Not required`
The data that will be broadcasted to everyone.
````javascript
mainChannel.on('event-name', {someData: 'Hello World!'});
````
---
### `Ca$t.on('event-name', callBack(data))`: Listens to an event then fires `callBack()`.
#### Parameters:

##### `event-name` : `(String) Required`
The event identifier that the event listener will listen to.  This must match the exact event name.

##### `callBack(data)` : `(callable function) Required`
The function that will be executed once the event is fired.  If the event is fired with a payload, the callback will receive a parameter conatining the data.
````javascript
mainChannel.on('event-name', function(data){ console.log(data.payload.someData)});
````
---
### Built in events:
* `close`: Fired when connection is closed or disconnected.
    * Alias: `onclose`
* `error`: Fired when an error occur.
    * Alias: `onerror`
* `onmessage`: Fired when a new message is received.
    * Alias:
* `connect`: Fired on successfull connection.
    * Alias: `open`, `onopen`, `onconnect`

###### * Note:  Nothing you do in the internet is private thus use this software with caution.