//获取验证码批处理 [旧手机号,请求地址,点击的按钮,按钮各自的倒计时,php传来的最大倒计时数]
var codeAjax = function(_mp,_url,_loadBtn,_time,_t){
    if(_mp!='undefined'&&/^1[3458]\d{9}$/.test(_mp)){
        _loadBtn.attr('disabled','disabled').html('获取中..')
        $.ajax({
           type: "GET",
           url: _url,
           data: {'tel':_mp},
           success: function(msg){
                if(msg.success == '1'){
                    var _id = _loadBtn.attr('id');

                    _id = setInterval(
                        function(){
                            _loadBtn.addClass("load-disabled");
                            _loadBtn.html(_time+"秒后重发")
                            --_time;
                            if(_time==0){
                                clearTimeout(_id);
                                _loadBtn.removeClass("load-disabled").removeAttr('disabled').html("重新发送");
                                _time = _t;
                            }
                        }, 1000
                    )

                }else{
                  console.log(msg)
                    _loadBtn.removeAttr('disabled').html("发送失败");
                }
           }
        });
    }else{
        alerts("请输入正确的手机号码")
    }
}
var alerts = function(txt){
    $(".pop-layer").show().find('p').html(txt);
}
$("#pop-close-alerts").click(function(){
    $("#pop-layer-alerts").hide()
});
