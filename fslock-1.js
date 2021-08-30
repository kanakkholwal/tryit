
$(document).ready(function() { (function(W,D){ W.asli_config = { url: '', page: 'p/blog-page.html', output: '#output', defaultkey: 'K K UPGRADER', fixednavbar: false, countdown: true, timedown: 10, lang: { urlempty: "URL can not empty", convertsuccess: "Convert URL success, copy url on box below", validtext: "HTTP, HTTPS, or WWW", gourltext: "try clicking the link, sir", nourl: "nggapain pak ??, the link is missing", errorconvert: "URL can not to convert", emptypass: "Password can not empty", wrongpass: "Password is incorrect", countdowntext: "Please Wait {{anascountdown}} Second" } }

    var xv = $('footer > .d-table > .d-table-row > .d-table-cell > .container > .row > .col-sm-7 > a#kkfs');

    if(xv.length){

      W.validurlit = function (ur) {

        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(ur);

      }

      W.sUp = function(el) {

        D.querySelector(el).parentNode.style.height = '0';

      }

      W._GET = function(name, url) {

        if (!url) url = location.href;

        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

        var regexS = "[\\?&]"+name+"=([^&#]*)";

        var regex = new RegExp( regexS );

        var results = regex.exec( url );

        return results == null ? null : results[1];

      }

      xv.attr('href', '//kkupgrader.blogspot.com').text('K K UPGRADER');

    } else {

      location.href = '//kkupgrader.blogspot.com';

    }

  }(window,document));

});
