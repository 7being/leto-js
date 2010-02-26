import leto.js
import leto.array.js

// assoc
function testAssoc() {
var s1 = [ "colors", "red", "blue", "green" ];
var s2 = [ "letters", "a", "b", "c" ];
var s3 = "foo";
var a = [ s1, s2, s3 ];
assertEquals(a.assoc("letters"), s2);
assertUndefined(a.assoc("foo"));
};
// at
function testAt() {
var arr = ["a", "b", "c", "d"];
assertEquals(arr.at(-1) , "d");
assertEquals(arr.at(0) , "a");
assertUndefined(arr.at(-100));
assertUndefined(arr.at(100));
};
// clear
function testClear() {
var arr = ["a", "b", "c", "d"];
assertEquals(arr.clear().length, 0);
};
// each
function testEach() {
var arr = ["a", "b", "c", "d"];
var rs = [];
arr.each(function(item){
    rs.push(item);         
});
assertTrue(ogre.equal(arr, rs));
};
// empty
function testEmpty() {
assertTrue([].empty());
assertFalse([1].empty());
};
// fill
function testFill() {
var a1 = ["a", "b", "c", "d"]
var a2 = ["a", "b", "c", "d"]
var a3 = ["a", "b", "c", "d"]
var a4 = ["a", "b", "c", "d"]
var a5 = ["a", "b", "c", "d"]
var a6 = ["a", "b", "c", "d"]
var a7 = ["a", "b", "c", "d"]
var s1 = ["x","x","x","x"];
var s2 = ["x","t","t","t"];
var s3 = ["a","b","z","z"];
var s4 = ["z","z","z","d"];
var s5 = ["a","b","c","d", undefined, undefined, "m","m"];
var s6 = ["a","b","c","d", undefined, undefined, undefined];
assertTrue(ogre.equal(a1.fill("x"), s1));
assertTrue(ogre.equal(a1.fill("x", -100), s1));
assertTrue(ogre.equal(a1.fill("t", 1), s2));
assertTrue(ogre.equal(a2.fill("z", 2), s3));
assertTrue(ogre.equal(a3.fill("z", 2, 2), s3));
assertTrue(ogre.equal(a4.fill("z", -2), s3));
assertTrue(ogre.equal(a5.fill("z", -6, 3), s4));
assertTrue(ogre.equal(a6.fill("m", 6, 2), s5));
assertTrue(ogre.equal(a7.fill("m", 6, 0), s6));
};
// first
function testFirst() {
var a = [1,2,3,4,5];
assertEquals(a.first(), 1);
assertUndefined(a.first(-1));
assertEquals(a.first(0).length, 0);
assertTrue(ogre.equal(a.first(1), [1]));
assertTrue(ogre.equal(a.first(2), [1,2]));
assertTrue(ogre.equal(a.first(7), [1,2,3,4,5]));
};
// flatten
function testFlatten() {
var a = [1,2,[3,[4,5]]];
assertTrue(ogre.equal(a.flatten(), [1,2,3,4,5]));
};
// include
function testInclude() {
var a = [1,2,3,4];
assertTrue(a.include(1));
assertFalse(a.include(9));
};
// indexOf
function testIndexOf() {
var a = [1,2,3,4];
assertEquals(a.indexOf(1), 0);
assertEquals(a.indexOf(3), 2);
assertEquals(a.indexOf(8), -1);
};
// insert
function testInsert() {
var a = [1,2,3,4,5];
assertTrue(ogre.equal(a.insert(2,99), [1,2,99,3,4,5]));
assertTrue(ogre.equal(a.insert(-2,1,2,3), [1,2,99,3,4,1,2,3,5]));
};
// last
function testLast() {
var a = [1,2,3,4,5];
assertEquals(a.last(), 5);
assertUndefined(a.first(-1));
assertEquals(a.last(0).length, 0);
assertTrue(ogre.equal(a.last(1), [5]));
assertTrue(ogre.equal(a.last(2), [4,5]));
assertTrue(ogre.equal(a.last(7), [1,2,3,4,5]));
};
// map
function testMap() {
var arr = ["a", "b", "c", "d"];
var arr2 = arr.map(function(item) {
    return item + '!';         
});
var arr3 = ["a!", "b!", "c!", "d!"];
assertTrue(ogre.equal(arr2, arr3));
};
// rassoc
function testRassoc() {
        var a = [[1,"a"], [2,"b"], [3, "c"]];
        assertTrue(ogre.equal(a.rassoc("c"), [3, "c"]));
        assertUndefined(a.rassoc("z"));
};
// reject
function testReject() {
var a = [1,2,3,4,5];
var b = a.reject(function(item){
    return item > 4;         
});
assertEquals(b.length, 4);
assertTrue(ogre.equal(b, [1,2,3,4]));
};
// remove
function testRemove() {
        var a = [1,2,2,3,3,3,4,4,4,4];
        var r1 = a.remove(1);
        assertTrue(ogre.equal(r1, [1]));
        assertTrue(ogre.equal(a,[2,2,3,3,3,4,4,4,4]));	
        a.remove(2);
        assertTrue(ogre.equal(a, [3,3,3,4,4,4,4]));
        a.remove(8);
        assertTrue(ogre.equal(a, [3,3,3,4,4,4,4]));
        var r2 = a.remove(11);
        assertTrue(ogre.equal(r2, []));
        var r3 = a.remove(3,5);
        assertTrue(ogre.equal(r3, [3]));
};
// select
function testSelect() {
var a = [1,2,3,4,5];
var b = a.select(function(item){
    return item > 4;         
});
assertEquals(b.length, 1);
assertEquals(b[0], 5);
};
// split
function testSplit() {
        var a = [1,2,3,4,5];
        assertTrue(ogre.equal(a.split(3), [[1,2],[4,5]]));
        assertTrue(ogre.equal(a.split(function(item){
                return item % 2 == 0;
        }), [[1],[3],[5]]));
        assertTrue(ogre.equal(a.split(function(item){
                return item % 2 == 0;
        }, 2), [[1],[3]]));
        var a = [1,1,2,1,1];
        assertTrue(ogre.equal(a.split(1), [[],[],[2],[],[]]));
};
// transpose
function testTranspose() {
        var a = [[1,2],[3,4],[5,6]];
        assertTrue(ogre.equal(a.transpose(), [[1,3,5],[2,4,6]]));
};
// uniq
function testUniq() {
var a = [1,2,2,3,3,3,4,4,4,4];
var b = a.uniq();
assertTrue(ogre.equal(b, [1,2,3,4]));
assertTrue(ogre.equal(b, b.uniq()));
};
// zip
function testZip() {
    var a = [4,5,6];
    var b = [7,8,9];
    assertTrue(ogre.equal([1,2,3].zip(a,b), [[1,4,7],[2,5,8],[3,6,9]]));
    assertTrue(ogre.equal(a.zip([1,2], [8]), [[4,1,8],[5,2,undefined],[6,undefined, undefined]]));
};
