(function(){
 
leto.namespace('leto.mvc'); 

/**
 * @require leto.mvc.Template
 * TODO mootools, prototype
 */
var self = leto.mvc.View = function(templatePath, viewClass)
{
    $(document).ready(function()
    {
        var dispatcher = leto.mvc.dispatcher;

        // fix prototype
        viewClass.prototype.render = _getViewRender(templatePath);

        var view = new viewClass;

        var name = view.viewName || templatePath
            .slice(templatePath.lastIndexOf("/") + 1, templatePath.lastIndexOf("."))
            .toLowerCase();

        if (name && view)
        {
            renderer.registerView(name, view);
        }
        else
        {
            throw "Can't create view for: " + templatePath;
        }

        leto.setObject(name, view);
    });

    var _getViewRender = function(templatePath)
    {
        var templateRender = _getTemplateRender(templatePath);

        return function()
        {
            (this.preShow || leto.emptyFn).apply(this, arguments);

            var html = templateRender.apply(null, arguments);
            (this.show || leto.emptyFn)(html);

            (this.postShow || leto.emptyFn).apply(this, arguments);
        };
    };

    var _getTemplateRender = function(templatePath)
    {
        var renderer = leto.mvc.renderer;
        var renderFn;

        switch (templatePath.slice(templatePath.lastIndexOf(".") + 1))
        {
            case "jst":
                renderFn = function(data) { return renderer.renderJst(templatePath, data) };
                break;
            //case "xsl":
            //    renderFn = function(data) { return renderer.xsltUrlRender(templatePath, data) };
            //    break;
        };

        return renderFn;
    };
};

leto.createView = self;

 })();

//  EOF
