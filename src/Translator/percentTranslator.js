
var Translator = require(__dirname+'/Translator');
var utils = require('util');

function PercentTranslator() {
}

utils.inherits(PercentTranslator, Translator);

PercentTranslator.prototype.ToDataPoint = function(value) {
    var buf = new Buffer(1);
    buf[0] = value;
    return buf;
};

PercentTranslator.prototype.FromDataPoint = function(buf) {
    return buf[0];
};

module.exports = PercentTranslator;
