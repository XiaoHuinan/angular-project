define(function(require,exports,module){
    var $ = require('js/jquery'),
        data = require('js/data'),
        css = require('css/test.css');
    $("#container").html(data.text).addClass('red')
})