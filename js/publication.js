/**
 * @Author: Yong Yang
 * @Date:   03-25-2019 13:34:15
 * @Email:  yyang@wtamu.edu
 * @Last modified by:   Yong Yang
 * @Last modified time: 03-28-2019 12:48:14
 */

$( document ).ready(function() {
   // Use ajax to parse publication.json into publications section.
  $.ajax({
    type: "GET",
    url:"includes/publication.json",
    mimeType: "application/json",
    success: function(data){
      var bookTemplate = $("#bookStore").html();
      var compiledTemplate = Handlebars.compile(bookTemplate);
      var html = compiledTemplate(data);
      $(".paper").append(html);

      // Startup MixItUp
      var mixer = mixitup(".paper",{
        selectors: {
          control: '[data-mixitup-control]'
        }
      });

    }
  });

  //Handlebars helper
    Handlebars.registerHelper('parseName', function(name) {
      var na=name.split(",");
      return na[1]+" "+na[0];
    });

    Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
      if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
      var operator = options.hash.operator || "==";
      var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
      }

      if (!operators[operator])
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

      var result = operators[operator](lvalue,rvalue);
      if( result ) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });




});
