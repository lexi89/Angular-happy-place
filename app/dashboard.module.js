// Declare app level module, which depends on views and components.
angular.module("app", [
  'ngRoute',
  'ngAnimate',
  'questions',
  'auth',
  'flash'
])

.run(["$rootScope", "$location", "$window", function($rootScope, $location, $window){

  $rootScope.user = {};

  // $rootScope.$on("$routeChangeStart", function(event, next, current){
  // });

  // FB init

  $window.fbAsyncInit = function(){
    FB.init({
      appId: "1776078209270707",
      status: true,
      cookie: true,
      xfbml: true,
      version: "v2.5"

    });

    // sAuth.watchAuthenticationStatusChange(); watch for changes to authentication.
  };

  $window.fbAsyncInit = function() {
    FB.init({
      appId      : '1776078209270707',
      xfbml      : true,
      version    : 'v2.7'
    });

    FB.getLoginStatus(function(response){
      console.log(response);
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


}]);
