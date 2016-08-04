
var celsiusTranslator = require('./celsiusTranslator.js');
var timeTranslator = require('./timeTranslator.js');
var dateTranslator = require('./dateTranslator.js');
var dateTimeTranslator = require('./dateTimeTranslator.js');
var percentTranslator = require('./percentTranslator.js');

var singletons = {};

function TranslatorFactory(type) {
    if (singletons[type])
        return singletons[type];

    var t;

    switch(type) {
        case '5.001':
            t = new percentTranslator();
            break;
        case '9.001':
            t = new celsiusTranslator();
            break;
        case '10.001':
            t = new timeTranslator();
            break;
        case '11.001':
            t = new dateTranslator();
            break;
        case '19.001':
            t = new dateTimeTranslator();
            break;
        default:
            throw new Error('Unknown type');
    }

    // Save reference
    singletons[type] = t;
    return t;
}

module.exports = TranslatorFactory;
