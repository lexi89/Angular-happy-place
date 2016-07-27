(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice($http) {
      // put all variable and function declarations at the top for readability.
      var service = {
        saveQuestion: saveQuestion,
        solveQuestion: solveQuestion,
        fetchQuestions: fetchQuestions
      };
      return service;

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

      function fetchQuestions(){
        return $http.get("/questions")
        .then(function(response){
          console.log(response.data);
          return response.data;
        })
        .catch(function(error){
          return error;
        });
      }

      function solveQuestion(question){
        return eval(question);
      }
    }


})();
