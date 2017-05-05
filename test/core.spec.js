var assert = require('assert');

var x = require('../index.js');

describe('core', function () {
  describe('#x.type(object)', function () {
    it('type -> bool', function () {
      assert.equal(x.type(true), 'boolean');
    });

    it('type -> number', function () {
      assert.equal(x.type(1), 'number');
    });

    it('type -> string', function () {
      assert.equal(x.type('string'), 'string');
    });

    it('type -> date', function () {
      assert.equal(x.type(new Date), 'date');
    });

    it('type -> object', function () {
      assert.equal(x.type({}), 'object');
    });
  });

  describe('#x.isArray(object)', function () {
    it('should return true when the value is Array', function () {
      assert.equal(x.isArray([2, 4, 6]), true);
    });

    it('should return true when the value is String', function () {
      assert.equal(x.isArray('a'), false);
    });
  });

  describe('#x.isFunction(object)', function () {
    it('should return true when the object is Function', function () {
      assert.equal(x.isFunction(x.noop), true);
    });

    it('should return true when the object is not Function', function () {
      assert.equal(x.isFunction('abcdefghi'), false);
      assert.equal(x.isFunction(1234567890), false);
    });
  });

  describe('#x.isString(object)', function () {
    it('should return true when the value is String', function () {
      assert.equal(x.isString('abcdefghijklmn'), true);
    });

    it('should return true when the value is Number', function () {
      assert.equal(x.isString(0), false);
    });
  });

  describe('#x.register(value)', function () {
    it('should create empty object when the object is not exist', function () {
      x.register('tests.core.net');
      assert.equal(!!tests, true);
      assert.equal(!!tests.core, true);
      assert.equal(!!tests.core.net, true);
    });
  });

  describe('#x.ext()', function () {
    it('should return true when the value is Array', function () {
      assert.deepEqual(x.ext({ a: 'a' }, { b: 'b', c: 'c' }), { a: 'a', b: 'b', c: 'c' });
      assert.deepEqual(x.ext(null, { a: 'a' }), { a: 'a' });
    });
  });

  describe('#x.clone(object)', function () {
    it('should return a clone object', function () {
      var obj = x.clone({ a: 'a', b: 'b', c: 'c' });
      assert.deepEqual(obj, { a: 'a', b: 'b', c: 'c' });
    });
  });

  describe('#x.declare(object)', function () {
    it('should return true when the value is Array', function () {
      // 定义一个对象
      x.declare('a.B', {
        name: 'A',
        age: 10,
        constructor: function () {
          this.name = 'B';
        }
      });

      var obj = new a.B();

      assert.equal(obj.name, 'B');

      // 定义一个对象
      var T = x.declare({
        name: 'T',
        constructor: function () {
          // this.name = 'B';
        }
      });

      var obj = new T();

      assert.equal(obj.name, 'T');
    });
  });

  describe('#x.invoke(object, fn)', function () {
    it('should return true when the value is Array', function () {

      var obj = { name: 'a' };

      var setName = function (name) {
        this.name = name;
      }

      x.invoke(obj, setName, 'b');

      assert.equal(obj.name, 'b');
    });
  });

  describe('#x.call(anything)', function () {
    // 定义变量
    var anything, result;

    it('should call function when the anything is Function', function () {
      anything = function () { return 100; }
      result = x.call(anything);
      assert.equal(result, 100);
    });

    it('should eval string code when the anything is String', function () {
      anything = '1+1;';
      result = x.call(anything);
      assert.equal(result, 2);
    });
  });

  describe('#x.serialize(object)', function () {
    it('should return true when the value is Array', function () {
      var obj = x.serialize({ a: '1', b: '2', c: '3' });
      assert.equal(obj, 'a=1&b=2&c=3');
    });
  });

  describe('#x.each(data, callback)', function () {
    it('should return data when the data is Array', function () {
      var outString = '';

      x.each(['c', 'b', 'a'], function (index, node) {
        outString += '[' + index + ']=' + node + ' ';
      });

      outString = x.string.trim(outString, ' ');

      assert.equal('[0]=c [1]=b [2]=a', outString);
    });

    it('should return text when the data is Object', function () {
      var outString = '';

      x.each({ '0': 'c', '1': 'b', '2': 'a' }, function (name, value) {
        outString += '[' + name + ']=' + value + ' ';
      });

      outString = x.string.trim(outString, ' ');

      assert.equal('[0]=c [1]=b [2]=a', outString);
    });
  });

  describe('#x.toJSON(text)', function () {
    it('should return json when the json string', function () {
      var results = [
        { "name": "1", "b": "2", "c": "3" },
        '{ "name": "1", "b": "2", "c": "3" }',
        '{ name: "1", "b": "2", "c": "3" }',
        null,
        undefined
      ];

      for (var i = 0; i < results.length; i++) {
        var result = x.toJSON(results[i]);

        if (x.type(results[i]) == 'undefined') {
          assert.equal(result, undefined);
        }
        else if (x.type(results[i]) === 'null') {
          assert.equal(result, null);
        } else {
          assert.equal(x.type(result), 'object');
          assert.equal(result.name, '1');
        }
      }
    });
  });

  describe('#x.toSafeJSON(text)', function () {
    it('should return json text when the value is \\t\\n\\f', function () {
      var text = x.toSafeJSON('abcdef\/\b\n\r\t\f');
      assert.equal(text, 'abcdef\\\/\\b\\n\\r\\t\\f');
    });
  });

  describe('#x.toSafeLike(text)', function () {
    it('should return like value', function () {
      assert.equal(x.toSafeLike('[%_]'), '[[][%][_]]');
    });
  });

  describe('#x.cdata(text)', function () {
    it('should return CDATA text', function () {
      var text = 'a';
      assert.equal(x.cdata(text), '<![CDATA[' + text + ']]>');
    });
  });

  describe('#x.camelCase(text)', function () {
    it('should return "abc" when the text is "Abc"', function () {
      assert.equal(x.camelCase('abc-def-ghi'), 'abcDefGhi');
    });
  });

  describe('#x.guid.create(format, isUpperCase)', function () {
    it('should return guid xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', function () {
      assert.equal(x.guid.create().length, 36);
    });

    it('should return guid xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', function () {
      assert.equal(x.guid.create('').length, 32);
    });

    it('should return guid XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', function () {
      assert.equal(x.guid.create('-', true).length, 36);
    });
  });

  describe('#x.randomText.create(length, buffer)', function () {
    it('should return random text', function () {
      assert.equal(x.randomText.create().length, 8);
      assert.equal(x.randomText.create(10).length, 10);
    });
  });

  describe('#x.nonce(length)', function () {
    it('should return random number', function () {
      assert.equal(String(x.nonce()).length, 6);
      assert.equal(String(x.nonce(8)).length, 8);
    });
  });

  describe('debug', function () {
    it('should output logging', function () {
      x.debug.log('\t==> log');
      assert.ok(1);

      x.debug.warn('\t==> warn');
      assert.ok(1);

      x.debug.error('\t==> error');
      assert.ok(1);

      // x.debug.assert("a"=="c");

      x.debug.time('\tdebug-method');
      x.debug.timeEnd('\tdebug-method');

      // 输出时间戳
      var timestamp = x.debug.timestamp();
      var date = x.date.now();
      // x.debug.error(timestamp + ' ' + date.toString('{yyyy-MM-dd HH:mm:ss.fff}'));
      assert.equal(timestamp.indexOf(date.toString('{yyyy-MM-dd HH:mm:ss')), 0);
    });
  });
});
