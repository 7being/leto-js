#!/usr/bin/env ruby -wKU

def generate(args)
    type = args[0].downcase
    named = args[1]#.capitalize
    case type
    when "controller": generate_controller(named)
    when "model": generate_model(named)
    when "view": generate_view(named)
    when "test": generate_test(named)
    end
end

def generate_controller(named)

    class_name = "#{named}Controller"
    file_name = "#{class_name}.js"
    template = %{
//===========================================================================
// #{file_name}
//===========================================================================
(function() {

//===========================================================================
// #{named.upcase} CONTROLLER
//===========================================================================
/**
 * @class   #{class_name}
 */
leto.createController("app.#{class_name}", function()
{

    //========================================================================
    // PRIVATE MEMBERS
    //======================================================================== 
    var that = this;

    //========================================================================
    // PUBLIC METHODS
    //========================================================================

    //-----------------------------------------------------------------------
    // START
    //-----------------------------------------------------------------------
    this.start = function()
    {
    
    };

    //========================================================================
    // PRIVATE METHODS
    //========================================================================

});

})();

// EOF
    }.sub(/^\s+/, '')

    write file_name, template
end

def generate_model
    p 'O'
end

def generate_view(named)
    
    file_name = "#{named}View.js"
    template = %{
//===========================================================================
// #{file_name}
//===========================================================================
(function() {

    //========================================================================
    // VIEWS
    //======================================================================== 

    //-----------------------------------------------------------------------
    // SAMPLE VIEW
    //-----------------------------------------------------------------------
    leto.createView("path/to/your/template.jst", function()
    {
        //this.viewName = "OverrideDefault";

        this.preShow = function(data)
        {
        
        };

        this.show = function(html)
        {

        };

        this.postShow = function(data)
        {

        };
    });

    //========================================================================
    // PRIVATE METHODS
    //========================================================================

})();

// EOF
    }.sub(/^\s+/, '')

    write file_name, template
end

def generate_test
end

private
def write(file_name, file_content)
    raise "File #{file_name} already exist!" if File.exist? file_name
    File.open(file_name, "w") { |file| file.write file_content }
end

generate(ARGV)
