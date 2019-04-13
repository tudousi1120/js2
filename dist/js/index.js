$(function(){
	//导航nav
	//鼠标经过二级菜单显示
	//左侧菜单
	$(".left-nav").mouseover(function(){
		$(this).find(".sub-nav").css({"display":"block"});
		$(".sub-nav >li").mouseenter(function(){
			$(this).addClass("active-li").siblings().removeClass("active-li");
			//三级菜单
			$(this).children(".side-nav").css({"display":"block"}).end().siblings().children(".side-nav").css({"display":"none"});
		});
	})
	//鼠标离开
	$(".left-nav").mouseleave(function(){
		$(this).find(".sub-nav").css({"display":"none"});
	});

	//横向菜单
	$(".item").mouseover(function(){
		$(this).addClass("hover-i").siblings().css({"display":"block"}).end().parent().siblings().children(".item").removeClass("hover-i").siblings().css({"display":"none"});
	});
	$(".item").mouseleave(function(){
		$(this).removeClass("hover-i").siblings().css({"display":"none"});
	});
	
	//手机商城 二维码
	$(".s-item").mouseover(function(){
		$(this).children(".tel-shop").removeClass("hide");
	});
	$(".s-item").mouseleave(function(){
		$(this).children(".tel-shop").addClass("hide");
	});
	//监听滚动条，头部导航吸顶
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		var top = $(".banner").offset().top;
		//console.log(scroll, top);
		if(scroll >= top) {
			$(".main-nav").addClass("fixedd");
			$(".side-riht").css({"top":"36px"});
		}else{
			$(".main-nav").removeClass("fixedd");
			$(".side-riht").css({"top":"95px"})
		}
	});
	
	
	//banner轮播
	var timer = null; //声明一个全局定时器
	var index = 0;	
	
	$(".next").click(function(){ //下一张
		next();
	});
	$(".prev").click(function(){ //上一张
		prev();
	})
	function next(){
		index++;
		if(index > 3){
			 	$(".pic-list").animate({left:-(index)*1349},1000); 
			 index = 0;
			 $(".pic-list").animate({left:0},0); 
		}
		$(".pic-list").animate({left:-index*1349},1000);
		iconHover(index);
	}
	function prev(){
		index--;
		if(index < 0 ){
			index = 3;
			$(".pic-list").animate({left:-(index+1)*1349},0);
		}
		$(".pic-list").animate({left:-index*1349},1000);
		iconHover(index);
	}
	function auto(){ 
		//设置自动播放的定时器
		timer = setInterval(function(){ 
			next();
			iconHover(index);
		},2000) 
	}
	auto();
	
	$(".slide").mouseover(function(){
		//鼠标移入 定时器取消
		clearInterval(timer);
		$('.btn').css("opacity",0.5)
	})
	$(".slide").mouseleave(function(){ 
		//鼠标离开 定时器开启
		auto();
		$(".btn").css("opacity",0)
	})
	//鼠标碰触圆点图标实现图片左右轮播
	$(".b-btn").click(function(){ 
		var index = $(this).index();
		$(".pic-list").animate({left:-index*1349},2000);
		iconHover(index);
	})
	//实现被选图片对应圆点图标索引更新
	function iconHover(index){
		$(".b-btn").eq(index).addClass("active").siblings().removeClass("active");
	}
	
	//service-nav 部分
	//鼠标经过时显示隐藏的
	$(".iitem").mouseover(function(){
		$(this).find(".over-btn").addClass("hoverb").end().parent().siblings().find(".over-btn").removeClass("hoverb");
	})
	$(".iitem").mouseleave(function(){
		$(".over-btn").removeClass("hoverb");
	})
	//鼠标经过时ilist>a字体颜色改变
	$(".ilist>a").mouseover(function(){
		$(this).addClass("hoverr").siblings().removeClass("hoverr");
	})
	$(".ilist>a").mouseleave(function(){
		$(this).removeClass("hoverr");
	})
	
	
	//produ-ads部分轮播
	var timerr = null;
	var countt = 0;
	//添加动画前先stop()
	$(".alla .ii").eq(0).fadeIn(1000).siblings().fadeOut(1000);
	$(".sbtn>li").eq(0).addClass("sicol").siblings().removeClass("sicol");

	//自动
	timerr = setInterval(function(){
		countt++;
		if(countt==$(".alla .ii").length){
			countt = 0;
		}
		tomg();
	},2000);
	//nav li 添加鼠标点击事件
	$(".alla .ii").mousemove(function(){
		countt = $(this).index();
		tomg();
	})	
	//左右按钮
	$(".sdr1").click(function(){
		countt--;
		if(countt == 0){
			countt = $(".alla .ii").length;
		}
		tomg();
	})
	
	$(".sdr2").click(function(){
		countt++;
		if(countt == $(".alla .ii").length){
			countt = 0;
		}
		tomg();
	})
	//鼠标添加移入事件
	$(".alla").mouseover(function(){
		clearInterval(timerr);
	})
	//鼠标添加移出事件
	$(".alla").mouseout(function(){
		timerr = setInterval(function(){
		countt++;
		if(countt==$(".alla .ii").length){
			countt = 0;
		}
		tomg();
	},2000);
	});
	
	function tomg(){
		$(".alla .ii").eq(countt).fadeIn(1000).siblings().fadeOut(1000);
		$(".s.sbtn>li").eq(countt).addClass("sicol").siblings().removeClass("sicol");
	}
	
	
	
	//produ-list列表
	//produ-list>ul生成商品列表
	$.get("js/index.json",function(data){
		data = data.list;
		//console.log(data);
		
		var produ = document.getElementsByClassName("produ-list")[0];
		var produLi = document.getElementsByClassName("produ_li")[0];
		var str = "";
		var strr = "";
		//console.log(produLi.nodeType);
		for(let id in data){
			str += `
				<li class="produ-box">
						<div class="produ-box-content">
							<a href="detail.html?id=${id}" class="produ-img">
								<img src="${data[id].url}"/>
							</a>
							<div class="produ-ul">
							<ul class="produ-i">
							</ul>
							</div>
							<span class="produ-info info">${data[id].title}</span>
							<span class="produ-price-info info">￥
								<span class="produ-price">${data[id].price}</span>
							</span>
							<span class="produ-buy info">
								<p><a href="detail.html?id=${id}"
								class="produ-buy-now">立即购买</a><span  class="produ-now"></span></p>
							</span>
						</div>
					</li>`;
		}
		produLi.innerHTML = str ;
		for(let id in data){
			for(let j = 0;j<data[id].produi.length;j++){
				strr +=`
					<li><a href="#">
						<img src="${data[id].produi[j]}"/>
					</a></li>`;
			}
		}
		var produI = document.getElementsByClassName("produ-i")[0];
		produI.innerHTML = strr;
		
		//存本地localstorage
		data = JSON.stringify(data);
		localStorage.setItem("data",data);
		
		//鼠标经过时
		$(".produ-box").mouseover(function(){
			$(this).stop().animate({"top":"-5px"},200);
			$(this).find(".produ-ul").stop().animate({"height":"32px"},200).siblings(".produ-buy").stop().animate({"height":"60px"},200);
		});
		$(".produ-box").mouseleave(function(){
			$(this).stop().animate({"top":"0"},200);
			$(this).find(".produ-ul").stop().animate({"height":"0"},200).siblings(".produ-buy").stop().animate({"height":"0"},200);
		})
		//鼠标经过点击购买时样式变化
		$(".produ-buy-now").mouseover(function(){
			$(this).addClass("hovea");
		})		
		$(".produ-buy-now").mouseleave(function(){
			$(this).removeClass("hovea");
		})
	});
	
	
	
	
	
	
	
	
});
	
	
	
	