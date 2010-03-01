(function() {
//==========================================================================
// MVC DISPATCHER
//========================================================================== 
leto.namespace('leto.mvc');

leto.mvc.dispatcher =
{   
    //==========================================================================
    // PUBLIC METHODS
    //==========================================================================

    //--------------------------------------------------------------------------
    // REGISTER
    //--------------------------------------------------------------------------
    register: function(name, controlObj) 
    {
        if (_table[name] && _table[name] !== controlObj)
        {
            throw "Found two different Controller trying to register as name: "
                + name;
        }
        _table[name] = controlObj;
    },

    //--------------------------------------------------------------------------
    // ACTION
    //--------------------------------------------------------------------------
    action: function(controlName, action, params) 
    {
        var args = Array.prototype.slice.call(arguments, 2);

        var control = _table[controlName];
        if (!control)
        {
        
            throw "Controller registered with name " + controlName + " is not found.";
        }

        if (!control[action])
        {
            throw "Action " + action + " not found in " + controlName + " controller.";
        }

        return control[action].apply(control, args);
    }
};

    //==========================================================================
    // PRIVATE MEMBERS
    //==========================================================================
    var _table = {};

})();

//	EOF
