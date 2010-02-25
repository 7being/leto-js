(function($){

execute = leto.mvc.Dispatcher.dispatchAction;
render = leto.mvc.Dispatcher.dispatchRender;
leto.a = leto.array;
leto.h = leto.hash;
leto.s = leto.string;


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
