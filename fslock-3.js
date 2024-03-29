
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
                          report[0].innerHTML = '<div class="text-center"><a target="_blank" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
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
                              report[0].innerHTML = '<div class="alert bg-success m-1 p-3 text-white text-center" role="alert" ><i class="fas fa-check-circle me-3"></i><a class="card-link text-white" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
                            }
                          }, 1000);
						}
                      } else {
                        report[0].innerHTML = '<div class="alert text-center text-white bg-danger m-1 p-3" role="alert" ><i class="fas fa-times-circle me-3"></i>'+config.lang.wrongpass+'</div>';
                      }
                    } else {
                      report[0].innerHTML = '<div class="alert text-center text-white bg-warning m-1 p-3" role="alert" ><i class="fas fa-times-circle me-3"></i>'+config.lang.emptypass+'</div>';
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
                      	$(config.output)[0].innerHTML = '<div class="text-center bg-info text-center p-3"><a class="card-link" href="'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'">'+config.lang.gourltext+'</a></div>';
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
                      $(config.output)[0].innerHTML = '<form id="locked"><div class="input-group flex-nowrap"><span class="input-group-text" id="addon-wrapping2"><i class="fas fa-lock fa-fw"></i></span><input aria-describedby="button-addon2" class="form-control" name="pass" type="password" id="passin" onclick="sUp(\'#report\')" onkeypress="sUp(\'#report\')" aria-label="Password" /><button class="btn btn-success" id="button-addon2" type="submit">Unlock</button></div></form><section class="trans" style="overflow: hidden;height: 0"><div id="report"></div></section>';
                    }
                  } else {
                    if($(config.output).length){
                      $(config.output)[0].innerHTML = '<div class="text-center">'+config.lang.nourl+'</div>';
                    } else {
                      console.log('Not found output element, are you sure you this is not safelink page ??');
                    }
                  }
                });
