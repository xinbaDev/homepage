(function($) {
  $.fn.tilda = function(eval, options) {
    eval = eval || function(cmd, term) {
        term.echo("you don't set eval for tilda");
    };
    options = options || {};

    var afterGreeting = "Hello, and welcome."
        +"Welcome to my console!\n"
        +"Enter 'ls' for a list of commands.\n";

    var settings = {
        prompt: 'Guest@alexxin.me: ~/$ ',
        name: 'tilda',
        height: 200,
        enabled: false,
        greetings: afterGreeting,
        keypress: function(e) {
            if (e.which == 96) {
                return false;
            }
        }
    };
    if (options) {
        $.extend(settings, options);
    }

    var self = this;
    this.append('<div class="td" style="opacity: 0.5; height: 100px; bottom: 0; position: fixed; width: 100%;"></div>');
    self.terminal = this.find('.td').terminal(eval, settings);
    var focus = false;

    $('body').keypress(function(e) {
        if (e.which == 96) {
            self.slideToggle('fast');
            self.terminal.focus(focus = !focus);
            self.terminal.attr({
                scrollTop: self.terminal.attr("scrollHeight")
            });
        }
    });

    return this;
  };
})($);

(function($) {
  $(document).ready(function() {

    var commandText = function(text) {
      return "[[;#33D633;]" + text + "]";
    }

    var paperText = function(text) {
      return "[[;#0099FF;]" + text + "]";
    }

    var logoText = function(text) {                
      return "[[gb;#FFCC00;]" + text + "]";
    }

    $('#tilda').tilda(function(cmd, term) {
        if (cmd.toLowerCase() === 'ls') {
          term.echo("Current Commands are: \n\n"  
              + commandText("Resume")
              + commandText("\tGithub")
              + commandText("\tClear")
              );
        } else if (cmd.toLowerCase() === "resume") {
          term.echo("\n" + paperText("Unforuntuately, nothing yet"));
          
        } else if(cmd.toLowerCase() ===  'github') {
          term.echo("\n" + logoText("Opening git hub account..."));
          var win = window.open("https://github.com/xinbaDev/","_blank"); 
          win.focus();
        }
        else if(cmd.toLowerCase() === 'clear') {             
          term.clear();
        }
    })
  });
})(jQuery);

