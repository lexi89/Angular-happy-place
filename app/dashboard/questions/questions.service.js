(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice($http, lodash) {
      // put all variable and function declarations at the top for readability.
      var service = {
        saveQuestion: saveQuestion,
        solveQuestion: solveQuestion,
        updateQuestion: updateQuestion,
        fetchQuestions: fetchQuestions,
        deleteQuestion: deleteQuestion,
        clearQuestions: clearQuestions
      };
      return service;

      function saveQuestion(question){
        return $http({
          method: "POST",
          url: "/newquestion",
          headers: {
            "Content-type" : "application/json"
          },
          data: {
            "question": question.question,
            "answer": question.answer,
            "math": question.math
          }
        })
        .then(function(success){
          return success.data;
        }, function (err){
          throw err.data;
        });
      }

      function deleteQuestion(question){
        return $http({
          method: "DELETE",
          url: "/question",
          headers:{
            "Content-type": "application/json"
          },
          data:{
            question: question
          }
        })
        .then(function (success) {
          return success.data;
        }, function (error){
          throw error.data;
        });
      }

      function updateQuestion(question){
        return $http({
          method: "POST",
          url: "/question",
          headers:{
            "Content-type" : "application/json"
          },
          data:{
            question: question
          }
        })
        .then(function(success){
          return success.data;
        }, function (error) {
          throw error.data;
        });
      }

      function fetchQuestions(){
        return $http.get("/questions")
        .then(function(response){
          return response.data;
        }, function (err) {
          throw err.data;
        });
      }

      function clearQuestions(){
        return $http.get("/clearquestions")
        .then(function(response){
          return response;
        }, function (err) {
          throw err.data;
        });
      }

      function solveQuestion(question){
        var answer = lodash.round(eval(question), 7);
        return answer;
      }
    }


})();
