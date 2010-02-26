(function() {
//==========================================================================
// STRING
//========================================================================== 
var self = leto.string =
{
    //==========================================================================
    // PUBLIC METHODS
    //========================================================================== 
	
    //--------------------------------------------------------------------------
    // BLANK
    //--------------------------------------------------------------------------
    /*
     * Check if the string is either empty or containing 
     *
     * @return	{boolean} Whether the string is blank.
     * only whilespace.
     *
     * @example
     * <pre>
     * leto.string.blank("    ")    #=> true
     * leto.string.blank("a   ")    #=> false
     * </pre>
     */
    blank: function(string) 
    {
        return !/\S/.test(string); 
    },

    //--------------------------------------------------------------------------
    // CAPITALIZE
    //--------------------------------------------------------------------------
    /**
     * Capitalizes the first letter of a string and downcases
     * all the others. <i>upword</i> default <tt>false</tt>.
     * <i>upword</i> passed <tt>true</tt> to capitalizes the first letter for 
     * each word.
     *
     * @param	{Boolean} upword=false - (optional) Passed <tt>true</tt> to 
     * capitalizes each words.
     * @return	{String} The capitalized string.
     *
     * @example
     * <pre>
     * leto.string.capitalize("hello world")        #=> "Hello world"
     * leto.string.capitalize("hello world", true)  #=> "Hello World"
     * </pre>
     */
    capitalize: function(string, upword)
    {
        var lowcase = string.toLowerCase();
        if (upword === true)
        {
            return lowcase.replace(/\b[a-z]/g, function(chr){ return chr.toUpperCase() });
        }
        else
        {
            return lowcase.charAt(0).toUpperCase() + lowcase.slice(1); 
        }
    },

    //--------------------------------------------------------------------------
    // CASECMP
    //--------------------------------------------------------------------------
    /**
     * Case-insensitive version of <i>str</i> === <i>other_str</i>
     *
     * @param	{String} other_str - Another string to compared with.
     * @return	{Boolean} <tt>true</tt> if two string are equal ignore 
     * case. <tt>false</tt> if not.
     * 
     * @example
     * <pre>
     * leto.string.casecmp("hello", new String("HeLLO"))    #=> true
     * </pre>
     */
    casecmp: function(string, other)
    {
        return string.length == other.length
            && string.toLowerCase() === other.toLowerCase();
    },

    //--------------------------------------------------------------------------
    // CENTER
    //--------------------------------------------------------------------------
    /**
     * If <i>width</i> is greater than the length of <i>str</i>, return a string 
     * of length <i>width</i> with <i>str</i> centered and padded with <i>padstr</i>;
     * otherwise return <i>str</i>.
     *
     * @param	{Number} width - The desired length of string.
     * @param	{String} padstr='&nbsp;' - (optional) The str to padded the original string, default space.
     * @return	{String} The centered string.
     *
     * @example
     * <pre>
     * leto.string.center("hello", 4)           #=> "hello"
     * leto.string.center("hello", 20)	        #=> "       hello        "
     * leto.string.center("hello", 20, '123')   #=> "1231231hello12312312"
     * </pre>
     */
    center: function(string, width, padstr)
    {
        if (width > string.length)
        {
            var ljusted = self.ljust(string, Math.ceil((string.length + width)/2), padstr);
            return self.rjust(ljusted, width, padstr);
        }
        return string;
    },

    //--------------------------------------------------------------------------
    // CHOMP
    //--------------------------------------------------------------------------
    /**
     * Returns a string with the give record separator(default $/) 
     * removed from the end of <i>str</i> (if present). default $/
     * removes carriage return chars(that is will remove \n,\r and \r\n).
     *
     * @param	{String} separator=$/ - (optional) The given separator to remove.
     * @return	{String} The chomped string.
     *
     * @example
     * <pre>
     * leto.string.chomp("hello")	#=> "hello"
     * leto.string.chomp("hello\n")	#=> "hello"
     * leto.string.chomp("hello\r\n")	#=> "hello"
     * leto.string.chomp("hello\n\r")	#=> "hello\n"
     * leto.string.chomp("hello\r")	#=> "hello"
     * leto.string.chomp("hello \n yo")	#=> "hello \n yo"
     * leto.string.chomp("hello", "lo")	#=> "hel"
     * </pre>
     */
    chomp: function(string, sep)
    {
        if (sep)
        {
            var regex = new RegExp(sep + '$');
            var idx = string.search(regex);
            if (idx > -1) return string.slice(0, idx);
            return string;
        }
        else
        {
            return string.replace(/(\r\n|\n|\r)$/, '');
        }
    },

    //--------------------------------------------------------------------------
    // CHOP
    //--------------------------------------------------------------------------
    /**
     * Returns a string with the last char removed. If the string ends
     * with \r\n, both chars are removed. {@link leto.string#chomp}
     * is often a safer alternative. It leaves the string unchanged if it doesn't 
     * end in a record separator.
     *
     * @return	{String} The choped string.
     *
     * @example
     * <pre>
     * leto.string.chop("string\r\n")   #=> "string"
     * leto.string.chop("string\n\r")   #=> "string\r"
     * leto.string.chop("string\n")     #=> "string"
     * leto.string.chop("string")     #=> "strin"
     * leto.string.chop("")     #=> ""
     * </pre>
     */
    chop: function(string)
    {
        return (/\r\n$/.test(string)) ?
                string.slice(0, string.length-2) : string.slice(0, string.length-1);
    },

    //--------------------------------------------------------------------------
    // COUNT
    //--------------------------------------------------------------------------
    /**
     * Each <i>other_str</i> parameter defines a set of characters to count. The 
     * intersection of these sets defines the characters to count in str. 
     * Any <i>other_str</i> that starts with a caret (<tt>^</tt>) is negated. 
     * The sequence <tt>c1��c2</tt> means all characters between c1 and c2. 
     *
     * @param   {Varargs} [other_str]+ - Any number of strings.
     * @return  {Number} The characters count result based on the passed in strings.
     *
     * @example
     * <pre> 
     * a = "hello world" 
     *
     * leto.string.count(a, "lo")           #=> 5
     * leto.string.count(a, "lo", "o")      #=> 2
     * leto.string.count(a, "hello", "^l")  #=> 2
     * leto.string.count(a, "ej-m")         #=> 4
     * </pre>
     */
    count: function(string, vargs)
    {
        var rs = _parseCharsetRules.apply(null, arguments);
        var inc = rs.inc, esc = rs.esc;

        if (inc.length)
        {
            var match = new RegExp('(' + inc.join('|').rescape() + ')', 'g');
            var rs = string.match(match);
            return rs ? rs.length : 0;
        }
        else
        {
            if (esc.length)
            {
                var match = new RegExp('[^ ' + esc.join('').rescape() + ']', 'g');
                var rs = string.match(match);
                return rs ? rs.length : 0;
            }
            else
            {
                return 0;
            }
        }
    },

    //--------------------------------------------------------------------------
    // EACH
    //--------------------------------------------------------------------------
    /**
     * Splits <i>str</i> using the supplied parameter as the record separator
     * ($/ by default), passing each substring in turn to the supplied function.
     * If a zero-length record separator is supplied, the string is split on \n
     * characters, except that multiple successive newlines are appended together.
     *
     * @param   {String} separator=$/ - (optional) Record separator.
     * @param   {Function} fn - Callback function Invoked with each substring passwd in.
     * @param   {Object} bind - The scope for function to bind to.
     *
     * @example
     * <pre>
     * print "Example 1\n"
     * leto.string.each("hello\nworld", function(s){
     *     print s
     * });
     *
     * print "Example 2\n"
     * leto.string.each("hello\nworld", 'l', function(s){
     *     print s
     * });
     *
     * print "Example 3\n"
     * leto.string.each("hello\n\n\nworld", '', function(s){
     *     print s
     * });
     *
     * Produces:
     *     Example 1
     *     "hello\n"
     *     "world"
     *
     *     Example 2
     *     "hel"
     *     "l"
     *     "o\nworl"
     *     "d"
     *
     *     Example 3
     *     "hello\n\n\n"
     *     "world"
     * </pre>
     */
    each: function(string, sep, fn, bind)
    {
        var t = leto.type(sep);
        if (t == 'function')
        {
            bind = fn; fn = sep; sep = '[^\n]*\n';
        }
        else if (t == 'string')
        {
            sep = sep ? ('[\u0000-\uFFFF]*?(?=' + sep + ')' + sep) : '[^\n]*\n+';
        }
        else
        {
            return;
        }

        var regex = new RegExp(sep, 'g');
        var result, last = 0;
        while (result = regex.exec(string))
        {
            fn.call(bind, result[0]);
            last = regex.lastIndex;
        }

        if (string.length > last)
        {
            fn.call(bind, string.slice(last));
        }
    },

    //--------------------------------------------------------------------------
    // EACHCHAR
    //--------------------------------------------------------------------------
    /**
     * Iterates each character in <i>self</i>.
     */
    eachChar: function(string, fn, bind)
    {
        for (var i = 0, l = string.length; i < l; i++)
        {
            fn.call(bind, string.charAt(i));
        }
    },

    //--------------------------------------------------------------------------
    // EMPTY
    //--------------------------------------------------------------------------
    /**
     * Returns <tt>true</tt> if <i>str</i> has a length of zero.
     *
     * @return	{Boolean} If is empty <i>str</i>.
     *
     * @example
     * <pre>
     * leto.string.empty("")        #=> ture
     * leto.string.empty("hello")   #=> false
     * </pre>
     */
    empty: function(string)
    {
        return !string.length;
    },

    //--------------------------------------------------------------------------
    // GSUB
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>str</i> with <i>all</i> occurrences
     * of <i>pattern</i> replaced with <i>replacement (string or
     * a function return string)</i>. The <i>pattern</i> will 
     * typically be a Regexp; if it is a String then no regular 
     * expression metachars will be interpreted.<br/><br/>
     *
     * If a string is used as the replacement, special variables 
     * from the match (such as <tt>$1</tt> and <tt>$2</tt> can
     * be substituted into it.<br/><br/>
     *
     * In the replacement function, the current match result array 
     * is passed in as a parameter, and match[0], match[1] stands
     * for eaching grouping result. The return value of function
     * will be substituted for the match on each call.
     *
     * @param	{String|Regexp} pattern - A regexp or substring.
     * @param	{String|Function} replacement - A replace substitude 
     * for each match.
     * @return	The gsubed string.
     *
     * @example
     * <pre>
     * "hello".gsub(/[aeiou]/, '*')		#=> "h*ll*"
     * "hello".gsub(/([aeiou])/, '<$1>')	#=> "h&lt;e&gt;ll&lt;o&gt;"
     * "hello".gsub(/./, function(m) {		#=> "&lt;h&gt;&lt;e&gt;&lt;l&gt;&lt;l&gt;&lt;o&gt;"
     *     return '<' + m[0] + '>';
     * });
     * </pre>
     */
    gsub: function(string, pattern, replacement)
    {
        pattern = _makeSubPattern(pattern, true);
        replacement = _makeSubReplacement(string, replacement, true);
        return replacement.call(string, pattern);
    },
	
    //--------------------------------------------------------------------------
    // INCLUDE
    //--------------------------------------------------------------------------
    /**
     * Returns <tt>true</tt> if <i>str</i> contains the given string or
     * character.
     *
     * @param	{String} other_str - A string searched for.
     * @return	{Boolean} Whether <i>str</i> contains <i>other_str</i>
     *
     * @example
     * <pre>
     * leto.string.include("hello", "lo")	#=> true
     * leto.string.include("hello", "ol")	#=> false
     * </pre>
     */
    include: function(string, other)
    {
        return string.indexOf(other) > -1;
    },

    //--------------------------------------------------------------------------
    // INSERT
    //--------------------------------------------------------------------------
    /**
     * Returns a new string that inserts <i>other_str</i> before 
     * the character at the give <i>index</i>. Negative indices 
     * count from the end of the string, and insert after the given
     * character.
     *
     * @param   {Number} index - The index to insert before(positive)
     * or after(negative).
     * @param   {String} other_str - the other str used to insert.
     *
     * @return  {String} The inserted string.
     *
     * @example
     * <pre>
     * leto.string.insert("abcd", 0, "X")    #=> "Xabcd"
     * leto.string.insert("abcd", 3, "X")    #=> "abcXd"
     * leto.string.insert("abcd", 4, "X")    #=> "abcdX"
     * leto.string.insert("abcd", -3, "X")    #=> "abXcd"
     * leto.string.insert("abcd", -1, "X")    #=> "abcdX"
     * </pre>
     */
    insert: function(string, index, other)
    {
        if (index >= 0 && index <= string.length)
        {
            return string.slice(0, index) + other + string.slice(index);
        }
        else if (index >= -string.length && index < -1)
        {
            return string.slice(0, index+1) + other + string.slice(index+1);	
        }
        else if (index == -1)
        {
            return string + other;
        }
        return string;
    },

    //--------------------------------------------------------------------------
    // LJUST
    //--------------------------------------------------------------------------
    /**
     * If <i>width</i> is greater that the length of <i>str</i>, return a
     * string of length <i>width</i> left justified and padded with <i>padstr</i>;
     * otherwise returns <i>str</i>
     *
     * @param	{Number} width - The desired length of string.
     * @param	{String} padstr='&nbsp;' - (optional) The str to padded the original string, default space.
     * @return	{String} The ljusted string.
     *
     * @example
     * <pre>
     * leto.string.ljust("hello", 4)		#=> "hello"
     * leto.string.ljust("hello", 20)		#=> "hello               "
     * leto.string.ljust("hello", 20, '1234')	#=> "hello123412341234123"
     * </pre>
     */
    ljust: function(string, width, padstr)
    {
        var gt = width - string.length;
        if (gt > 0)
        {
            padstr = padstr || ' ';
            var p = padstr.length;
            var sb = [string];
            while (gt > p)
            {
                sb.push(padstr);
                gt -= p;
            }
            sb.push(padstr.slice(0, gt));
            return sb.join('');
        }
        return string;
    },

    //--------------------------------------------------------------------------
    // LSTRIP
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>str</i> with leading whitespaces removed.
     * See also {@link leto.string.rstrip} and {@link leto.string.strip}
     *
     * @return	{String} The lstriped string.
     *
     * @example
     * <pre>
     * leto.string.lstrip("    hello    ")  #=> "    hello"
     * </pre>
     */
    lstrip: function(string)
    {
        return string.replace(/^\s\s*/, '');	
    },

    //--------------------------------------------------------------------------
    // REMOVE
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of str with all characters in the intersection 
     * of its arguments removed. Uses the same rules for building 
     * the set of characters as {@link leto.string#count}. 
     *
     * @param   {Varargs} [other_str]+ - Any number of strings.
     * @return  {String} The specific chars removed string.
     *
     * @example
     * <pre>
     * "hello".remove("l", "lo")		#=> "heo"
     * "hello".remove("lo")			#=> "he"
     * "hello".remove("aeiou", "^e")	    #=> "hell"
     * "hello".remove("ej-m")			#=> "ho"
     * </pre>
     */
    remove: function(string, varargs)
    {
        var rs = _parseCharsetRules.apply(null, arguments);
        var inc = rs.inc, esc = rs.esc;
        if (inc.length)
        {
            var sb = []; 
            for (var i = 0, l = string.length; i < l; i++)
            {
                if (inc.include(string.charAt(i)))
                {
                    continue;
                }
                sb.push(string.charAt(i));
            }
            return sb.join('');
        }
        else
        {
            if (esc.length)
            {
                var sb = []; 
                for (var i = 0, l = string.length; i < l; i++)
                {
                    if (esc.include(string.charAt(i)))
                    {
                        sb.push(string.charAt(i));
                    }
                }
                return sb.join('');
            }
            else
            {
                return string;
            }
        }
    },
    
    //--------------------------------------------------------------------------
    // RESCAPE
    //--------------------------------------------------------------------------
    /**
     * Escapes all regular expression character from the <i>str</i>
     *
     * @return	{String} A RegExp chars escaped string.
     *
     * @example
     * <pre>
     * leto.string.rescape("a.b[100]")	#=> "a\\.b\\[100\\]"
     * </pre>
     */
    rescape: function(string)
    {
        return string.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    },

    //--------------------------------------------------------------------------
    // REVERSE
    //--------------------------------------------------------------------------
    /**
     * Reverses a copy of <i>str</i> and return.
     *
     * @return	{String} The reversed string.
     *
     * @example
     * <pre>
     * leto.string.reverse("hello world")   #=> "dlrow olleh"
     * </pre>
     */
    reverse: function(string)
    {
        var sb = [];	
        for (var i = string.length - 1; i >= 0; i--)
        {
            sb.push(string.charAt(i));
        }
        return sb.join('');
    },
    
    //--------------------------------------------------------------------------
    // RJUST
    //--------------------------------------------------------------------------
    /**
     * If <i>width</i> is greater that the length of <i>str</i>, return a
     * string of length <i>width</i> right justified and padded with <i>padstr</i>;
     * otherwise returns <i>str</i>
     *
     * @param	{Number} width - The desired length of string.
     * @param	{String} padstr='&nbsp;' - (optional) The str to padded the original string, default space.
     * @return	{String} The rjusted string.
     *
     * @example
     * <pre>
     * leto.string.rjust("hello", 4)		#=> "hello"
     * leto.string.rjust("hello", 20)		#=> "               hello"
     * leto.string.rjust("hello", 20, '1234')	#=> "123412341234123hello"
     * </pre>
     */
    rjust: function(string, width, padstr)
    {
        var gt = width - string.length;
        if (gt > 0)
        {
            padstr = padstr || ' ';
            var p = padstr.length;
            var sb = [];
            while (gt > p)
            {
                sb.push(padstr);
                gt -= p;
            }
            sb.push(padstr.slice(0, gt), string);
            return sb.join('');
        }
        return string;
    },

    //--------------------------------------------------------------------------
    // RSTRIP
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>str</i> with trailing whitespaces removed.
     * See also {@link leto.string#lstrip} and {@link leto.string#strip}
     *
     * @return	{String} The rstriped string.
     *
     * @example
     * <pre>
     * leto.string.rstrip("    hello   ")   #=> "    hello"
     * </pre>
     */
    rstrip: function(string)
    {
        return string.replace(/\s\s*$/, '');	
    },

    //--------------------------------------------------------------------------
    // SCAN
    //--------------------------------------------------------------------------
    /**
     * Iterate through <i>str</i>, matching the <i>pattern</i> (which 
     * may be a <tt>Regexp</tt> or a <tt>String</tt>). For each match, 
     * a result is generated and either added to the result array or 
     * passed to the <i>fn</i>. If the <i>pattern</i> contains no groups, 
     * each individual result consists of the matched string, $&. If the 
     * <i>pattern</i> contains groups, each individual result is itself 
     * an array containing one entry per group.
     *
     * @param	{String|Regexp} pattern - A regexp or substring.
     * @param	{Function} fn - (optional) A replace substitude for each match.
     *
     * @example
     * <pre>
     * var a = "cruel world"
     * leto.string.scan(a, /\w+/)	#=> ["cruel", "world"]
     * leto.string.scan(a, /.../)	#=> ["cru", "el ", "wor"]
     * leto.string.scan(a, /(...)/)	#=> [["cru"], ["el "], ["wor"]]
     * leto.string.scan(a, /(..)(..)/)	#=> [["cr", "ue"], ["l ", "wo"]]
     *
     * leto.string.scan(a, /\w+/, function(w) {	#=> "<<cruel>> <<world>>"
     *     print "<<" + w + ">>";
     * });
     * 
     * leto.string.scan(a, /(.)(.)/, function(x,y){	#=> "rceu lowlr"
     *     print y, x
     * });
     * </pre>
     */
    scan: function(string, pattern, fn, bind)
    {
        var rs, cb;
        if (fn)
        {
            cb = function(m)
            {
                if (m.length > 1) m.shift();
                fn.apply(bind, m);
            }; 
        } 
        else
        {
            rs = [];
            cb = function(m)
            {
                m.length > 1 ? m.shift() : m = m[0];
                rs.push(m);
            };
        }
        self.gsub(string, pattern, cb);
        if (rs) return rs;
    },

    //--------------------------------------------------------------------------
    // SQUEEZE
    //--------------------------------------------------------------------------
    /**
     * Builds a set of characters from the <i>other_str</i> parameter(s) using 
     * the procedure described for {@link leto.string#count}. Returns a new 
     * string where runs of the same character that occur in this set are replaced 
     * by a single character. If no arguments are given, all runs of identical 
     * characters are replaced by a single character. 
     *
     * @param   {Varargs} [other_str]+ - Any number of strings.
     * @return  {String} The specific chars uniqued string.
     *
     * @example
     * <pre>
     * leto.string.squeeze("yellow moon")                   #=> "yelow mon" 
     * leto.string.squeeze("  now   is  the")               #=> " now is the" 
     * leto.string.squeeze("putters shoot balls", "m-z")    #=> "puters shot balls"
     * </pre>
     */
    squeeze: function(string)
    {
        var sb = [], len = string.length;
        if (arguments.length)
        {
        // squeeze chars accroding to _parseCharsetRules
            var rs = _parseCharsetRules.apply(null, arguments);
            var inc = rs.inc, esc = rs.esc;
            // handle inclusion
            if (inc.length)
            {
                for (var i = 0; i < len; i++)
                {
                    var c = string.charAt(i);
                    if (!inc.include(c) || sb.last() !== c)
                    {
                        sb.push(c);
                    }
                }
            }
            else
            {
                // handle exclusion
                if (esc.length)
                {
                    for (var i = 0; i < len; i++) {
                        var c = string.charAt(i);
                        if (esc.include(c) || sb.last() !== c)
                        {
                                sb.push(c);	
                        }
                    }
                // charset is empty
                }
                else
                {
                    string
                }
            }
        }
        else
        {
        // no arguments provided, so squeeze each char
            for (var i = 0; i < len; i++)
            {
                if (sb.last() !== string.charAt(i))
                {
                    sb.push(string.charAt(i));
                }	
            }
        }
        return sb.join('');
    },

    //--------------------------------------------------------------------------
    // SQUISH
    //--------------------------------------------------------------------------
    /**
     * Returns the string, first removing all whitespaces on both
     * ends of the <i>str</i>, and then changing remaning consecutive
     * whitespace groups into one space each.
     *
     * @return	A squished string.
     *
     * @example
     * <pre>
     * leto.string.squish("   foo   bar  \n   \t   boo")    #=> "foo bar boo"
     * leto.string.squish("             boo        ")	    #=> "boo"
     * </pre>
     */
    squish: function(string)
    {
        return self.strip(string).replace(/\s\s\s*/g, ' ');
    },
    
    //--------------------------------------------------------------------------
    // STRIP
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>str</i> with leading and trailing whitespace 
     * removed.
     *
     * @return	{String} The striped string.
     *
     * @example
     * <pre>
     * leto.string.strip("    hello   ")    #=> "hello"
     * leto.string.strip("\tgoodby\r\n")    #=> "goodbye"
     * </pre>
     */
    strip: function(string)
    {
        return self.rstrip(self.lstrip(string));
    },

    //--------------------------------------------------------------------------
    // SUB
    //--------------------------------------------------------------------------
    /**
     * Same as {@link leto.string#gsub}, except <tt>sub</tt>
     * only replace the first occurrence of <i>pattern</i>
     *
     * @param	{String|Regexp} pattern - A regexp or substring.
     * @param	{String|Function} replacement - A replace substitude 
     * for each match.
     * @return	The subed string.
     *
     * @example
     * <pre>
     * leto.string.sub("hello", /[aeiou]/, '*')			#=> "h*llo"
     * leto.string.sub("hello", /([aeiou])/, '<$1>')		#=> "h<e>llo"
     * leto.string.sub("hello", /./, function(m) {		#=> "&lt;h&gt;ello"
     *		return '<' + m[0] + '>';
     *	});
     * </pre>
     */
    sub: function(string, pattern, replacement)
    {
        pattern = _makeSubPattern(pattern);
        replacement = _makeSubReplacement(string, replacement);
        return replacement.call(string, pattern);	
    },

    //--------------------------------------------------------------------------
    // SUCC
    //--------------------------------------------------------------------------
    /**
     * Returns the successor to <i>str</i>. The successor is calculated by
     * incrementing chars starting from the rightmost alphanumeric (or the
     * right most char if there are no alphanumeric) in the string. Incrementing
     * a digit always results in another digit, and incrementing a letter
     * results in another letter of the same case. Incrementing nonalphanumerics
     * uses the underlying char set's collating sequence.<br/><br/>
     *
     * If the increment generates a ``carry,''the char to the left of it is
     * incremented. This process repeats until there is no carry, adding an
     * additional char if necessary.
     *
     * <pre>
     * TODO review whether can improve performance a little bit.
     *
     * Dev Reference:
     * 0    ->  48
     * 9    ->  57
     * A    ->  65
     * Z    ->  90
     * a    ->  97
     * z    ->  122
     * </pre>
     *
     * @return	{String} The succesor of this <i>str</i>.
     *
     * @example
     * <pre>
     * leto.string.succ("abcd")        #=> "abce"
     * leto.string.succ("THX1138")     #=> "THX1139"
     * leto.string.succ("&lt;&lt;koala&gt;&gt;")    #=> "&lt;&lt;koalb&gt;&gt;"
     * leto.string.succ("1999zzz")     #=> "2000aaa"
     * leto.string.succ("ZZZ9999")     #=> "AAAA0000"
     * leto.string.succ("***")         #=> "**+"
     * </pre>
     */
    succ: function(string)
    {
        if (/\w/.test(string))
        {
            var sb = [], raise = false;
            for (var i = string.length - 1; i > -1; i--)
            {
                var code = string.charCodeAt(i);
                // check whether it's already raised the hightest bit
                // or the left chars are not \w
                if (raise === true || /^\W*$/.test(string.slice(0, i+1)))
                {
                    if (raise !== true) {
                        sb.unshift(raise);
                    }
                    return string.slice(0, i+1) + String.fromCharCode.apply(null, sb);
                } 
                // if current char is not \w, simpily unshift it to string buffer
                if (/\W/.test(string.charAt(i)))
                {
                    sb.unshift(code);
                    continue;
                }
                // raise according to keycode, see doc, dev reference
                switch (code)
                {
                    case 57:
                        sb.unshift(48);
                        raise = 49;
                        continue;
                    case 90:
                        sb.unshift(65);
                        raise = 65;
                        continue;
                    case 122:
                        sb.unshift(97);
                        raise = 97;
                        continue;
                    default:
                        sb.unshift(code + 1); //incresed
                        raise = true;
                }
            }
            if (typeof raise == 'number') sb.unshift(raise);
            return String.fromCharCode.apply(null, sb);
        }
        else
        {
            return string.slice(0, string.length - 1) +
                    String.fromCharCode(string.charCodeAt(string.length - 1) + 1);
        }
    },

    //--------------------------------------------------------------------------
    // SWAPCASE
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>str</i> with uppercase alphabetic chars converted
     * to lowercase and lowercase chars converted to uppercase.
     *
     * @return	{String} The case swaped string.
     *
     * @example
     * <pre>
     * leto.string.swapcase("Hello")        #=> "hELLO"
     * leto.string.swapcase("cYbEr_PuNkll") #=> "CyBeR_pUnKLL"
     * </pre>
     */
    swapcase: function(string)
    {
        return self.gsub(string, /([a-z])|([A-Z])/, function(m)
        {
            return m[1] ? m[0].toUpperCase() : m[0].toLowerCase();
        });
    },

    //--------------------------------------------------------------------------
    // FORMAT
    //--------------------------------------------------------------------------
    /**
     *
     */
    format: function(string, vargs)
    {
        var args = Array.prototype.slice.call(arguments, 1);
        return string.replace(/\{(\d+)\}/g, function(m, i)
        {
            return args[i];		
        });
    },

    //--------------------------------------------------------------------------
    // TO QUERY PARAMS
    //--------------------------------------------------------------------------
    /**
     * Parse an url like query string to a hash like object.
     *
     * @return	{Object} The parsed query params.
     *
     * @example
     * <pre>
     * "id=1&name=bill&age=23&gender=male".toQueryParams()
     *
     * produce:
     * {
     *     id: 1,
     *     name: 'bill',
     *     age: 23,
     *     gender: 'male
     * }
     *
     * "id=1&id=2&id=3&name=bill&age=23&gender=male".toQueryParams()
     *
     * produce:
     * {
     *     id: [1, 2, 3],
     *     name: 'bill',
     *     age: 23,
     *     gender: 'male'
     * }
     * </pre>
     */
    toQueryParams: function(string)
    {
        var obj = {};
        var pairs = string.split('&');
        for (var i = 0; i < pairs.length; i++)
        {
            var pair = pairs[i];
            var tokens = pair.split('=');
            if(tokens.length > 1 && tokens[1])
            {
                var key = tokens[0], val = tokens[1];
                if (obj[key])
                {
                    if (typeof obj[key] == 'string')
                    {
                        obj[key] = [obj[key]];
                    }
                    obj[key].push(decodeURIComponent(val));
                }
                else
                {
                    obj[key] = decodeURIComponent(val);
                }
            }
        }
        return obj;
    },

    //--------------------------------------------------------------------------
    // TRUNCATE
    //--------------------------------------------------------------------------
    /**
     * Truncate <i>str</i> to given <i>width</i> - <i>suffix.length</i>, 
     * and append with <i>suffix</i>
     *
     * @param	{Number} width=30 - (optional) The desired width of result string. default 30.
     * @param	{String} suffix='...' - (optional) The suffix to append to the tail. default '...'.
     * @return	{String} The truncated string.
     *
     * @example
     * <pre>
     * leto.string.truncate("hello world", 10)		#=> "hello w..."
     * leto.string.truncate("hello world", 10, "!!!")	#=> "hello w!!!"
     * </pre>
     */
    truncate: function(string, length, /*default='...'*/suffix)
    {
        var suffix = suffix || '...';
        var length = length || 30;
        return string.length > length ?
            string.slice(0, length - suffix.length) + suffix : string;
    },

    //--------------------------------------------------------------------------
    // UPTO
    //--------------------------------------------------------------------------
    /**
     * Iterates through successive values, starting at <i>str</i> and
     * ending at <i>other_str</i> inclusive, passing each value in to
     * the <i>fn</i> call. {@link leto.string#succ} method is used
     * to generate each value.
     *
     * @param	{String} other_str - The ending string of this iteration.
     * @param	{Function} fn - The invoked function in each iteration.
     * @param	{Object} bind - The scope of <i>fn</i> to bind to.
     *
     * @example
     * <pre>
     * "a8".upto("b6", function(s) {
     *     print s + ' ';
     * });
     *
     * produces: a8 a9 b0 b1 b2 b3 b4 b5 b6
     * </pre>
     */
    upto: function(string, other, fn, bind)
    {
        if (string < other)
        {
            var tmp = string;
            while (tmp < other)
            {
                fn.call(bind, tmp);
                tmp = self.succ(tmp);
            }
            fn.call(bind, tmp);
        }
    }
};

	//==========================================================================
	// PRIVATE METHODS
	//========================================================================== 

	//--------------------------------------------------------------------------
	// MAKE SUB PATTERN
	//--------------------------------------------------------------------------
	/**
	 * @private
	 */
	function _makeSubPattern(pattern, global)
	{
		var t = leto.type(pattern);
		if (t == 'string')
		{
			var f = global ? 'g' : '';
			return new RegExp(self.rescape(pattern), f);
		}
		if (t == 'regexp')
		{
			if ((global && !pattern.global)
			|| (!global && pattern.global)) {
					var s = pattern.toString();
					var i = s.lastIndexOf('/');
					var f = s.slice(i + 1)
					f = global ? (f + 'g') : f.replace('g', '');
					s = s.slice(1, i);
					pattern = new RegExp(s, f);
			}
			return pattern;
		}
		throw 'Illegal pattern ' + pattern;
	}

	//--------------------------------------------------------------------------
	// MAKE SUB REPLACEMENT
	//--------------------------------------------------------------------------
	/**
	 * @private
	 */
	function _makeSubReplacement(string, replacement, global)
	{
		var t = leto.type(replacement);
		if (t == 'string')
		{
			return function(pattern)
			{
				return string.replace(pattern, replacement);
			};
		}
		if (t == 'function')
		{
			return function(pattern)
			{
				var result = [], lindex = 0, match;
				while (match = pattern.exec(string))
				{
					result.push(string.slice(lindex, match.index)); 
					result.push(replacement(match));
					lindex = pattern.lastIndex;
					if (!global) break;
				}
				result.push(string.slice(lindex));
				return result.join('');
			};
		}
		throw 'Illegal replacement ' + replacement;
	}

	//--------------------------------------------------------------------------
	// PARSE CHARSET RULES
	//--------------------------------------------------------------------------
	/**
	 * @private
	 */
	function _parseCharsetRules()
	{
            var inc = [], esc = [];
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < args.length; i++)
            {
                // parse sequence
                var item = self.gsub(args[i], /(\w)-(\w)/, function(m)
                {
                    var tmp = [];    
                    m[1].upto(m[2], function(c) { tmp.push(c) });
                    return tmp.join('');
                });

                var tmp = item.split('');
                // parse negated
                if (tmp[0] == '^')
                {
                    tmp.shift();
                    esc = esc.concat(tmp);
                }
                else
                {
                    // parse intersection
                    if (inc.length)
                    {
                        inc = leto.array.uniq(leto.array.select(inc, 
                            function(c){ return leto.array.include(tmp, c) }));
                    }
                    else
                    {
                        inc = leto.array.uniq(tmp);
                    } 
                }
            }

            esc = leto.array.uniq(esc);
            if (inc.length)
            {
                var a = esc;
                a.shift(inc);
                leto.array.remove.apply(null, a);
                esc.length = 0;
            }
            return {'inc': inc, 'esc': esc};
	}

})();

//  EOF
