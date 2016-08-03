
var celsiusTranslator = require('./celsiusTranslator.js');

var singletons = {};

function TranslatorFactory(type) {
    if (singletons[type])
        return singletons[type];

    var t;

    switch(type) {
        case '9.001':
            t = new celsiusTranslator();
            break;
        default:
            throw new Error('Unknown type');
    }

    // Save reference
    singletons[type] = t;
    return t;
}

module.exports = TranslatorFactory;
