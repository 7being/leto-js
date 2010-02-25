(function(){

leto.namespace('leto.mvc');

leto.mvc.Dispatcher = new function()
{
    //==========================================================================
    // MEMBERS
    //==========================================================================
    var that = this;

    var _controlTable = {};
    var _viewTable = {};

    //==========================================================================
    // PROPERTIES
    //==========================================================================
    
    //==========================================================================
    // METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // REGISTER CONTROLLER
    //--------------------------------------------------------------------------
    this.registerController = function(controlName, controlObj) 
    {
        if (_controlTable[controlName] && _controlTable[controlName] !== controlObj)
        {
            throw "Found two different Controller trying to register as name: " + controlName;
        }
        _controlTable[controlName] = controlObj;
    };

    //--------------------------------------------------------------------------
    // REGISTER VIEW
    //--------------------------------------------------------------------------
    this.registerView = function(viewName, viewObj) 
    {
        if (_viewTable[controlName] && _viewTable[controlName] !== controlObj)
        {
            throw "Found two different View trying to register as name: " + viewName;
        }
        _viewTable[viewName] = viewObj;
    };

    //--------------------------------------------------------------------------
    // DISPATCH ACTION
    //--------------------------------------------------------------------------
    this.dispatchAction = function(controlName, action, params) 
    {
        var args = Array.prototype.slice.call(arguments, 2);

        var control = _controlTable[controlName];
        if (!control[action])
        {
            throw "Action " + action + " not found in " + controlName + " controller.";
        }

        return control[action].apply(control, args);
    };

    //--------------------------------------------------------------------------
    // DISPATCH RENDER
    //--------------------------------------------------------------------------
    this.dispatchRender = function(viewName, params) 
    {
        var args = Array.prototype.slice.call(arguments, 1);

        var view = _viewTable[viewName];
        if (!view)
        {
            throw "View " + viewName + " not found.";
        }

        return view.render.apply(view, args); 
    };
};

leto.mvc.Renderer = new function()
{
    //==========================================================================
    // MEMBERS
    //==========================================================================
    var that = this;

    var _templateCache = {};

    //==========================================================================
    // PROPERTIES
    //==========================================================================
    this.cache = true;
    
    //==========================================================================
    // METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // JST RENDER
    //--------------------------------------------------------------------------
    /**
     * @require TrimPath
     */
    this.jstRender = function(template, data) 
    {
    	if (that.cache && !_templateCache[template]) 
        {
            //_templateCache[template] = TrimPath.parseDOMTemplate(template)
            var templateObject = TrimPath.parseTemplate(template);
    	}

    	//var result = _templateCache[template].process(data);
    	var result = templateObject.process(data);

        return result;
    };

    //--------------------------------------------------------------------------
    // JST URL RENDER
    //--------------------------------------------------------------------------
    this.jstUrlRender = function(templateUrl, data) 
    {
        if (that.cache && !_templateCache[templateUrl])
        {
            var template = _fetch(templateUrl);
            _templateCache[templateUrl] = _jstParser(template);
        }

        var jstObject = _templateCache[templateUrl];
        var result = jstObject.process(data);

        return result;
    };

    //--------------------------------------------------------------------------
    // XSLT RENDER
    //--------------------------------------------------------------------------
    /**
     * @require Sarissa
     */
    this.xsltRender = function(template, data) 
    {
        var xsl = _xslParser(template);
        var result = _xslTransform(xsl, data);

        return result;
    };

    //--------------------------------------------------------------------------
    // XSLT URL RENDER
    //--------------------------------------------------------------------------
    this.xsltUrlRender = function(templateUrl, data)
    {
        if (that.cache && !_templateCache[templateUrl])
        {
            var template = _fetch(templateUrl);
            _templateCache[templateUrl] = _xslParser(template);
        }

        var xsl = _templateCache[templateUrl];
        var result = _xslTransform(xsl, data);

        return result;
    };

    //--------------------------------------------------------------------------
    // EJS RENDER
    //--------------------------------------------------------------------------
    /**
     * @require EJS
     */
    this.ejsRender = function(template, data) 
    {
        var ejs = new EJS({ text: template });
        var result = ejs.render(data);

        return result; 
    };

    //--------------------------------------------------------------------------
    // EJS URL RENDER
    //--------------------------------------------------------------------------
    this.ejsUrlRender = function(templateUrl, data)
    {
        var template = _fetch(templateUrl);
        return that.ejsRender(template, data);
    };
    
    //--------------------------------------------------------------------------
    // REPLACE WITH
    //--------------------------------------------------------------------------
    this.replaceWith = function(selector, html) 
    {
    	return _replaceHtml(selector, html);
    };

    //--------------------------------------------------------------------------
    // APPEND TO
    //--------------------------------------------------------------------------
    this.appendTo = function(selector, html) 
    {
        return $(selector).append(html);
    };

    //--------------------------------------------------------------------------
    // PREPEND TO
    //--------------------------------------------------------------------------
    this.prependTo = function(selector, html) 
    {
        return $(selector).prepend(html);
    };
    
    //==========================================================================
    // PRIVATE IMPLEMENTATION
    //==========================================================================

    //--------------------------------------------------------------------------
    // REPLACE HTML
    //--------------------------------------------------------------------------
    function _replaceHtml(selector, html)
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
    }

    //--------------------------------------------------------------------------
    // FETCH
    //--------------------------------------------------------------------------
    function _fetch(path)
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
    }

    //--------------------------------------------------------------------------
    // JST PARSE
    //--------------------------------------------------------------------------
    function _jstParser(template)
    {
        var jst = TrimPath.parseTemplate(template);

        return jst;
    }

    //--------------------------------------------------------------------------
    // XSL PARSE
    //--------------------------------------------------------------------------
    function _xslParser(template)
    {
        var xsl = (new DOMParser()).parseFromString(template, "text/xml");
        if (Sarissa.getParseErrorText(xsl) != Sarissa.PARSED_OK)
        {
            alert(Sarissa.getParseErrorText(xsl));
        } 

        return xsl;
    }

    //--------------------------------------------------------------------------
    // XSL TRANSFORM
    //--------------------------------------------------------------------------
    function _xslTransform(xslDoc, xmlData) 
    {
        var xmlDoc = (new DOMParser()).parseFromString(xmlData, "text/xml");
        if (Sarissa.getParseErrorText(xmlDoc) != Sarissa.PARSED_OK)
        {
            alert(Sarissa.getParseErrorText(xmlDoc));
        }

        var xslt = new XSLTProcessor();
        xslt.importStylesheet(xslDoc);

        var output = xslt.transformToDocument(xmlDoc);
        var result = (new XMLSerializer()).serializeToString(output);

        return result; 
    }
};

})();

//  EOF
