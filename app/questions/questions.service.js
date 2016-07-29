(function(){

  angular
    .module("questions")
    .factory("questions.service", questionservice);

    function questionservice($http) {
      // put all variable and function declarations at the top for readability.
      var service = {
        saveQuestion: saveQuestion,
        solveQuestion: solveQuestion,
        updateQuestion: updateQuestion,
        fetchQuestions: fetchQuestions,
        deleteQuestion: deleteQuestion
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
            "answer": question.answer
          }
        })
        .then(function(success){
          return success;
        })
        .catch(function (error){
          console.log("couldn't save new question");
          return error;
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
            "_id": question._id
          }
        })
        .then(function (success) {
          return success;
        })
        .catch(function (err) {
          return err;
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
            "_id": question._id,
            "question": question.question,
            "answer": question.answer
          }
        })
        .then(function(success){
          return success;
        })
        .catch(function(fail){
          return fail;
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
    }


})();
