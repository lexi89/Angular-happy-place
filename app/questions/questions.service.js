(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice($http) {
      // put all variable and function declarations at the top for readability.
      var service = {
        saveQuestion: saveQuestion,
        solveQuestion: solveQuestion,
        fetchQuestions: fetchQuestions,
        test:test
      };
      return service;

      function saveQuestion(question, answer){
        return $http({
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
          return success;
        })
        .catch(function (error){
          return error;
        });
      }

      function fetchQuestions(){
        return $http.get("/questions")
        .then(function(response){
          return response.data;
        })
        .catch(function(error){
          return error;
        });
      }

      function solveQuestion(question){
        return eval(question);
      }

      function test(){
        console.log("You're in the question service");
      }
    }


})();
