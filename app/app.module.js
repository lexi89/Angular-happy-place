(function(){

  angular.module("app", [
    'ngRoute'
  ])
  .controller("mainCtrl", function ($scope) {
    $scope.sections = ["banner"];
    $scope.profile = {
      banner: {
        subhead: "Subhead",
        title: "Title",
        intro: "intro"
      },
      statement: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      contact: {
        phone: "123123123",
        email: "tara@gmail.com",
        website: "yanovski.me",
        address: {
          street: "123 fake street",
          city: "London",
          state: "Kansas",
          zip: "12345",
          country: "Great Britain"
        }
      },
      work : [{
        name: "company 1",
        phone : "000-000-000",
        website: "company1.com",
        details: "details here",
        address: {
          street: "123 fake street",
          city: "London",
          state: "Kansas",
          zip: "12345",
          country: "Great Britain"
        }
      },
      {
        name: "company 2",
        phone : "000-000-000",
        website: "company1.com",
        details: "details here",
        address: {
          street: "123 fake street",
          city: "London",
          state: "Kansas",
          zip: "12345",
          country: "Great Britain"
        }
      }],
      qualifications: {
        qualifications: ["q1","q2"],
        regulator: "blabla",
        registrationNumber: "1234123"
      },
      experience: "something about my experience",
      skills : ["skill1","skill2"],
      social: {
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        gplus: "",
        instagram: "",
        pinterest: ""
      }
    };
    $scope.sidebar = false;
    $scope.editMode = false;

    $scope.toggleEditMode = function(){
      $scope.editMode = !$scope.editMode;
    };
  });

})();
