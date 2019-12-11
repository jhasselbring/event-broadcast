const assert = require('chai').assert;
const Ca$t = require('../event-broadcast');

describe('App', function () {
    it('App should connect to the WebSocket', function () {
        var test = new Ca$t('test');
        assert.isOk(
            test.on('open', function () {
            test.close();
        }), 'Connected');
    })
})