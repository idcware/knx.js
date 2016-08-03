
function Translator() {
}

Translator.prototype.FromDataPoint = function(data) {
    throw new Error('Not implemented');
};

Translator.prototype.ToDataPoint = function(data) {
    throw new Error('Not implemented');
};

module.exports = Translator;
