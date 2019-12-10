
# Getting started - Browser
##### Browser requirement: https://caniuse.com/#search=webSocket

* First things first: Be sure to include/import the event-broadcast library before any of your codes:
    ````html
    <script src="https://unpkg.com/event-broadcast@latest"></script>
    ````
    If you don't do this, you will get a lot of undefined errors.  You can put it in either the `<head>` or the `<body>` of your HTML.

* Create a script tag - `<script></script>` then add the following code inside of it:

    ````javascript
    var anyVariableName = new Ca$t();
    ````

  This is the code that will initialize a connection and save it in the `anyVariableName` variable.  `anyVariableName` can be any text like `chat` or `lobby` for example.

*   There are 2 methods that you need to know:
    *  `Ca$t.on()` : Listen/wait for an event.
       ##### E.g.
       ````javascript
       Ca$t.on('event-name', function(data){
           console.log(data.payload.message)
           })
       ````
    *  `Ca$t.emit()`: Emit/tells your application that something/an event happened.
       ##### E.g.
       ````javascript
       Ca$t.emit('event-name', {message: 'Hello World!'})
       ````

*  Listen for a successful connection event: 
    ````javascript
    anyVariableName.on('connect', function () {
        // The rest of your codes go here...
    });
    ````
    Just like how you need to know a song before you can sing it or have a beer before you can drink it.  Your application needs to be connected before it can communicate.
    The piece of code above ensures that your application is connected before the rest of your codes get executed.

* Now, let's create and fire event:
    ````javascript
    anyVariableName.emit('new-user-connected');
    ````
    That's it, you've created and fired an event.  BTW, `new-user-connected` can be any text.
    Your code should now look like this
    ````html
    <script src="https://unpkg.com/event-broadcast@latest"></script>
    <script>
        var anyVariableName = new Ca$t();
        anyVariableName.on('connect', function () {
            anyVariableName.emit('new-user-connected');
        });
    </script> 
    ````

* Creating and firing an event is easy and all but it is useless if you don't do anything about it.  Now we will create an event listener that will do something whenever an event is fired:
    ````javascript
    anyVariableName.on('new-user-connected', function(data){
        console.log('A new user has connected');
    });
    ````
    That was it! If you open your code in 2 separate tabs or windows then open the console (F12).  You should see the message `A new user has connected` on one of them.

    When you emit an event, your application will `broadcast` that event to the rest of the users/clients that are connected.

* Next, let's send a message to other browsers/applications.  First add the following codes:
    ````javascript
    anyVariableName.on('new-chat-message', function(data){
        console.log('Message: ' + data.payload.msg);
    });
    ````

    You code should now look like this:
    ````html
    <script src="https://unpkg.com/event-broadcast@latest"></script>
    <script>
        var anyVariableName = new Ca$t();
        anyVariableName.on('connect', function () {
            anyVariableName.emit('new-user-connected');
            anyVariableName.on('new-user-connected', function (data) {
                console.log('A new user has connected');
            });
            anyVariableName.on('new-chat-message', function(data){
                console.log('Message: ' + data.payload.msg);
            });
        });
    </script> 
    ````

    * Open your html again in 2 tabs then open the console (F12).
    * Type the following code in the console:
        ````javascript
        anyVariableName.emit('new-chat-message', {msg:'Hello World!'})
        ````
        then hit enter.
    * You should see the message `Message: Hello World!` on the other browser's console.