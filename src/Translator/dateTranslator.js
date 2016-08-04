
var Translator = require(__dirname+'/Translator');
var utils = require('util');

function DateTranslator() {
}

utils.inherits(DateTranslator, Translator);

DateTranslator.prototype.ToDataPoint = function(value) {
    var buf = new Buffer(3);
    buf[0] = value.d;
    buf[1] = value.m;
    buf[2] = value.y % 100;

    return buf;
};

DateTranslator.prototype.FromDataPoint = function(buf) {

    var res = {
        d: buf[0],
        m: buf[1],
        y: (buf[2] >= 90 ? 1900 : 2000) + buf[2]
    };
    
    return res;
};

module.exports = DateTranslator;
