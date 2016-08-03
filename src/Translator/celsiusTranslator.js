
var Translator = require(__dirname+'/Translator');
var utils = require('util');

function CelsiusTranslator() {
}

utils.inherits(CelsiusTranslator, Translator);

CelsiusTranslator.prototype.ToDataPoint = function(value) {
    var mantissa = Math.round(Math.abs(100 * value));

    // Calculate exponent needed
    var exp = 0;
    while (mantissa > 2047) {
        mantissa /= 2;
        exp++;
    }
    
    if (value < 0)
        mantissa = ((mantissa^2047) +1);

    var sbit = value < 0 ? 1 : 0;

    var result = (sbit << 15) + (exp << 11) + mantissa;
    var buf = new Buffer(2);
    buf.writeUInt16BE(result, 0);

    return buf;
};

CelsiusTranslator.prototype.FromDataPoint = function(data) {
    var num = data.readUInt16BE(data, 0);

    var sbit = num >> 15;
    var exp = (num&32767) >> 11;
    var mantissa = (num&2047);

    if (sbit)
        mantissa = ((mantissa - 1)^2047);

    return (sbit ? -1 : 1) * (Math.pow(2, exp) * mantissa) / 100;
};

module.exports = CelsiusTranslator;
