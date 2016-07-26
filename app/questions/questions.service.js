(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice() {
      // put all variable and function declarations at the top for readability.
      var service = {
        hello: hello,
        save: save
      };
      return service;

      // keep implementation details lower down.
      function hello() {
        console.log("hello from a service");
      }

      function save(){
        
      }
    }


})();
