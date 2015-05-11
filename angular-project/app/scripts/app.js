/**
 * Created by new on 2015/5/6.
 */
var ngApp = angular.module('ngApp',['ui.router','ngAnimate']);
ngApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
      .state('/',{
          url : '/index',
          views : {
              '':{
                  templateUrl : 'views/login.html',
                  controller  : 'login'
              }
          }
      })
      .state('list',{
          url : '/list',
          views : {
              '' : {
                  templateUrl : 'views/list.html'
              }
          }
      })
      .state('detail',{
        url : '/detail{id}',
        views : {
          '' : {
            templateUrl : 'views/detail.html'
          }
        }
      })
      .state('error',{
        url : '/error',
        views : {
          '' : {
            templateUrl : 'views/error.html'
          }
        }
      })
})
//function($scope,$http){
//  $http({
//    method : 'GET',
//    url : 'formEcho.json'
//  }).success(function(data){
//    console.log(data)
//  }).error(function(error){
//    console.log(error)
//  })
//}
