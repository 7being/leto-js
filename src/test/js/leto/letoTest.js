import leto.js

function testNamespace()
{
    try 
    {
        letotest.b.c.d.e.f.g.h.i;
        fail("should be undefined");
    }
    catch (e)
    {
        leto.namespace("letotest.b.c.d.e.f.g.h.i");
        assertNotUndefined(letotest.b.c.d.e.f.g.h.i);
        letotest = undefined
    }
}

function testSetObject()
{
    try 
    {
        letotest.b.c.d.e.f.g.h.i;
        fail("should be undefined");
    }
    catch (e)
    {
        leto.setObject('letotest.b.c.d.e.f.g.h.i', 3);
        assert(letotest.b.c.d.e.f.g.h.i === 3);
        letotest = undefined
    }
}

function testGetObject()
{
    letotest = {b: {c: {d: {e: {f: {g: {h: {i: 3 }}}}}}}};
    assert(leto.getObject('letotest.b.c.d.e.f.g.h.i') === 3);
    letotest = undefined
}

function testHasObject()
{
    letotest = {b: {c: {d: {e: {f: {g: {h: {i: 3 }}}}}}}};
    assert(leto.hasObject('letotest.b.c.d.e.f.g.h.i'));
    letotest = undefined
}

function testEmptyFn()
{
    for (var prop in leto.emptyFn)
    {
        fail("leto.emptyFn should have properties");
    }
    assertObjectEquals(leto.emptyFn.prototype, {});
    assertUndefined(leto.emptyFn());
}

// TODO test 'testnode' 'whitespace' 'nodeList'
function testType()
{
    //test null undefined
    assertFalse(leto.type());
    assertFalse(leto.type(null));
    //test number
    var c = 1, d = new Number(0);
    assert(leto.type(1) === 'number');
    assert(leto.type(new Number(0)) === 'number');
    //test string
    assert(leto.type('foo bar') === 'string');
    assert(leto.type(new String('robot')) === 'string');
    //test function
    assert(leto.type(function(){}) === 'function');
    assert(leto.type(new Function()) === 'function');
    //test boolean
    assert(leto.type(true) === 'boolean');
    assert(leto.type(new Boolean(false)) === 'boolean');
    //test array
    assert(leto.type([]) === 'array');
    assert(leto.type(new Array) === 'array');
    //test object
    assert(leto.type({}) === 'object');
    assert(leto.type(new Object) === 'object');
    //test NaN
    //assertTrue(leto.type('abc'*3) === false);
    //test date
    assert(leto.type(new Date) === 'date');
    //test arguments	
    //typeof(arguments) in opera is 'array' directly
    //assertTrue(leto.type(arguments) === 'arguments');
    //test element
    assert(leto.type(document.getElementsByTagName("body")[0]) === 'element');
    //test regexp
    assert(leto.type(/^$/) === 'regexp');
}

function testClone()
{
    var o1 = {a:1,b:{a:1,b:2, c:{a:1,b:2,c:3}},c:3};
    var o2 = leto.clone(o1);
    //assert(leto.equal(o1,o2));
    assertObjectEquals(o1, o2)
    assertFalse(o1 === o2);
}

function testEqual()
{
    var a1 = 1, a2 = 1;
    assert(leto.equal(a1,a2));
    var b1 = 1, b2 = '1';
    assertFalse(leto.equal(b1,b2));
    var c1 = 1, c2 = 0;
    assertFalse(leto.equal(c1,c2));
    var d1 = {a:1,b:{a:1,b:2, c:{a:1,b:2,c:3}},c:3};
    var d2 = {b:{a:1,b:2, c:{a:1,b:2,c:3}},c:3,a:1};
    var d3 = {a:1,b:2,c:4};
    assert(leto.equal(d1,d2));
    assertFalse(leto.equal(d2,d3));

    assert(leto.equal('123', new String('123')));
    assert(leto.equal(123, new Number(123)));

    assert(leto.equal(["123", "abc"], ["123", "abc"]));
}

