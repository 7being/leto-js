import leto.js
import leto.string.js

var S = leto.string;

// blank
function testBlank()
{
    assert(S.blank(""))
    assert(S.blank("   "))
    assertFalse(S.blank("a"));
    assertFalse(S.blank("a\n "));
}

// capitalize	
function testCapitalize()
{
    assertEquals("Hello", S.capitalize("Hello"));
    assertEquals("Hello world", S.capitalize("hello world"));
    assertEquals("Hello World", S.capitalize("Hello world", true));
    assertEquals("Hello World\nNerd", S.capitalize("hello world\nnerd", true));
    assertEquals("Hello world\nnerd", S.capitalize("hello world\nnerd"));
}

// casecmp
function testCasecmp()
{
    assert(S.casecmp('', ""));
    assert(S.casecmp(new String("hello world"), "HELLO worlD"));
    assert(S.casecmp("hello World", "HeLLo WORld"));
    assert(S.casecmp("hello\nworld\nNERD", "HELLO\nworld\nNERD"));
}

// center
function testCenter()
{
    assertEquals("hello", S.center("hello", 4));
    assertEquals("       hello        ", S.center("hello", 20));
    assertEquals("1231231hello12312312", S.center("hello", 20, '123'));
}

// chomp
function testChomp()
{
    assertEquals("hello", S.chomp("hello"));
    assertEquals("hello", S.chomp("hello\n"));
    assertEquals("hello", S.chomp("hello\r\n"));
    assertEquals("hello\n", S.chomp("hello\n\r"));
    assertEquals("hello", S.chomp("hello\r"));
    assertEquals("hello \n world", S.chomp("hello \n world"));
    assertEquals("he", S.chomp("hello", "llo"));
    assertEquals("hello", S.chomp("hello", "p"));
}

// chop
function testChop()
{
    assertEquals("hello", S.chop("hello\r\n"));
    assertEquals("hello\n", S.chop("hello\n\r"));
    assertEquals("hello", S.chop("hello\n"));
    assertEquals("hell", S.chop("hello"));
    assertEquals("", S.chop(S.chop("x")));
}

// count
function testCount()
{
    assertEquals(0, S.count("abbcccdddd", 'z'));
    assertEquals(1, S.count("abbcccdddd", 'a'));
    assertEquals(3, S.count("abbcccdddd", 'c'));
    assertEquals(9, S.count("abbcccdddd", '^a'));
    assertEquals(2, S.count("abbcccdddd", 'ab', 'bc'));
    assertEquals(0, S.count("abbcccdddd", 'ab', 'bc', '^b'));
    assertEquals(1, S.count("^//\\\\\\", 'a^', '^a'));
    assertEquals(2, S.count("^//\\\\\\", '/'));
    assertEquals(3, S.count("^//\\\\\\", "\\"));
}

// each
function testEach()
{
    var arr = [];
    S.each("hello\nworld", function(s){arr.push(s);});
    assertArrayEquals(["hello\n", "world"], arr);
    arr.length = 0;

    S.each("hello\nworld", 'l', function(s){arr.push(s);});
    assertArrayEquals(["hel", "l", "o\nworl", "d"], arr);
    arr.length = 0;

    S.each("hello\n\n\nworld", '', function(s){arr.push(s);});
    assertArrayEquals(["hello\n\n\n", "world"], arr);
    arr.length = 0;
}

// eachChar
function testEachChar()
{
    assertNotUndefined(S.eachChar);
}

// empty
function testEmpty()
{
    assert(S.empty(""));
    assertFalse(S.empty(" "));
}

// gsub
function testGsub()
{
    assertEquals("|a|b|", S.gsub("ab", "", "|"));
    assertEquals("aokcokd", S.gsub("abcbd", "b", "ok"));
    assertEquals("a<bd>c<bd>e", S.gsub("a bd c bd e", /\s(bd)\s/, "<$1>"));
    assertEquals("space", S.gsub(" space   ", /\s+/, ""));
    assertEquals("TaTbT\\f\\", S.gsub("/a/b/\\f\\", "/", "T"));
    assertEquals("/a/b/TfT", S.gsub("/a/b/\\f\\", "\\", "T"));
    assertEquals('<img alt="a pear" src="/img/pear.jpg" /> <img alt="an orange" src="/img/orange.jpg" />', S.gsub('![a pear](/img/pear.jpg) ![an orange](/img/orange.jpg)', /!\[(.*?)\]\((.*?)\)/, function(m) {
        return '<img alt="' + m[1] + '" src="' + m[2] + '" />';             
        }));
}

// include
function testInclude()
{
    assert(S.include("hello", "lo"));
    assert(S.include("hello", "h"));
    assertFalse(S.include("hello", "ol"));
}

// insert
function testInsert()
{
    assertEquals("Xabcd", S.insert("abcd", 0, "X"));
    assertEquals("abcXd", S.insert("abcd", 3, "X"));
    assertEquals("abcdX", S.insert("abcd", 4, "X"));
    assertEquals("abXcd", S.insert("abcd", -3, "X"));
    assertEquals("abcdX", S.insert("abcd", -1, "X"));
}


// ljust
function testLjust()
{
    assertEquals("hello", S.ljust("hello", 4));
    assertEquals("hello               ", S.ljust("hello", 20));
    assertEquals("hello123412341234123", S.ljust("hello", 20, '1234'));
}

// lstrip
function testLstrip()
{
    assertEquals("hello", S.lstrip("hello"));
    assertEquals("hello  ", S.lstrip("  hello  "));
    assertEquals("hello\r\n", S.lstrip("\thello\r\n"));
}

