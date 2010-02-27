(function($) {
//==========================================================================
// SHORTCUT
//========================================================================== 

// lang
leto.a = leto.array;
leto.h = leto.hash;
leto.s = leto.string;

// mvc
action = leto.mvc.dispatcher.action;
render = leto.mvc.renderer.render;
params = leto.mvc.helper.params;
expand = leto.mvc.helper.expand;



$.fn.link_to_remote = function(config)
{
    this.click(leto.remote.link_to_remote(config));
    return this;
};

$.fn.remote_form_for = function(config)
{
    this.submit(leto.remote.remote_form_for(config));
    return this;
};

})(jQuery);

//  EOF
