
var Translator = require(__dirname+'/Translator');
var utils = require('util');

function TimeTranslator() {
}

utils.inherits(TimeTranslator, Translator);

TimeTranslator.prototype.ToDataPoint = function(value) {
    var buf = new Buffer(3);
    buf[0] = (value.dow << 5) + value.h;
    buf[1] = value.m;
    buf[2] = value.s;

    return buf;
};

TimeTranslator.prototype.FromDataPoint = function(buf) {

    var res = {
        dow: buf[0] >>> 5,
        h: buf[0] & 31,
        m: buf[1],
        s: buf[2]
    };
    
    return res;
};

module.exports = TimeTranslator;
