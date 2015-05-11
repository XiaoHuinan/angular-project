/**
 * 渲染页面
 */
ngApp.directive("repeatCallback",function($http,$sce){
    return function(scope,element,attrs){
        $http({
            method : 'GET',
            url : 'json/listEach.json'
        }).success(function(data){
            scope.lists = data;
            //由于数据中存在标签字符，需要手动循环，用$sce.trustAsHtml声明这是安全数据，可执行
            angular.forEach(data,function(value,key){
                scope.lists[key].title = $sce.trustAsHtml(value.title);
            });
            //获得数据后会自动渲染页面，需给浏览器0.2秒的渲染时间，再初始化iscroll，对用户也不会有影响
            setTimeout(function(){
              new iScroll('wrapper', { scrollbarClass: 'myScrollbar' });
            },200)
        }).error(function(error){
            console.log(error)
        })
    }
});
