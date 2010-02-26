(function() {
//==========================================================================
// ARRAY
//========================================================================== 
var self = leto.array =
{
    //==========================================================================
    // PUBLIC METHODS
    //========================================================================== 
	
    //--------------------------------------------------------------------------
    // ASSOC
    //--------------------------------------------------------------------------
    /**
     * Searches through an array whose elements are also arrays comparing
     * <i>item</i> with the first element of each contained array using
     * ===. Returns the first contained array that matches.
     *
     * @param   {Mix} item - Any kind of object.
     * @return  {Array|Undefined} The associated array or undefined.
     *
     * @example
     * <pre>
     * var s1 = [ "colors", "red", "blue", "green" ]
     * var s2 = [ "letters", "a", "b", "c" ]
     * var s3 = "foo"
     * var a = [ s1, s2, s3 ]
     * leto.array.assoc(a, "letters")       #=> [ "letters", "a", "b", "c"]
     * leto.array.assoc(a, "foo")           #=> undefined
     * </pre>
     */
    assoc: function(array, item)
    {
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (leto.type(array[i]) == 'array' && array[i][0] === item)
            {
                return array[i];	
            }
        }
    },

    //--------------------------------------------------------------------------
    // AT
    //--------------------------------------------------------------------------
    /**
     * Returns the element at <i>index</i>. A negative index counts
     * from the end of <i>self</i>. Return <tt>undefined</tt> if the
     * index is out of range.<br/><br/>
     * The good thing to use this function is support the negative 
     * index.
     *
     * @param   {Number} index - The index of the desired element.
     * @return  {Mix|Undefined} The element at index.
     *
     * @example
     * <pre>
     * a = ["a", "b", "c", "d"]
     * leto.array.at(a, 0)      #=> "a"
     * leto.array.at(a, -1)     #=> "d"
     * </pre>
     */
    at: function(array, index)
    {
        var l = array.length;
        if (index < l && index >= -l)
        {
            return array[(l + index) % l];
        }
    },

    //--------------------------------------------------------------------------
    // COMPACT
    //--------------------------------------------------------------------------
    /**
     * Return a copy of <i>self</i> with all <tt>null</tt>
     * and <tt>undefined</tt> elements removed.
     *
     * @return  {Array} The compacted array.
     *
     * @example
     * <pre>
     * leto.array.compact(["a", null, "b", undefined, "c"])  #=> [ "a", "b", "c"]
     * </pre>
     */
    compact: function(array)
    {
        var rs = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (array[i] != null) rs.push(array[i]);
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // EACH
    //--------------------------------------------------------------------------
    /**
     * Calls a function <i>fn</i> for each element in <i>self</i>.
     * During the call, if function returns <tt>false</tt>, the
     * iteration will stop immedetely, and return the <i>index</i>
     * where stoped.
     *
     * @param   {Function} fn - The called function in iteration.
     * @param   {Object} bind - (optional) The scope to bind.
     *
     * @example
     * <pre>
     * leto.array.each([ "a", "b", "c" ], function(item) {
     *     print item + '~';
     * })
     *
     * <i>produces:</i>
     * "a~b~c~"
     * </pre>
     */
    each: function(array, fn, bind)
    {
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (fn.call(bind || array[i], array[i], i, array) === false)
            {
                return i;
            }
        }	
    },

    //--------------------------------------------------------------------------
    // FILL
    //--------------------------------------------------------------------------
    /**
     * Fill <i>self</i> with elements start from <i>from</i>,
     * total <len> replaced with <i>item</i>.
     *
     * @param   {Mix} item - The item used to fill.
     * @param   {Number} from - The index to start fill.
     * @param   {Number} len - The total to fill.
     *
     * @return  {Array} The filled array.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "c", "d" ]
     * leto.array.fill(a, "x")              #=> [ "x", "x", "x", "x" ]
     * leto.array.fill(a, "t", 1)           #=> [ "x", "t", "t", "t" ]
     * leto.array.fill(a, "z", 2, 2)        #=> [ "x", "t", "z", "z" ]
     * leto.array.fill(a, "m", -2)          #=> [ "x", "t", "m", "m" ]
     * leto.array.fill(a, "w", 6)           #=> [ "x", "t", "m", "m" ]
     * leto.array.fill(a, "w", 6, 0)        #=> [ "x", "t", "m", "m" ,undefined, undefined, undefined]
     * leto.array.fill(a, "w", 5, 4)        #=> [ "x", "t", "m", "m" ,undefined, "w","w","w","w"]
     * </pre>
     */
    fill: function(array, item, from, len)
    {
        var l = array.length;
        if (!from || from < -l)
        {
            from = 0;
        }
        else if (from < 0)
        {
            from = (from + l) % l;
        }
        if (len == null)
        {
            len = l;
        }
        else
        {
            len = from + len;
        }
        if (from > l)
        {
            array[from] = undefined;
        }
        for (var i = from; i < len; i++)
        {
            array[i] = item;
        }
        return array;
    },

    //--------------------------------------------------------------------------
    // FIRST
    //--------------------------------------------------------------------------
    /**
     * Return the first element, or the first <tt>n</tt> elements,
     * of <i>self</i>. If <i>self</i> is empty, return <tt>undefined</tt>.
     *
     * @param   {Number} n - (optional) How many elements to return.
     * @return  {Array|Mix|Undefined} The first n or one element.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "c", "d" ]
     * leto.array.first(a)    #=> "a"
     * leto.array.first(a, 0)   #=> []
     * leto.array.first(a, 1)   #=> ["a"]
     * leto.array.frist(a, 3)   #=> ["a", "b", "c"]
     * </pre>
     */
    first: function(array, n)
    {
        if (leto.type(n) == 'number')
        {
            if (n < 0) return; 
            var rs = [], l = (n > array.length) ? array.length : n;
            for (var i = 0; i < l; i++)
            {
                rs.push(array[i]);
            }
            return rs;
        }
        return array[0];
    },

    //--------------------------------------------------------------------------
    // FLATTEN
    //--------------------------------------------------------------------------
    /**
     * Return a copy of flattened <i>self</i>.
     *
     * @return  {Array} Flattened copy of self.
     *
     * @example
     * <pre>
     * var a = [ 1, 2, [ 3, [ 4, 5 ] ] ]
     * leto.array.flatten(a)        #=> [1, 2, 3, 4, 5]
     * </pre>
     */
    flatten: function(array)
    {
        var flat = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            var type = leto.type(array[i]);	
            if (type)
            {
                //flat = flat.concat((type == 'array' || type == 'arguments') ? (array[i]).flatten() : array[i]);	
                flat = flat.concat((type == 'array') ? self.flatten(array[i]) : array[i]);	
            }
        }
        return flat;
    },

    //--------------------------------------------------------------------------
    // INCLUDE
    //--------------------------------------------------------------------------
    /** 
     * Returns <tt>true</tt> if the given object is present in <i>self</i> (that is, 
     * if any object === anObject), <tt>false</tt> otherwise.  
     *
     * @param   {Mix} item - Any item want to check.
     * @return  {Boolean} True is included, otherwise false.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "c" ]
     * leto.array.include(a, "b")   #=> true
     * leto.array.include(a, "z")   #=> false
     * </pre>
     */
    include: function(array, item)
    {
        return self.indexOf(array, item) > -1;
    },

    //--------------------------------------------------------------------------
    // INDEX OF
    //--------------------------------------------------------------------------
    /**
     * Returns the first (least) index of an element within the array 
     * equal to the specified value, or -1 if none is found.
     *
     * @param   {Mix} item - Any item want to check.
     * @return  {Number} Positive number or zero if found, otherwise -1.
     *
     * @example
     * <pre>
     * a = [ "a", "b", "c" ]
     * leto.array.indexOf(a, "b")   #=> 1
     * leto.array.indexOf(a, "z")   #=> -1
     * </pre>
     */
    indexOf: function(array, item)
    {
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (array[i] === item)
            {
                return i;
            }
        }
        return -1;
    },

    //--------------------------------------------------------------------------
    // INSERT
    //--------------------------------------------------------------------------
    /**
     * Inserts the given values before the element with the given index (which may be negative).  
     *
     * @param   {Number} index - The given index to insert before it.
     * @param   {Varargs} varargs - Any number of items to insert.
     *
     * @return  {Array} Self with new items inserted.
     *
     * @example
     * <pre>
     * a = [ "a", "b", "c", "d" ]
     * leto.array.insert(a, 2, 99)         #=> ["a", "b", 99, "c", "d"]
     * leto.array.insert(a, -2, 1, 2, 3)   #=> ["a", "b", 99, "c", 1, 2, 3, "d"]
     * </pre> 
     */
    insert: function(array, index, varargs)
    {
        var items = Array.prototype.slice.call(arguments, 2);
        if (index < -1)
        {
            index = index + 1;
        }
        else if (index == -1)
        {
            index = array.length;
        }
        items.unshift(index, 0);
        Array.prototype.splice.apply(array, items);
        return array;
    },

    //--------------------------------------------------------------------------
    // LAST
    //--------------------------------------------------------------------------
    /**
     * Return the last element, or the last <tt>n</tt> elements,
     * of <i>self</i>. If <i>self</i> is empty, return <tt>undefined</tt>.
     *
     * @param   {Number} n - (optional) How many elements to return.
     * @return  {Array|Mix|Undefined} The last n or one element.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "c", "d" ]
     * leto.array.last(a)    #=> "d"
     * leto.array.last(a, 0)   #=> [] 
     * leto.array.last(a, 1)   #=> ["d"]
     * leto.array.last(a, 3)   #=> ["b", "c", "d"]
     * </pre>
     */
    last: function(array, n)
    {
        if (leto.type(n) == 'number')
        {
            if (n < 0) return; 
            var rs = [], l = (n > array.length) ? array.length : n;
            for (var i = array.length - l; i < array.length; i++)
            {
                rs.push(array[i]);
            }
            return rs;
        }
        return array[array.length - 1];
    },

    //--------------------------------------------------------------------------
    // MAP
    //--------------------------------------------------------------------------
    /**
     * Creates a new array with the results of calling a provided
     * function <i>fn</i> on every element in <i>self</i>.
     *
     * @param   {Function} fn - The fn to call in iteration.
     * @param   {Object} bind - (optional) The scope to bind.
     * @return  {Array} The maped result array.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "c", "d" ]
     * var b = leto.array.map(a, function(item, index, self, result) {
     *     return item + '!'; 
     * });
     *
     * b    #=> [ "a!", "b!", "c!", "d!" ]
     * </pre>
     */
    map: function(array, fn, bind)
    {
        var rs = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            rs.push(fn.call(bind || array[i], array[i], i, array, rs));
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // RASSOC
    //--------------------------------------------------------------------------
    /**
     * Searches through the <i>self</i> elements are also arrays. Compare
     * <i>key</i> with the second element of each contained array using
     * ===. Returns the first contained array that matches.
     * {@link leto.array#assoc}
     *
     * @param	{Mix} key - The key of each child array's 2nd element searched
     * for.
     * @return	{Array|Undefined} Return child array if found; otherwise 
     * return undefined.
     *
     * @example
     * <pre>
     * var a = [ [ 1, "one" ], [ 2, "two" ], [ 3, "three" ], [ "ii", "two" ] ]
     * leto.array.rassoc(a, "two")		#=> [2, "two"]
     * leto.array.rassoc(a, "four")		#=> undefined
     * </pre>
     */
    rassoc: function(array, key)
    {
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (leto.type(array[i]) == 'array' && array[i][1] === key)
            {
                return array[i];
            }
        }
    },

    //--------------------------------------------------------------------------
    // REJECT
    //--------------------------------------------------------------------------
    /**
     * Creates a new array with all of the elements of <i>self</i> 
     * array for which the provided filtering function <i>fn</i> 
     * returns <tt>false</tt>. 
     *
     * @param	{Function} fn - The filtering function.
     * @param	{Object} bind - The scope to bind.
     * @return	{Array} The filtered result array.
     */
    reject: function(array, fn, bind)
    {
        var rs = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (!fn.call(bind || array[i], array[i], i, array, rs))
            {
                rs.push(array[i]);	
            } 
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // REMOVE
    //--------------------------------------------------------------------------
    /**
     * Returns a copy of <i>self</i> by remove the elements presents
     * in <i>varargs</i>. <i>self</i> that are in <i>varargs</i>. 
     * If no item is removed, return <tt>undefined</tt>.<br/>
     * Note: <br/>
     * No matter how many args passed in, the return will present
     * in array, if no element removed, the array will be an empty
     * array.
     *
     * @param   {Varargs} varargs - Any number of array elements.
     * @return  {Array|Item|Undefined} The removed array or single or undefined.
     *
     * @example
     * <pre>
     * var a = [ "a", "b", "b", "b", "c" ]
     * var b = leto.array.remove(a, "a")        #=> [ "b", "b", "b", "c" ]
     * var c = leto.array.remove(a, "z")        #=> undefined
     * var d = leto.array.remove(a, "a", "b")   #=> [ "c" ]
     * </pre>
     */
    remove: function(array, varargs)
    {
        var removed = [],
            items = Array.prototype.slice.call(arguments);
        for (var i = 0; i < array.length; i++)
        {
            if (self.include(items, array[i]))
            {
                var tmp = array.splice(i, 1);
                if (!self.include(removed, tmp[0]))
                {
                    removed.push(tmp[0]);
                }
                i--;
            }
        }
        return removed;
    },

    //--------------------------------------------------------------------------
    // SELECT
    //--------------------------------------------------------------------------
    /**
     * Creates a new array with all of the elements of <i>self</i> 
     * for which the provided filtering function <i>fn</i> returns 
     * <tt>true</tt>. 
     *
     * @param   {Function} fn - The filtering function.
     * @param   {Object} bind - The scope to bind.
     * @return  {Array} A filtered new array.
     *
     * @example
     * <pre>
     * var a = [ 1, 2, 3, 4, 5, 6 ]
     * var b = leto.array.select(a, function(item) {
     *     return item > 4;
     * });
     *
     * b    #=> [5,6]
     * </pre>
     */
    select: function(array, fn, bind)
    {
        var rs = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (fn.call(bind || array[i], array[i], i, array, rs))
            {
                rs.push(array[i]);		
            }
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // SPLIT
    //--------------------------------------------------------------------------
    /**
     * Return a set of arrays by split the <i>self</i> array,
     * like String.split(). But here <i>sep</i> can be element
     * or function.
     *
     * @param	{Function|Mix} sep - The separator used in split.
     * @param	{Number} limit - The result array length limit.
     * @return	{Array} The splited array.
     *
     * @example
     * <pre>
     * var a = [1,2,3,4,5];
     * leto.array.split(a, 3)			#=> [[1,2],[4,5]]
     *
     * leto.array.split(a, function(item){	#=> [[1],[3],[5]]));
     *     return item % 2 == 0;
     * }) 
     *
     * leto.array.split(a, function(item){	#=> [[1],[3]]
     *     return item % 2 == 0;
     * }, 2) 
     *
     * var a = [1,1,2,1,1];
     * leto.array.split(a, 1)		#=> [[],[],[2],[],[]]
     * </pre>
     */
    split: function(array, sep, limit)
    {
        var fn = sep;
        if (leto.type(sep) != 'function')
        {
            fn = function(item) {return item === sep};
        } 
        if (leto.type(limit) != 'number')
        {
            limit = Number.MAX_VALUE;	
        }
        
        var rs = [], lindex = 0;
        self.each(array, function(item, index)
        {
            if (rs.length < limit)
            {
                if (fn.call(null, item))
                {
                    rs.push(array.slice(lindex, index));
                    lindex = index + 1;
                }
            }
            else
            {
                return false;
            }
        });
        if (rs.length != limit && lindex <= array.length)
        {
            rs.push(array.slice(lindex));
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // TRANSPOSE
    //--------------------------------------------------------------------------
    /**
     * Assumes that <i>self</i> is an array of arrays and transposes
     * the rows and columns.
     *
     * @return	{Return} The transposed array.
     *
     * @example
     * <pre>
     * var a = [ [1, 2], [3, 4], [5, 6] ]
     * leto.array.transpose(a)	#=> [[1,3,5], [2,4,6]]
     * </pre>
     */
    transpose: function(array)
    {
        var l = array[0].length;
        self.each(array, function(item)
        {
            if (leto.type(item) != 'array' || item.length != l)
            {
                throw 'Array.transpose needs a correct elements format!';
                return false;
            }
        });
        return self.zip.apply(null, array);
    },

    //--------------------------------------------------------------------------
    // UNIQ
    //--------------------------------------------------------------------------
    /**
     * Returns a new array by removing duplicate values in <i>self</i>. 
     *
     * @return  {Array} The uniqued copy of self array.
     *
     * @example
     * <pre>
     * var a = [1,2,2,3,3,3,4,4,4,4]
     * var b = leto.array.uniq(a);
     * b    #=> [1,2,3,4]
     * </pre>
     */
    uniq: function(array)
    {
        var rs = [];
        for (var i = 0, l = array.length; i < l; i++)
        {
            if (self.include(rs, array[i]))
            {
                continue;
            }
            rs.push(array[i]);
        }
        return rs;
    },

    //--------------------------------------------------------------------------
    // ZIP
    //--------------------------------------------------------------------------
    /**
     * Converts array arguments to arrays, then merges elements
     * of <i>self</i> with corresponding elements from each
     * argument. This generates a sequence of <i>self.length n</i>
     * -element arrays, where <i>n</i> is one more that the count
     *  of arguments. If the length of any argument is less than
     *  the arguments count plus 1, <tt>undefined</tt> values are
     *  supplied.
     *
     *  @param	{Varargs} varargs - Any number of array with any length.
     *  @return	{Array} The zipped array.
     *
     *  @example
     *  <pre>
     *  var a = [4,5,6];
     *  var b = [7,8,9];
     *  leto.array.zip([1,2,3], a, b)		#=> [[1,4,7],[2,5,8],[3,6,9]]
     *  leto.array.zip([1,2], [8])		#=> [[4,1,8],[5,2,undefined],[6,undefined, undefined]]
     *  </pre>
     */
    zip: function(array, varargs)
    {
        var args = arguments;
        return self.map(array, function(elem, index)
        {
            var sub = [elem];        
            for (var i = 1; i < args.length; i++)
            {
                sub.push(args[i][index]); 
            }
            return sub;
        });
    }
};

})();

//  EOF
