require('should');

var Translator = require(__dirname + '/../../src/Translator/index.js');

describe('knx translator celsius test suite', function() {

    it('test transform up and down', function() {
        var temp = -30;
        var buf = Translator('9.001').ToDataPoint(temp);
        var nt = Translator('9.001').FromDataPoint(buf);
        temp.should.equal(nt);
    });

    it('try some known values', function() {
        var values = [
            {
                data: new Buffer([1, 244]),
                rv: 5
            },{
                data: new Buffer([4, 134]),
                rv: 11.58
            },{
                data: new Buffer([137, 235]),
                rv: -31.14
            }
        ];
        values.forEach(function(v) {
            v.rv.should.equal(Translator('9.001').FromDataPoint(v.data));
            Buffer.compare(v.data, Translator('9.001').ToDataPoint(v.rv)).should.equal(0);
        });
    });
});

describe('knx translator time test suite', function() {

    function testEq(a, b) {
        a.dow.should.equal(b.dow);
        a.h.should.equal(b.h);
        a.m.should.equal(b.m);
        a.s.should.equal(b.s);
    }

    it('test transform up and down', function() {
        var time = {
            dow: 0, // monday
            h: 1, // 1 am
            m: 32, // 32 minutes
            s: 12 // 12 secs
        };
        var buf = Translator('10.001').ToDataPoint(time);
        var nt = Translator('10.001').FromDataPoint(buf);

        testEq(time, nt);
    });
});

describe('knx translator date test suite', function() {

    function testEq(a, b) {
        a.y.should.equal(b.y);
        a.m.should.equal(b.m);
        a.d.should.equal(b.d);
    }

    it('test transform up and down', function() {
        var date = {
            y: 1990, // 1990
            m: 1, // jan
            d: 1
        };
        var buf = Translator('11.001').ToDataPoint(date);
        var nt = Translator('11.001').FromDataPoint(buf);

        testEq(date, nt);
    });

    it('try some known values', function() {
        var values = [
            {
                data: new Buffer([4, 5, 99]),
                rv: {
                    y: 1999,
                    m: 5,
                    d: 4
                }
            },{
                data: new Buffer([3, 5, 1]),
                rv: { 
                    y: 2001,
                    m: 5,
                    d: 3
                }
            },{
                data: new Buffer([3, 5, 0]),
                rv: { 
                    y: 2000,
                    m: 5,
                    d: 3
                }
            }
        ];
        values.forEach(function(v) {
            testEq(v.rv, Translator('11.001').FromDataPoint(v.data));
            Buffer.compare(v.data, Translator('11.001').ToDataPoint(v.rv)).should.equal(0);
        });
    });
});

describe('knx translator datetime test suite', function() {

    function testEq(a, b) {
        (parseInt(a.getTime() / 1000)).should.equal(parseInt(b.getTime() / 1000));
    }

    it('test transform up and down', function() {
        var t = new Date();
        var buf = Translator('19.001').ToDataPoint(t);
        var nt = Translator('19.001').FromDataPoint(buf);

        testEq(t, nt);
    });
});

describe('knx translator percent test suite', function() {

    it('test transform up and down', function() {
        var t = 100;
        var buf = Translator('5.001').ToDataPoint(t);
        var nt = Translator('5.001').FromDataPoint(buf);

        t.should.equal(nt);
    });

    it('try some known values', function() {
        var values = [
            {
                data: new Buffer([0]),
                rv: 0
            },{
                data: new Buffer([0xff]),
                rv: 100
            }
        ];
        values.forEach(function(v) {
            v.rv.should.equal(Translator('5.001').FromDataPoint(v.data));
            Buffer.compare(v.data, Translator('5.001').ToDataPoint(v.rv)).should.equal(0);
        });
    });
});
