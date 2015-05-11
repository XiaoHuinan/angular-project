/**
 * 登陆验证
 */
ngApp.controller('login',function($scope,$http){
  var vm = $scope.vm = {
    user: {}
  };
  //表单提交
  $scope.formSubmit = function() {
    $(".pop-layer").hide()
    var $layer = $("#layer");
    //验证姓名
    if(!vm.user.newName){
      $layer.html("请输入姓名").show()
      return false;
    }
    //验证手机号
    if(!/^1[3458]\d{9}$/.test(vm.user.newTel)){
      $layer.html("请输入正确的手机号").show()
      return false;
    }
    //验证码
    if(!vm.user.newCode){
      $layer.html("请输入正确的验证码").show()
      return false;
    }
    //序列化表单
    var param = $("#form").serialize();

    $http({
      method: "GET",
      url : "json/listEach.json",
      dataType : "json"
    }).success(function(result){
      window.location.href= "/#/list"
    }).error(function(error){
      console.log(error)
    })
    return false;
  }
})
