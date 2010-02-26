(function($) {
//==========================================================================
// SHORTCUT
//========================================================================== 

// lang
leto.a = leto.array;
leto.h = leto.hash;
leto.s = leto.string;

// mvc
execute = leto.mvc.dispatcher.execute;
render = leto.mvc.dispatcher.render;
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
