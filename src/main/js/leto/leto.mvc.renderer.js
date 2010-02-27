(function() {
//==========================================================================
// MVC RENDERER
//==========================================================================
leto.namespace('leto.mvc');

/**
 * @require TrimPath.js
 */
var self = leto.mvc.renderer =
{
    //==========================================================================
    // PROPERTIES
    //==========================================================================
    cache: true,
    
    //==========================================================================
    // PUBLIC METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // REGISTER
    //--------------------------------------------------------------------------
    register: function(name, view)
    {
       _table[name] = (typeof view == 'function') ?  new view : view; 
    },

    //--------------------------------------------------------------------------
    // RENDER
    //--------------------------------------------------------------------------
    render: function(viewName, render, params)
    {
        var args = Array.prototype.slice.call(arguments, 2);
        var view = _table[viewName];
        var method = 'render' + render.charAt(0).toUpperCase() + render.slice(1);
        if (!view[method])
        {
            throw method + ' not found in ' + viewName + ' view';
        }
        return view[method].apply(view, args);
    },

    //--------------------------------------------------------------------------
    // RENDER JST 
    //--------------------------------------------------------------------------
    /**
     * @require TrimPath
     */
    renderJst: function(template, data) 
    {
        var jst;
        if (self.cache)
        {
            var crc32 = leto.algo.crc32(template);
            jst = _cache[crc32] = _cache[crc32] || _parseJstTemplate(template);
        }
        else
        {
            jst = _parseJstTemplate(template);
        }

    	var result = jst.process(data);
        return result;
    },

    //--------------------------------------------------------------------------
    // REPLACE WITH
    //--------------------------------------------------------------------------
    replaceWith: function(selector, html) 
    {
    	return _replaceHtml(selector, html);
    },

    //--------------------------------------------------------------------------
    // APPEND TO
    //--------------------------------------------------------------------------
    appendTo: function(selector, html) 
    {
        return $(selector).append(html);
    },

    //--------------------------------------------------------------------------
    // PREPEND TO
    //--------------------------------------------------------------------------
    prependTo: function(selector, html) 
    {
        return $(selector).prepend(html);
    }
}; 

    //==========================================================================
    // PRIVATE MEMBERS
    //==========================================================================

    var _table = {};
    var _cache = {};
	
    //==========================================================================
    // PRIVATE METHODS
    //==========================================================================
	
    //--------------------------------------------------------------------------
    // REPLACE HTML
    //--------------------------------------------------------------------------
    var _replaceHtml = function(selector, html) 
    {
        //var oldEl = typeof el === "string" ? document.getElementById(el) : el;
        // Pure innerHTML is slightly faster in IE
        var oldEl = $(selector)[0];
        /*@cc_on
            oldEl.innerHTML = html;
            return $(oldEl);
        @*/
        var newEl = oldEl.cloneNode(false);
        newEl.innerHTML = html;
        oldEl.parentNode.replaceChild(newEl, oldEl);
        return $(newEl);
    };

    //--------------------------------------------------------------------------
    // FETCH
    //--------------------------------------------------------------------------
    var _fetch = function(path)
    {
        var result = '';

        var options = 
        {
            type: 'GET',
            url: path,
            async: false
        };

        result = $.ajax(options).responseText;

        return result;
    };

    //--------------------------------------------------------------------------
    // JST PARSE JST
    //--------------------------------------------------------------------------
    var _parseJstTemplate = function(template) 
    {
        var jst;
        if (document.getElementById(template))
        {
            jst = TrimPath.parseDOMTemplate(template);
        }
        else if (/\.jst$/.test(template))
        {
            jst = TrimPath.parseTemplate(_fetch(template));
        }
        else
        {
            jst = TrimPath.parseTemplate(template);
        }
        return jst;
    };

})();

//  EOF
