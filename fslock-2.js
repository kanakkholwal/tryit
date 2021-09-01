
  "use strict";
                $(document).ready(function() {

                  config.countdown ? $('#countDown').prop('checked', true) : $('#countDown').prop('checked', false) ;

                  $('#passbtn').on('click', function(e) {
                    var $this = $(this);
                      if($this.hasClass('btn-dark')){
                        $this.removeClass('btn-dark').addClass('btn-primary');
                        $('#passinput').removeAttr('disabled');
                      } else {
                        $this.removeClass('btn-success').addClass('btn-dark');
                        $('#passinput').attr('disabled', 'disabled')[0].value = '';
                      }
                    e.preventDefault();
                  });

                  $('#safelink').on('submit', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                    passinput = $('#passinput')[0],
                    keyit = passinput.value.length ? passinput.value : config.defaultkey,
                    blog = config.url.length ? config.url : window.location.protocol + "//" + window.location.hostname,
                    url = $this.find('#urlinput')[0],
                    randPost = $('#randPost')[0],
                    result = $('#result')[0],
                    data = {};
                    data.url = url.value,
                    data.countdown = $('#countDown')[0].checked;

                    if (url.value.length) {
                      if (randPost.checked) {
                        if (validurlit(url.value)) {
                          $.ajax({
                            url: '/feeds/posts/summary?alt=json&max-results=99',
                            type: 'GET',
                            dataType: 'json',
                            cache: true,
                            beforeSend: function() {
                              result.innerHTML = '<div class="text-center"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>' ;
                            },
                            success: function(a){
                              var post = a.feed.entry,
                                  randNum = Math.floor(Math.random() * post.length),
                                  linknya = "";
                              for(var i = 0; i < post[randNum].link.length; i++){
                                if(post[randNum].link[i].rel == 'alternate') {
                                    linknya = post[randNum].link[i].href;
                                  break;
                                }
                              }
                              result.innerHTML = '<div class="alert alert-success text-center">'+config.lang.convertsuccess+'</div><div class="input-group  flex-nowrap mb-3"><button class="input-group-text"  onclick="this.select("#copy1");document.execCommand("copy");alert("Link Copied To Clipboard!");"><i class="fas fa-copy fa-fw"></i></button><input type="text"  id ="copy1" class="form-control" onfocus="this.select();" onmouseup="return false"  value="'+linknya+'?u='+encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), keyit))+'" aria-describedby="final-result"/></div>';
                              setTimeout(function(){
                                result.parentNode.style.height = result.offsetHeight+'px';
                              }, 0);
                            }
                          });
                          // result.innerHTML = '<div class="text-center"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div></div>' ;
                        } else {
                          result.innerHTML = '<div class="alert alert-warning text-center">'+config.lang.validtext+'</div>' ;
                        }
                      } else {
                        result.innerHTML = validurlit(url.value) ? '<div class="alert alert-success text-center">'+config.lang.convertsuccess+'</div><div class="input-group flex-nowrap"><span class="input-group-text"   onclick="this.select("#copy2");document.execCommand("copy");alert("Link Copied To Clipboard!");"><i class="fas fa-copy fa-fw"></i></span><input type="text" id="copy2" class="form-control" onfocus="this.select();" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="'+blog+'/'+config.page+'?u='+encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), keyit))+'" aria-describedby="final"/></div>' : '<div class="alert alert-warning text-center">'+config.lang.validtext+'</div>' ;
                      }
                    } else {
                      result.innerHTML = '<div class="alert alert-danger text-center">'+config.lang.urlempty+'</div>';
                    }


                    setTimeout(function(){
                      result.parentNode.style.height = result.offsetHeight+'px';
                    }, 0);
                  });

                });
