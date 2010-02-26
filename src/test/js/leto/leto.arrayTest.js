import leto.js
import leto.array.js

var A = leto.array;

// assoc
function testAssoc()
{
    var s1 = ["colors","red","blue","green"];
    var s2 = ["letters","a","b","c"];
    var s3 = "foo";
    var a = [s1,s2,s3 ];
    assertEquals(s2, A.assoc(a, "letters"));
    assertUndefined(A.assoc(a, "foo"));
}

// at
function testAt()
{
    var a = ["a","b","c","d"];
    assertEquals("d", A.at(a, -1));
    assertEquals("a", A.at(a, 0));
    assertUndefined(A.at(a, -100));
    assertUndefined(A.at(a, 100));
}

// compact
function testCompact()
{
    assertArrayEquals(["a","b","c"], A.compact(["a", null, "b", undefined, "c"]));
}

// each
function testEach()
{
    var a = ["a","b","c","d"];
    var rs = [];
    A.each(a, function(item){ rs.push(item) });
    assertArrayEquals(a, rs);
}

// fill
function testFill()
{
    var a1 = ["a","b","c","d"]
    var a2 = ["a","b","c","d"]
    var a3 = ["a","b","c","d"]
    var a4 = ["a","b","c","d"]
    var a5 = ["a","b","c","d"]
    var a6 = ["a","b","c","d"]
    var a7 = ["a","b","c","d"]
    var s1 = ["x","x","x","x"];
    var s2 = ["x","t","t","t"];
    var s3 = ["a","b","z","z"];
    var s4 = ["z","z","z","d"];
    var s5 = ["a","b","c","d", undefined, undefined, "m","m"];
    var s6 = ["a","b","c","d", undefined, undefined, undefined];
    assertArrayEquals(s1, A.fill(a1, "x"));
    assertArrayEquals(s1, A.fill(a1, "x", -100));
    assertArrayEquals(s2, A.fill(a1, "t", 1));
    assertArrayEquals(s3, A.fill(a2, "z", 2));
    assertArrayEquals(s3, A.fill(a3, "z", 2, 2));
    assertArrayEquals(s3, A.fill(a4, "z", -2));
    assertArrayEquals(s4, A.fill(a5, "z", -6, 3));
    assertArrayEquals(s5, A.fill(a6, "m", 6, 2));
    assertArrayEquals(s6, A.fill(a7, "m", 6, 0));
}

// first
function testFirst()
{
    var a = [1,2,3,4,5];
    assertEquals(1, A.first(a));
    assertUndefined(A.first(a, -1));
    assertArrayEquals([], A.first(a, 0));
    assertArrayEquals([1,2], A.first(a, 2));
    assertArrayEquals([1,2,3,4,5], A.first(a, 7));
}

// flatten
function testFlatten()
{
    var a = [1,2,[3,[4,5]]];
    assertArrayEquals([1,2,3,4,5], A.flatten(a));
}

// include
function testInclude()
{
    var a = [1,2,3,4];
    assert(A.include(a, 1));
    assertFalse(A.include(a, 9));
}

// indexOf
function testIndexOf()
{
    var a = [1,2,3,4];
    assertEquals(0, A.indexOf(a, 1));
    assertEquals(2, A.indexOf(a, 3));
    assertEquals(-1, A.indexOf(a, 8));
}

// insert
function testInsert()
{
    var a = [1,2,3,4,5];
    assertArrayEquals([1,2,99,3,4,5], A.insert(a, 2, 99));
    assertArrayEquals([1,2,99,3,4,1,2,3,5], A.insert(a, -2, 1, 2, 3));
}

// last
function testLast()
{
    var a = [1,2,3,4,5];
    assertEquals(5, A.last(a));
    assertUndefined(A.last(a, -1));
    assertArrayEquals([], A.last(a, 0));
    assertArrayEquals([4,5], A.last(a, 2));
    assertArrayEquals([1,2,3,4,5], A.last(a, 7));
}

// map
function testMap()
{
    var a = A.map(["a","b","c","d"], function(item) {
        return item + '!';         
    });
    var a1 = ["a!","b!","c!","d!"];
    assertArrayEquals(a1, a);
}

// rassoc
function testRassoc()
{
    var a = [[1,"a"], [2,"b"], [3,"c"]];
    assertArrayEquals([3,"c"], A.rassoc(a, "c"));
    assertUndefined(A.rassoc(a, "z"));
}

// reject
function testReject()
{
    var a = [1,2,3,4,5];
    var b = A.reject(a, function(item){
        return item > 4;         
    });
    assertArrayEquals([1,2,3,4], b);
}

// remove
function testRemove()
{
    var a = [1,2,2,3,3,3,4,4,4,4];
    var r1 = A.remove(a, 2);
    assertArrayEquals([2], r1);
    assertArrayEquals([1,3,3,3,4,4,4,4], a);
    var r2 = A.remove(a, 3, 5);
    assertArrayEquals([3], r2);
    assertArrayEquals([1,4,4,4,4], a);
}

// select
function testSelect()
{
    var a = A.select([1,2,3,4,5], function(item) { return item > 4 });
    assertArrayEquals([5], a);
}

// split
function testSplit()
{
    var a = [1,2,3,4,5];
    assertArrayEquals([[1,2],[4,5]], A.split(a, 3));
    assertArrayEquals([[1],[3],[5]], A.split(a, function(item){
            return item % 2 == 0;
    }));

    var a = [1,1,2,1,1];
    assertArrayEquals([[],[],[2],[],[]], A.split(a, 1));
}

// transpose
function testTranspose()
{
    var a = [[1,2],[3,4],[5,6]];
    assertArrayEquals([[1,3,5],[2,4,6]], A.transpose(a));
}

// uniq
function testUniq()
{
    var a = [1,2,2,3,3,3,4,4,4,4];
    assertArrayEquals([1,2,3,4], A.uniq(a));
    assertArrayEquals([1,2,3,4], A.uniq([1,2,3,4]));
}

// zip
function testZip()
{
    var a = [4,5,6];
    var b = [7,8,9];
    assertArrayEquals([[1,4,7],[2,5,8],[3,6,9]], A.zip([1,2,3], a, b));
    assertArrayEquals([[4,1,8],[5,2,undefined],[6,undefined, undefined]], A.zip(a, [1,2], [8]));
}
