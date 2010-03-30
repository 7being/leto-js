(function() {
//==========================================================================
// MVC HELPER
//========================================================================== 
leto.namespace('leto.mvc');

var self = leto.mvc.helper =
{
    //==========================================================================
    // PUBLIC METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // PARAMS
    //--------------------------------------------------------------------------
    params: function(selector, context)
    {
        var result = {};

        $(selector, context).each(function(index)
        {
            var key = this.name || this.id;

            if (!key) return;
            if ($(this).is(':checkbox') || $(this).is(':radio'))
            {
                if (!this.checked) return;
            }
            if (result[key])
            {
                if (!result[key].join)
                {
                    result[key] = [result[key]];
                }
                result[key].push(_val(this));
            }
            else
            {
                result[key] = _val(this);
            }
            /*
            if (!key)
            {
                if (this.tagName.toLowerCase() == 'option' && this.selected)
                {
                    key = this.parentNode.name || this.parentNode.id;
                }
                if (!key) return;
            } 

            if ($(this).is(':checkbox'))
            {
                if (this.checked)
                {
                    result[key] = result[key] || [];
                    result[key].push(_val(this));
                }
            }
            else if ($(this).is(':radio'))
            {
                if (this.checked)
                {
                    result[key] = _val(this);
                }
            }
            else
            {
                if (result[key] == null)
                {
                    result[key] = _val(this);
                }
                else
                {
                    if (!result[key].join)
                    {
                        result[key] = [result[key]];
                    }
                    result[key].push(_val(this));
                }
            }
            */
        });

        return result;
    },

    //--------------------------------------------------------------------------
    // EXPAND
    //--------------------------------------------------------------------------
    expand: function(selector, context, delim)
    {
        var params = self.params(selector, context);
        return _expandProperties(params, delim);
    }

};

    //==========================================================================
    // PRIVATE METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // VAL
    //--------------------------------------------------------------------------
    var _val = function(el)
    {
        try
        {
            return $(el).val();
        }
        catch (e)
        {
            //jQuery.val throws TypeError if el.value is not a string(eg. number)
            return el.value;
        }
    };
	
    //--------------------------------------------------------------------------
    // EXPAND PROPERTIES
    //--------------------------------------------------------------------------
    var _expandProperties = function(obj, delim)
    {
        var result = {};
        
        for (var name in obj) if (obj.hasOwnProperty(name))
        {
            var n = name.split(delim || '.');
            var o = result;
            for (var i=0; i<n.length; i++)
            {
                if (i < n.length - 1)
                {
                    o[n[i]] = o[n[i]] || {};
                    o = o[n[i]];
                }
                else
                {
                    o[n[i]] = obj[name];
                }
            }
        }
        return result;
    };
 
})();

//  EOF
