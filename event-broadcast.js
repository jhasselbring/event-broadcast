if(typeof window == 'undefined'){
    var WebSocket = require('ws'),
        os = require('os');
}

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
            domain = window.location.hostname.replace(/\W/g, '-')
        }else{
            domain = os.hostname();
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
                    if(name === 'onclose' || name === 'close'){
                        this.connection.onclose = cb;
                        return true;
                    }
                    else if(name === 'onerror' || name === 'error'){
                        this.connection.onerror = cb;
                        return true;
                    }
                    else if(name === 'onmessage'){
                        console.error(name + ' is a reserved event');
                        return false;
                    }
                    else if(name === 'onopen' || name === 'open' || name === 'connect' || name === 'onconnect'){
                        this.connection.onopen = cb;
                        return true;
                    }
                    else{
                        this.callbacks[name] = cb;
                        return true;
                    }
                }else{
                    console.error('Callback needs to be a function');
                    return false;
                }
            },
            setDomain:function (domain) {
                var regex = RegExp('/[A-Za-z0-9\-_]{2,20}/');
                if(regex.test(domain)){
                    console.error('Domain contains characters that are not allowed  Must be alphanumeric, -, _ and between 2 and 20 characters long');
                }else{
                    this.domain = domain;
                    return true;
                }
            }
        }
    })();
});
;