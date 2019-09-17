# event-broadcast: Simple WebSocket library

### Why another WebSocket library?  See for your self:

* ### Get started in a few lines of codes:
#### Client side:
````html
<script src="https://unpkg.com/event-broadcast@latest"></script>
<script>
ca$t.domain = 'www-your_domain-com';  // Must be alphanumeric, -, _ and between 2 and 20 characters long.  May be omitted once your website is deployed.  It Uses your website's domain by default
ca$t.connect(); // Connect to the interwebs using your website's domain
ca$t.on('connect', function (e) { // Wait for the connection to finish before emitting any events
    ca$t.emit('connected', {"message":"A browser has connected"});  // Broadcast a user defined event called 'connected' then send the 2nd parameter as a payload
});
// The lines of codes above are all you need to start sending/broadcasting events/messages

// Use the codes below to listen to events/messages
ca$t.on('connected', function (e) { // Listen for an event/message
    console.log(e.message);  // Do something with the event/message
});
</script>
````
##### This may feel like a bunch of magic but, if you put the codes above to any of your pages, those pages will start communicating with each other.

#### Server side:
````js
var ca$t = require('event-broadcast');  // make sure you install the package first npm i event-broadcast --save

ca$t.domain = 'www-your_domain-com';  // Must be alphanumeric, -, _ and between 2 and 20 characters long.
ca$t.connect();
ca$t.on('connect', function (e) {
    ca$t.emit('connected', {"message":"Node server has connected"});
});
ca$t.on('connected', function (e) {
    console.log(e.message)
});
````

* ### No server needed to get started
  (..  crickets ...)