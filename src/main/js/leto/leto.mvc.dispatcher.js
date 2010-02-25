(function() {
//==========================================================================
// DISPATCHER
//========================================================================== 
leto.namespace('leto.mvc');

var self = leto.mvc.Dispatcher = function() 
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
            throw "Found two different Controller trying to register as name: "
                + controlName;
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
            throw "Found two different View trying to register as name: "
                + viewName;
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

self.getInstance = function() 
{
	if (self._instance) 
    {
		return self._instance;
	}
	return self._instance = new self();
};

execute = self.getInstance().dispatchAction;
render = self.getInstance().dispatchRender;

})();

//	EOF
