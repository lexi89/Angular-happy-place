(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice() {
      // put all variable and function declarations at the top for readability.
      var service = {
        hello: hello,
        saveQuestion: saveQuestion
      };
      return service;

      // keep implementation details lower down.
      function hello() {
        console.log("hello from a service");
      }

      function saveQuestion(question, answer){
        $http({
          method: "POST",
          url: "/newquestion",
          headers: {
            "Content-type" : "application/json"
          },
          data: {
            "question": question,
            "answer": answer
          }
        })
        .then(function(success){
          console.log("success: "+ success);
        }, function(fail){
          console.log("fail: " + fail);
        });
      }

      function solveQuestion(question){
        // return the answer
      }
    }


})();
