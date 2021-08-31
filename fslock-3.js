
"use strict";

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

                $(document).ready(function(){
                  $(document).on('submit', '#locked', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                    parent = $this.parent(),
                    report = parent.find('#report'),
                    passin = $('#passin');

					var data;
                    try {
          			  data = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(_GET('u')), passin[0].value).toString(CryptoJS.enc.Utf8));
      				} catch (e) {
                      data = false;
                  	}

                    if (passin[0].value.length) {
                      if (typeof(data) === "object") {
						if(!data.countdown){
                          report[0].innerHTML = '<div class="text-center"><a href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
                          $this.find('button, input').attr('disabled', 'disabled');
                          $this.slideUp('slow');
						} else {
                          $this.find('button, input').attr('disabled', 'disabled');
                          $this.slideUp('slow');
                          var timeleft = config.timedown;
						  var KKFS = setInterval(function(){
                            var FsDuration = config.lang.countdowntext.replace('\x7b\x7b\x6b\x6b\x66\x73\x63\x6f\x75\x6e\x74\x64\x6f\x77\x6e\x7d\x7d', timeleft);
                            report[0].innerHTML = '<div class="border bg-info p-3 text-center text-white">' + FsDuration + '</div>';
							setTimeout(function(){
                        	  report[0].parentNode.style.height = report[0].offsetHeight+'px';
                      	    }, 0);
                            timeleft -= 1;
                            if(timeleft <= 0){
                              clearInterval(KKFS);
                              report[0].innerHTML = '<div class="alert p-3 text-center" role="alert" data-mdb-color="success"><i class="fas fa-check-circle me-3"></i><a class="card-link" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
                            }
                          }, 1000);
						}
                      } else {
                        report[0].innerHTML = '<div class="alert text-center p-3" role="alert" data-mdb-color="danger"><i class="fas fa-times-circle me-3"></i>'+config.lang.wrongpass+'</div>';
                      }
                    } else {
                      report[0].innerHTML = '<div class="alert text-center p-3" role="alert" data-mdb-color="danger"><i class="fas fa-times-circle me-3"></i>'+config.lang.emptypass+'</div>';
                    }

                    setTimeout(function(){
                      report[0].parentNode.style.height = report[0].offsetHeight+'px';
                    }, 0);
                  });


                  if (_GET('u') && $(config.output).length) {

					var data;
                    try {
          			  data = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(_GET('u')), config.defaultkey).toString(CryptoJS.enc.Utf8));
      				} catch (e) {
                      data = false;
                  	}

                    if (typeof(data) === "object") {
                      if(!data.countdown){
                      	$(config.output)[0].innerHTML = '<div class="text-center bg-success text-center p-3"><a class="text-center" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
                      } else {
                        var timeleft = config.timedown;
                        var KKFS = setInterval(function(){
                          var FsDuration = config.lang.countdowntext.replace('\x7b\x7b\x6b\x6b\x66\x73\x63\x6f\x75\x6e\x74\x64\x6f\x77\x6e\x7d\x7d', timeleft);
                          $(config.output)[0].innerHTML = '<div class="border p-3 text-center">' + FsDuration + '</div>';
                          timeleft -= 1;
                          if(timeleft <= 0){
                            clearInterval(KKFS);
                            $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
                          }
                        }, 1000);
                      }
                    } else {
                      $(config.output)[0].innerHTML = '<form class="form-group" id="locked"><div class="input-group flex-nowrap"><span class="input-group-text" id="go2form"><i class="fas fa-lock fa-fw"></i></span></div><input   aria-describedby="go2form"  class="form-control" name="pass" type="password" id="passin" onclick="sUp(\'#report\')" onkeypress="sUp(\'#report\')" aria-label="Password" /><div class="input-group-append"><button class="btn btn-success" type="submit">Unlock</button></div></div></form><section class="trans" style="overflow: hidden;height: 0"><div id="report"></div></section>';
                    }
                  } else {
                    if($(config.output).length){
                      $(config.output)[0].innerHTML = '<div class="text-center">'+config.lang.nourl+'</div>';
                    } else {
                      console.log('Not found output element, are you sure you this is not safelink page ??');
                    }
                  }
                });
