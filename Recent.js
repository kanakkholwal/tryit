
  $(".recent-wid .widget-content").each(function()

	{

	var e=$(this).html(),t=$(this).prev("h2").text(),a=e.match(/[^[\]]+(?=])/g);

	$(this).html("<span>"+a[0]+"</span><span>"+a[1]+"</span><span>"+a[2]+"</span>");

	var r=$(this).text(),n=$(this).find("span").eq(0).text(),s=$(this).find("span").eq(1).text(),l=$(this).find("span").eq(2).text();

	s.match("recentbylabel")&amp;&amp;$.ajax(

		{

		url:"/feeds/posts/default/-/"+n+"?alt=json-in-script&amp;max-results=6",type:"get",dataType:"jsonp",success:function(e)

			{

			for(var a="",s="<ul>",i=0;

			i<e.feed.entry.length;

			i++)

				{

				for(var c=0;

				c<e.feed.entry[i].link.length;

				c++)if("alternate"==e.feed.entry[i].link[c].rel)

					{

					a=e.feed.entry[i].link[c].href;

					break

				}

				var h=e.feed.entry[i].title.$t,d=e.feed.entry[i].author[0].name.$t,p=e.feed.entry[i].media$thumbnail.url,o=e.feed.entry[i].published.$t.substring(0,10);

				s+="<li>"+('<a class="recent-thumb" href="'+a+'" style="background:url('+p+') no-repeat center center;

				background-size: cover"/>')+'<div class="recent-content"><h3 class="recent-title"><a href="'+a+'">'+h+'</a></h3><span class="recent-author">'+d+'</span><span class="recent-date">'+o+'</span></div><div class="clear"/></li>'

			}

			s+="</ul>",$(".recent-wid .widget-content").each(function()

				{

				$(this).text()==r&amp;&amp;($(this).html(s),$(this).parent().addClass("recentbylabel"),$(this).parent().addClass("recent-block"),$(this).prev("h2").html('<a href="/search/label/'+n+'">'+t+"</a>"),$(this).prev("h2").css("background",l),$(this).prev("h2").wrap('<div class="box-title"></div>'),$(this).prev(".box-title").css("border-color",l),$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+n+'" title="Show all posts">More <i class="fa fa-angle-right"></i></a>'),$(this).removeClass("widget-content").addClass("layout-content"),$(this).find(".recent-thumb").each(function()

					{

					$(this).attr("style",function(e,t)

						{

						return t.replace("/default.jpg","/mqdefault.jpg")

					}

					).attr("style",function(e,t)

						{

						return t.replace("s72-c","s240")

					}

					)

				}

				),$("p.trans").each(function()

					{

					var e=$(this).text(),t=$(this).attr("data-tran");

					$("#pages-wrapper *").replaceText(e,t)

				}

				))

			}

			)

		}

	}

	),s.match("recentbylabel2")&amp;&amp;$.ajax(

		{

		url:"/feeds/posts/default/-/"+n+"?alt=json-in-script&amp;max-results=6",type:"get",dataType:"jsonp",success:function(e)

			{

			for(var a="",s="<ul>",i=0;

			i<e.feed.entry.length;

			i++)

				{

				for(var c=0;

				c<e.feed.entry[i].link.length;

				c++)if("alternate"==e.feed.entry[i].link[c].rel)

					{

					a=e.feed.entry[i].link[c].href;

					break

				}

				var h=e.feed.entry[i].title.$t,d=e.feed.entry[i].author[0].name.$t,p=e.feed.entry[i].media$thumbnail.url,o=e.feed.entry[i].published.$t.substring(0,10);

				s+="<li>"+('<div class="card card-image"  style="background-image:url('+p+')">  <div class="text-white text-center rgba-stylish-strong py-5 px-4"><div class="py-5"><h2 class="h2 my-4 py-2 card-title"><a href="'+a+'">'+h+'</a></h2><span class="recent-author">'+d+'</span><span class="recent-date">'+o+'</span></div></div></div><hr class="my-2"/><div class="clear"/></li>'

			}

			s+="</ul>",$(".recent-wid .widget-content").each(function()

				{

				$(this).text()==r&amp;&amp;($(this).html(s),$(this).parent().addClass("recentbylabel2"),$(this).parent().addClass("recent-block2"),$(this).prev("h2").html('<a href="/search/label/'+n+'">'+t+"</a>"),$(this).prev("h2").css("background",l),$(this).prev("h2").wrap('<div class="box-title"></div>'),$(this).prev(".box-title").css("border-color",l),$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+n+'" title="Show all posts">More <i class="fa fa-angle-right"></i></a>'),$(this).removeClass("widget-content").addClass("layout-content"),$(this).find(".recent-thumb2").each(function()

					{

					$(this).attr("style",function(e,t)

						{

						return t.replace("/default.jpg","/mqdefault.jpg")

					}

					).attr("style",function(e,t)

						{

						return t.replace("s72-c","s320")

					}

					)

				}

				),$("p.trans").each(function()

					{

					var e=$(this).text(),t=$(this).attr("data-tran");

					$("#pages-wrapper *").replaceText(e,t)

				}

				))

			}

			)

		}

	}

	)

}

),$(window).bind("load",function()

	{

	$(".first-ld").remove(),$("p.trans").each(function()

		{

		var e=$(this).text(),t=$(this).attr("data-tran");

		$("#pages-wrapper *").replaceText(e,t)

	}

	)

}

);
