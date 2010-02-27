(function(){
 
leto.namespace('leto.mvc');

/**
 * @require leto.mvc.Dispatcher
 */
var self = leto.mvc.Controller = function(className, controllerClass) 
{
    var dispatcher = leto.mvc.Dispatcher.getInstance();

    var name = className.split(".").pop().replace(/Controller$/, "").toLowerCase();
    var controller = new controllerClass;

    if (name && controller)
    {
        dispatcher.registerController(name, controller);
    }
    else
    {
        throw "Can't create controller: " + className;
    }

    return leto.setObject(className, controller);
};

leto.createController = self;
 
})();

//  EOF
