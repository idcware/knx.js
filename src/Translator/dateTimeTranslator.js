
var Translator = require(__dirname+'/Translator');
var utils = require('util');

function DateTimeTranslator() {
}

utils.inherits(DateTimeTranslator, Translator);

DateTimeTranslator.prototype.ToDataPoint = function(value) {

    var buf = new Buffer(8);

    buf[0] = value.getYear() - 1900;
    buf[1] = value.getMonth();
    buf[2] = value.getDate();
    buf[3] = ((value.getDay() != 0 ? value.getDay() : 7) << 5) + (value.getHours() & 31);
    buf[4] = value.getMinutes();
    buf[5] = value.getSeconds();

    buf[6] = 32; // NWD
    buf[7] = 0;

    return buf;
};

DateTimeTranslator.prototype.FromDataPoint = function(buf) {

    var res = new Date();

    if (((buf[6] >>> 4) & 1) === 0)
        res.setYear(1900 + buf[0]);

    if (((buf[6] >>> 3) & 1) === 0) {
        res.setMonth(buf[1]);
        res.setDate(buf[2]);
    }

    if (((buf[6] >>> 1) & 1) === 0) {
        res.setHours(buf[3] & 31 + (res.getTimezoneOffset() / 60));
        res.setMinutes(buf[4]);
        res.setSeconds(buf[5]);
    }
    return res;
};

module.exports = DateTimeTranslator;
