/**
 * 渲染页面
 */
ngApp.directive("detailText",function($http,$sce){
    return function(scope,element,attrs){
        //根据请求的url判断请求json数据
        setTimeout(function(){
            var urlNum = window.location.href.split('#/detail')[1];
            $http({
              method : 'GET',
              url : 'json/detailEach'+urlNum+'.json'
            }).success(function(data){
              scope.lists = data;
              scope.lists.title = $sce.trustAsHtml(scope.lists[0].title);
              scope.lists.detail = $sce.trustAsHtml(scope.lists[0].detail);
              //获得数据后会自动渲染页面，需给浏览器0.2秒的渲染时间，再初始化iscroll，对用户也不会有影响
            }).error(function(error){
              console.log(error)
            })
        },100)
    }
});
