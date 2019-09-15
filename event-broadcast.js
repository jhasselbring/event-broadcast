(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["ca$t"] = factory();
    else
        root["ca$t"] = factory();
})(this, function () {
    return (function () {
        var domain = 'localhost';
        if(typeof window != 'undefined'){
            var WebSocket = require('ws');
            domain = window.location.hostname.replace(/\W/g, '-')
        }
        return {
            domain: domain,
            channel:'_',
            callbacks:[],
            connect: function (server = null) {
                var self = this;
                if(server === null) server = "ws://connect.websocket.in/";
                this.connection = new WebSocket(server + this.domain + '?room_id=' + this.channel);
                this.connection.onmessage = function(e) {
                    e = JSON.parse(e.data);
                    try{
                        self.callbacks[e.event](e.payload);
                    }
                    catch(err){}
                };
            },
            emit: function (event, payload = null) {
                var message = {};
                message.event = event;
                message.payload = payload;
                this.connection.send(JSON.stringify(message));
            },
            on:function (name, cb) {
                if (typeof cb === 'function') {
                    this.callbacks[name] = cb;
                }else{
                    console.error('Callback needs to be a function')
                }
            }
        }
    })();
});
;