(function() {
/**
 * exported Global namespace & functions
 * 
 * execute
 * render
 * params
 * expand
 */
leto.namespace('leto.mvc');

var self = leto.mvc.Helper =
{
    params: function(selector, context)
    {
        var result = {};
        var _val = self._val;

        $(selector, context).each(function(index)
        {
            var key = this.name || this.id;

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
        });

        return result;
    },

    expand: function(selector, context, delim)
    {
        var params = moho.support.params(selector, context);
        return self._expandProperties(params, delim);
    },

    _val: function(el)
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
    },

    _expandProperties: function(obj, delim)
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
    }
};
 
})();

//	EOF
