/**
 * 渲染页面
 */
ngApp.directive("repeatCallback",function($http,$sce){
    return function(scope,element,attrs){
        $http({
            method : 'GET',
            url : 'formEcho.json'
        }).success(function(data){
            scope.lists = data;
            //获得数据后会自动渲染页面，需给浏览器0.5秒的渲染时间，再初始化iscroll，对用户也不会有影响。
            setTimeout(function(){
              console.log('scope.$last:'+scope.$last);
              new iScroll('wrapper', { scrollbarClass: 'myScrollbar' });
            },500)
        }).error(function(error){
            console.log(error)
        })
    }
});