// remove
function testRemove()
{
    assertEquals("abbcccdddd", S.remove("abbcccdddd", 'z'));
    assertEquals("acccdddd", S.remove("abbcccdddd", 'b'));
    assertEquals("abbccc", S.remove("abbcccdddd", 'd'));
    assertEquals("a", S.remove("abbcccdddd", '^a'));
    assertEquals("acccdddd", S.remove("abbcccdddd", 'ab', 'bc'));
    assertEquals("abbcccdddd", S.remove("abbcccdddd", 'ab', 'bc', '^b'));
    assertEquals("//\\\\\\", S.remove("^//\\\\\\", 'a^', '^a'));
    assertEquals("^\\\\\\", S.remove("^//\\\\\\", '/'));
    assertEquals("^//", S.remove("^//\\\\\\", "\\"));
}

// rjust
function testRjust()
{
    assertEquals("hello", S.rjust("hello", 4));
    assertEquals("               hello", S.rjust("hello", 20));
    assertEquals("123412341234123hello", S.rjust("hello", 20, '1234'));
}

// rescape
function testRescape()
{
    assertEquals("a\\.b\\[100\\]", S.rescape("a.b[100]"));
}

// reverse
function testReverse()
{
    assertEquals("", S.reverse(""));
    assertEquals("dlrow olleh", S.reverse("hello world"));
}

// rstrip
function testRstrip()
{
    assertEquals("hello", S.rstrip("hello"), "hello");
    assertEquals(" hello", S.rstrip(" hello "));
    assertEquals("\thello", S.rstrip("\thello\r\n"));
}

// scan
function testScan()
{
    var s = "cruel world";
    var a = ["cruel", "world"];
    var b = S.scan(s, /\w+/);
    assertArrayEquals(a, b);

    a = ["cru", "el ", "wor"];
    b = S.scan(s, /.../);
    assertArrayEquals(a, b);

    a = [["cru"], ["el "], ["wor"]];
    b = S.scan(s, /(...)/);
    assertArrayEquals(a, b);

    a = [["cr", "ue"], ["l ", "wo"]];
    b = S.scan(s, /(..)(..)/);
    assertArrayEquals(a, b);

    var arr = [];
    S.scan(s, /(.)(.)/, function(x, y){
        arr.push(y, x);
    });
    assertEquals("rceu lowlr", arr.join(''));
}

// squeeze
function testSqueeze()
{
    assertEquals("yelow mon", S.squeeze("yellow moon"));
    assertEquals(" now is the", S.squeeze("  now   is   the", " "));
    assertEquals("puters shot balls", S.squeeze("putters shoot balls", "m-z"));
}

// squish
function testSquish()
{
    assertEquals("foo bar boo", S.squish("      foo        \t     \n   bar   boo"));
    assertEquals("boo", S.squish("        boo     "));
}

// strip
function testStrip()
{
    assertEquals("hello", S.strip("hello"));
    assertEquals("hello", S.strip("  hello  "));
    assertEquals("hello", S.strip("\thello\r\n"));
}

// sub
function testSub()
{
    assertEquals("|abc", S.sub("abc", "", "|"));
    assertEquals("aokcbdbe", S.sub("abcbdbe", "b", "ok"));
    assertEquals("a<bd>c bd e", S.sub("a bd c bd e", /\s(bd)\s/, "<$1>"));
    assertEquals("space   ", S.sub(" space   ", /\s+/, ""));
    assertEquals("Ta/b/c/e\\f\\", S.sub("/a/b/c/e\\f\\", "/", "T"));
    assertEquals("/a/b/c/eTf\\", S.sub("/a/b/c/e\\f\\", "\\", "T"));
}

// succ
function testSucc()
{
    assertEquals("abce", S.succ("abcd"));
    assertEquals("THX1139", S.succ("THX1138"));
    assertEquals("<<koalb>>", S.succ("<<koala>>"));
    assertEquals("2000aaa", S.succ("1999zzz"));
    assertEquals("AAAA0000", S.succ("ZZZ9999"));
    assertEquals("**+", S.succ("***"));
}

// swapcase
function testSwapcase()
{
    assertEquals("hELLO", S.swapcase("Hello"));
    assertEquals("CyBeR_pUnKLL", S.swapcase("cYbEr_PuNkll"));
}

// format
function testFormat()
{
    assertEquals("a2b3c1", S.format("a{1}b{2}c{0}", 1, 2, 3));
}

// toQueryParams
function testToQueryParams()
{
    var a1 = {id: '12', name: 'bill', gender: 'male'};
    var a = S.toQueryParams("id=12&name=bill&gender=male&");
    assertObjectEquals(a1, a);

    var b1 = {id: ['12', '13', '14'], name: 'bill', gender: 'male'};
    var b = S.toQueryParams("id=12&id=13&id=14&name=bill&gender=male&");
    assertObjectEquals(b1, b);
}

// truncate
function testTruncate()
{
    assertEquals("hello world, hello world, h...", S.truncate("hello world, hello world, hello world"));
    assertEquals("hello w...", S.truncate("hello world, hello world", 10));
    assertEquals("hello w!!!", S.truncate("hello world, hello world", 10, '!!!'));
}

// upto
function testUpto()
{
    var arr = [];
    S.upto("a8", "b6", function(s) {
        arr.push(s);
    });
    arr = arr.join('') + '';
    assertEquals("a8a9b0b1b2b3b4b5b6", arr);
    arr = [];
    S.upto("m", "z", function(s) {
        arr.push(s);
    });
    arr = arr.join('') + '';
    assertEquals("mnopqrstuvwxyz", arr);
}
