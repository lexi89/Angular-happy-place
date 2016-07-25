// Services should have one responsibility. Typically fetching and managing data storage. If a factory begins to take on more than one responsibility, split off into another.

(function(){

  angular
    .module("todos")
    .factory("todoservice", todoservice);

    function todoservice() {
      // put all variable and function declarations at the top for readability.
      var service = {
        hello: hello,
        goodbye: goodbye
      };
      return service;

      // keep implementation details lower down.
      function hello() {
        console.log("hello from a service");
      }
      function goodbye() {
        console.log("goodbye from a service");
      }
    }


})();
