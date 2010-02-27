(function($) {
//==========================================================================
// REMOTE
//========================================================================== 
leto.namespace('leto.remote');

// template
var _tpl_link2remote = [
       '   var _self_ = this;                                       ' ,
       '   if(@confirm@) {                                          ' ,
       '       if(@condition@) {                                    ' ,
       '           @before@;                                        ' ,
       '           $.ajax({                                         ' ,
       '               url: @url@,                                  ' ,
       '               data: @data@,                                ' ,
       '               type: @method@ || "get",                     ' ,
       '               async: @async@ || true,                      ' ,
       '               error: function(xhr, txt, err) {             ' ,
       '                   @failure@                                ' ,
       '               },                                           ' ,
       '               success: function(data, txt) {               ' ,
       '                   @update@;                                ' ,
       '                   @success@;                               ' ,
       '               },                                           ' ,
       '               complete: function(xhr, txt) {               ' ,
       '                   @complete@                               ' ,
       '               }                                            ' ,
       '           });                                              ' ,
       '           @after@                                          ' ,
       '       }                                                    ' ,
       '   }                                                        '
].join('').replace(/\s\s*/g, '') + 'return false';

// template
var _tpl_remoteform4 = _tpl_link2remote.replace('get', 'post').replace('@data@', '$(this).serialize()');

// global
leto.remote =
{
    remote_form_for: function(config)
    {
        return _substitute(_tpl_remoteform4, config);
    },

    /**
     * url
     * update => "#body .flash" or "$('#body .flash')" or "$(this).find('.flash')"
     * TODO success/failure
     * position => "before", "top", "bottom", "after"
     * method => "get"(default), "post"
     *
     * loading      => TODO
     * loaded       => TODO
     * interactive  => TODO
     *
     * TODO addtional callbacks for sepcific status code like 404
     *
     * success      => Called when xhr is completed, and the HTTP status code is in 2xx range
     * failure      => Called when xhr is completed, and the HTTP status code is not in 2xx range
     * complete     => Called when xhr is complete (fires after success/failure if they are present)
     *
     * confirm      => Adds confirmation dialog
     * condition    => Perform remote request conditionally by this expression. Use this to describe
     *                 browser-side conditions when request should not be initiated.
     * before       => Called before request is initiated.
     * after        => Called immediately after request was initiated and before :loading
     * submit       TODO
     * data        => A javascript expression sepcifying the parameters for the xhr. Any expressions
     *                 should return a valid URL query string.
     */
    link_to_remote: function(config)
    {
        return _substitute(_tpl_link2remote, config);
    }
};

var _substitute = function(template, params)
{
    var fnbody = template.replace(/@(\w+)@/g, function(m, key)
    {
        var value = params[key];

        // replace this with _self, to make sure this refer back to the element
        switch (key)
        {
            case 'update':
            case 'success':
            case 'failure':
            case 'complete':
            // fix this reference in $.ajax callbacks
            if (value)
            {
                value = value.replace(/\$\(this\)/g, '$(_self_)');
            } 
        }

        // deal with where to put the response
        if (key == 'update' && value)
        {
            var fn = 'html';
            switch (params.position)
            {
                case 'before':
                    fn = 'before';
                    break;
                case 'top':
                    fn = 'prepend';
                    break;
                case 'bottom':
                    fn = 'append';
                    break;
                case 'after':
                    fn = 'after';
                    break;
            }

            // append $() constructor if user didn't provided
            if(!/\$\(.+\)/.test(value))
            {
                value = '$("' + value + '")';
            }
            // insert/replace html with proper jquery method
            value += '.' + fn + '(data)';
        }

        // escape quote, etc..
        switch(key)
        {
            case 'confirm':
                value = value ? 'confirm(\'' + value + '\')' : 'true';
                break;
            case 'condition':
                value = value || 'true';
                break;
            case 'method':
            case 'url':
                value = '\'' + (value || '') + '\'';
                break;
            case 'data':
                // TODO serialize if is hash
        }        
        return value || 'null';
    });
    // create a function on the fly
    return new Function(fnbody);
};


var _DEBUG_ = false;
if (_DEBUG_)
{
    $.ajaxSetup(
    {
        error: function(xhr, status, error) 
        {
            if (status == 'error') 
            {
                // TODO open a blank window
                document.write(xhr.responseText);
            }
        }  
    });
}

})(jQuery);

//  EOF
