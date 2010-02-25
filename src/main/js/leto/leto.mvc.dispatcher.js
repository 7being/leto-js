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
    // REGISTER CONTROLLER
    //--------------------------------------------------------------------------
	registerController: function(controlName, controlObj) 
	{
        if (_controlTable[controlName] && _controlTable[controlName] !== controlObj)
        {
            throw "Found two different Controller trying to register as name: "
                + controlName;
        }
		_controlTable[controlName] = controlObj;
	},

    //--------------------------------------------------------------------------
    // REGISTER VIEW
    //--------------------------------------------------------------------------
    registerView: function(viewName, viewObj) 
    {
        if (_viewTable[controlName] && _viewTable[controlName] !== controlObj)
        {
            throw "Found two different View trying to register as name: "
                + viewName;
        }

        _viewTable[viewName] = viewObj;
    },

	//--------------------------------------------------------------------------
    // EXECUTE
    //--------------------------------------------------------------------------
	execute: function(controlName, action, params) 
	{
		var args = Array.prototype.slice.call(arguments, 2);

		var control = _controlTable[controlName];
		if (!control[action])
		{
			throw "Action " + action + " not found in " + controlName + " controller.";
		}

		return control[action].apply(control, args);
	},

    //--------------------------------------------------------------------------
    // RENDER
    //--------------------------------------------------------------------------
    render: function(viewName, params) 
    {
        var args = Array.prototype.slice.call(arguments, 1);

        var view = _viewTable[viewName];
        if (!view)
		{
			throw "View " + viewName + " not found.";
		}

		return view.render.apply(view, args); 
    }
};

	//==========================================================================
    // PRIVATE MEMBERS
    //==========================================================================
	var _controlTable = {};
    var _viewTable = {};

})();

//	EOF
