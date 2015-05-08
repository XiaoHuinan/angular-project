var iTemplate = (function() {
    var a = function() {
    };
    a.prototype = {makeList: function(e, j, i) {
            var g = [], h = [], c = /{(.+?)}/g, d = {}, f = 0;
            for (var b in j) {
                if (typeof i === "function") {
                    d = i.call(this, b, j[b], f++) || {}
                }
                g.push(e.replace(c, function(k, l) {
                    return (l in d) ? d[l] : (undefined === j[b][l] ? j[b] : j[b][l])
                }))
            }
            return g.join("")
        }};
    return new a()
})();
window.ajax2 = (function() {
    var a = function(b, c) {
        return new a.fn.init(b, c)
    };
    a.fn = a.prototype = {init: function(b, d) {
            var c = this;
            this.xhr = new XMLHttpRequest();
            this.url = b;
            this.type = {get: "GET",post: "POST"}[d.type && d.type.toLowerCase()] || "GET";
            this.async = d.async || false;
            this.responseType = d.responseType || "text";
            this.data = d.data;
            this.formData = a.serializeFormData(this.data);
            this.callback = d.callback;
            this.timeout = d.timeout || 10000;
            this.setRequestHeader = d.headers || {};
            this.work();
            return this
        },work: function() {
            var b = this;
            b.xhr.open(this.type, this.url, this.async);
            b.xhr.setRequestHeader("common", JSON.stringify({platform: "HTML5",author: "Eric_wu",time: +new Date()}));
            b.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            b.xhr.upload.onprogress = function(d) {
                if (d.lengthComputable) {
                    var c = (d.loaded / d.total) * 100;
                    if (b.onprogress) {
                        b.onprogress.call(d, c)
                    }
                }
            };
            b.xhr.onload = function(c) {
                if (200 == this.status) {
                    b.callback.call(this, JSON.parse(this.responseText));
                    b.timeout && clearTimeout(b.xhr.timer)
                }
            };
            if (b.timeout) {
                b.xhr.timer = setTimeout(function() {
                    b.xhr.abort();
                    b.callback.call(b, {result: 0,message: "请求超时"});
                    clearTimeout(b.xhr.timer)
                }, b.timeout)
            }
            b.xhr.send(this.formData);
            return b
        }};
    a.fn.init.prototype = a.fn;
    a.serializeFormData = function(c) {
        var d = new FormData();
        for (var b in c) {
            d.append(b, c[b])
        }
        return d
    };
    return a
})(this);

var my = (function(){
    _my = function(){

    }
    _my.prototype = {
        changeImg: function(thi, evt, _req){
            var that = this;
            if(thi.files.length<1){
                return that;
            }
            if(thi.files[0].size>=1024*1024*1 && !confirm("(文件过大，建议编辑后上传。)\n是否继续?")){
                thi.setAttribute("data-upload-state", "0%");
                return that;
            }
            setTimeout(function(){
                that.uploadImg(thi, _req);
            }, 500);
            return that;
        },
        uploadImg: function(thi, _req){
            var that = this;

            //ajax将req提交
            var req = {
                id:6,
                username:"webAdd",
                header_img_id : thi.files[0]||{},
                //上传到的目录
                form_action:"/Webnewmemberscore/uploadhead",
                base_url: "http://115.28.20.245:3000/headers/"
            }
            //通过循环覆盖req参数，
            //实际传入参数以用户changeImg传入为准 而不是main.js51行req里的参数
            for(var k in _req){
                req[k] = _req[k];
            }
            var xhr = window.ajax2(req.form_action, {
                type:"POST",
                async: true,
                data: req,
                timeout:10000*6,
                callback: function(res){
                    //返回一个res
                    //从中获取 res.result 与 res.data.header_img_id
                    if(0 == res.result){
                        alert(res.message);
                    }else{
                        //返回0以外的res，拼出来图片的src 预设好的地址头+ php返回的图片地址 此为demo
                        thi.parentNode.querySelectorAll("img")[0].src = 'images/Tulips.jpg';
                        //thi.parentNode.querySelectorAll("img")[0].src = req.base_url + res.data.header_img_id;
                    }
                    setTimeout(function(){
                        //显示百分比的效果移除
                        thi.parentNode.removeAttribute("data-upload-state");
                    }, 500);
                }
            });
            xhr.onprogress = function(p){
                thi.parentNode.setAttribute("data-upload-state", Math.floor(p)+"%");
            };
            return that;
        }
    }

    return new _my();
})();