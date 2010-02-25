(function() {
//==========================================================================
// LETO
//==========================================================================
if (window.leto) return;

leto =
{
	//==========================================================================
    // PUBLIC METHODS
    //==========================================================================
	
    //--------------------------------------------------------------------------
    // NAMESPACE
    //--------------------------------------------------------------------------
    namespace: function(ns)
    {
        var n = ns.split("."),
            o = window;
        for (var i = 0; i < n.length; i++) {
            o = o[n[i]] = o[n[i]] || {};    
        }
        return o;
    },

	//--------------------------------------------------------------------------
    // SET OBJECT
    //--------------------------------------------------------------------------
    setObject: function(name, value, context)
    {
        var n = name.split("."),
            k = n.pop(),
            o = context || window;
        for (var i = 0; i < n.length; i++) {
            o = o[n[i]] = o[n[i]] || {};
        }
        return k ? o[k] = value : undefined;
    },

	//--------------------------------------------------------------------------
    // GET OBJECT
    //--------------------------------------------------------------------------
    getObject: function(name, context)
    {
        var n = name.join ? name : name.split("."),           
            k = n.shift(),
            o = context || window;
        return n.length ? (o[k] ? Leto.getObject(n, o[k]) : undefined) : o[k];
    },

	//--------------------------------------------------------------------------
    // HAS OBJECT
    //--------------------------------------------------------------------------
    hasObject: function(name, context)
    {
        return Leto.getObject(name, context) !== undefined;
    },

	//--------------------------------------------------------------------------
    // EMPTY FN
    //--------------------------------------------------------------------------
    emptyFn: function() {},

	//--------------------------------------------------------------------------
    // TYPE
    //--------------------------------------------------------------------------
    /**
     * Return string to identify this type of object passed in, return
     * false if the passed in object is null or undefined
     *
     * @param   {Mix} o Any kind of js object.
     * @return  {String} A string presents the type of the object passed in.
     *
     * @example
     * <pre>
     * leto.type()				#=> false
     * leto.type(null)			#=> false
     * leto.type(undefined)		#=> false
     * leto.type(1)				#=> 'number'
     * leto.type(Number(1))		#=>	'number'
     * leto.type('abc')			#=> 'string'
     * leto.type(String('abc')) #=>	'string'
     * leto.type([])			#=> 'array'
     * leto.type(new Array)		#=> 'array'
     * leto.type(arguments)		#=> 'arguments' // works except opera. leto.type(arguments) #=> 'array' in opera
     * leto.type(leto.emptyFn)	#=> 'function'
     * leto.type({})			#=> 'object'
     * leto.type(new Date)		#=> 'date'
     * leto.type(//)			#=> 'regexp'
     *
     * others used on doc have 'element', 'textnode', 'whitespace', nodeList'
     * </pre>
     */
    type: function(o) 
    {
        if (o === undefined || o === null) return false;
        if (o.htmlElement) return 'element';
        var t = typeof o;
        if (t == 'object')
        {
            if (o instanceof String) return 'string';
            if (o instanceof Number) return 'number';
            if (o instanceof Boolean)return 'boolean';
            if (o instanceof Date) return 'date';
            if (o.nodeName) switch (o.nodeType)
            {
                case 1: return 'element';
                case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
            }
        }
        if (t == 'object' || t == 'function')
        {
            switch(o.constructor)
            {
                case Array: return 'array';
                case RegExp: return 'regexp';
            }
            if (typeof o.length == 'number')
            {
                if (o.callee) return 'arguments';
                if (typeof o.item == 'function') return 'nodeList';
            }
        }
        return t;
    },

	//--------------------------------------------------------------------------
    // CLONE
    //--------------------------------------------------------------------------
    /**
     * Deep clone Array, Object, Date, link others, like function, regexp
     * a = [1, 'a', //g, function(){}, {k: 'val'}]
     * b = leto.clone(a)
     *
     * a !== b
     * a[0] === b[0]
     * a[1] === b[1]
     * a[2] === b[2]
     * a[3] === b[3]
     * a[4] !== b[4]
     * a[4]['k'] === b[4]['k']
     */
    clone: function(o, keeplink)
    {
        if (!o) return o;
        var t = leto.type(o);
        if (t == 'array')
        {
            var c = [];
            for (var i = 0, l = o.length; i < l; i++)
            {
                c.push(leto.clone(o[i], keeplink));
            }
            return c;
        } 
        if (t == 'object')
        {
                var c = {};
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k))
            {
                c[k] = leto.clone(o[k], keeplink);	
            }
            return c;
        } 
        if (t == 'date') return new Date(+o);
        if (t == 'string' || t == 'number') return o;
        if (keeplink) return o;
    },

	//--------------------------------------------------------------------------
    // EQUAL
    //--------------------------------------------------------------------------
    /**
     * a = [1, 2, 3, {k1: 'foo', k2: String('bar'}]
     * b = [1, 2, 3, {k1: 'foo', k2: 'bar'}]
     * leto.equal(a, b)			#=> true
     *
     * h1 = {k1: 'a', k2: 'b', k3: 'c'}
     * h2 = {k2: 'b', k1: 'a', k3: 'c'}
     * leto.equal(h1, h2)		#=>	true
     *
     */
    equal: function(o1, o2)
    {
        var t1 = leto.type(o1), t2 = leto.type(o2);
        if (t1 != t2) return false;
        if (!t1 || o1 == o2) return true;
        if (t1 == 'array')
        {
            if (o1.length != o2.length) return false;
            for (var i = 0, l = o1.length; i < l; i++)
            {
                if (!leto.equal(o1[i], o2[i])) return false;
            }
            return true;
        }
        if (t1 == 'object')
        {
            var c = 0;
            for (var k in o1) c++;
            for (var k in o2) c--;
            if (c) return false;
//hasOwnProperty?
            for (var k in o1)
            {
                if (!leto.equal(o1[k], o2[k])) return false;
            }
            return true;
        } 
        if (t1 == 'date') return +o1 == +o2;
        return false;
    }
};

})();

//  EOF
