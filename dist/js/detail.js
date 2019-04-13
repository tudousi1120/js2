$(function(){
	//获取数据
	var data = JSON.parse(localStorage.getItem("data"));
	//console.log(data);
	var id = location.search.split("=")[1];
	var bigView = getClass("bigView");
	var imgList = getClass("imgList");
	var bigImg = getClass("bigImg");
	var proHd = getClass("proHd");
	var salePrice = getClass("salePrice");
	//放大区域
	bigView.innerHTML =`<img src="${data[id].url}"/>`;
	//图片列表区域
	var str = '';
	for(let i = 0;i<data[id].produi.length;i++){
		str += `<li class="i"><img src="${data[id].produi[i]}" class="loading"/></li>`;
	}
	imgList.innerHTML = str;
	//给第一个li添加id
	$(".imgList>li").eq(0).attr({id:"onlickImg"});
	
	//bigImg区域
	bigImg.innerHTML = `<img src="${data[id].url}" id="midimg"/>`;
	
	//pro-hd标题区域
	proHd.innerHTML = `<h1><span class="pro-t">${data[id].title} </span></h1>`;
	//单价区域
	salePrice.innerHTML = `<i class="ss">￥</i><i class="s-price">${data[id].price}</i>`;
	//给加data-id
	$(".dtl-cart").attr("data-id",id)
	//获取节点
	function getClass(a){
		return document.getElementsByClassName(a)[0];
	}
	
	//功能部分
	//放大效果
	//鼠标经过显示
	$(".sml").mouseover(function(){
		$(".zoom").css("display","block");
		$(".bigView").css("display","block");
	});
	//隐藏
	$(".sml").mouseout(function(){
		$(".zoom").css("display","none");
		$(".bigView").css("display","none");
	});
	//鼠标拖动 放大
	$(".sml").mousemove(function(e){
		var evt = e || event; 
		var x = evt.pageX - $(this).offset().left;
		var y = evt.pageY - $(this).offset().top - $(".zoom").outerHeight()/2;
		//console.log(x,y);
		//限制zoom移动的范围
		var maxt = $(this).outerWidth() - $(".zoom").outerWidth();
		var maxl = $(this).outerHeight() - $(".zoom").outerHeight();
		x = x<=0 ? 0 :x>=maxl ? maxl : x;
		y = y<=0 ? 0 :y>=maxt ? maxt : y;
		
		$(".zoom").css({"left":x,"top":y});
		$(".bigView").children("img").css({"left":-x,"top":-y});
	});
	//更换图片
	$(".i").click(function(){
		var index = $(this).index();
		$(this).attr({"id":"onlickImg"}).siblings().removeAttr("id");
		bigImg.innerHTML = `<img src="${data[id].produi[index]}" id="midimg"/>`;
		bigView.innerHTML =`<img src=${data[id].produi[index]}"/>`;
	});
	
	//购物车
	for(let i = 0;i<$(".buttonbox input").length;i++){
		
	}
	$(".dtl-cart").click(function(){
		//var dataid = $(this).attr("data-id");
		console.log(id);
		var cart = new Cart();
		cart.addData(id,Number($(".pro-num").text()),false);
		$(location).attr("href","cart.html");
	})
	$("#tj_buy").click(function(){
		//var dataid = $(this).attr("data-id");
		console.log(id);
		var cart = new Cart();
		cart.addData(id,Number($(".pro-num").text()),false);
		$(location).attr("href","cart.html");
	})
	//修改商品数量
	$(".amount-box").click(function(){
		$(".pro-n").css({"display":"block"});
		for(let i = 0;i<$(".amount-box li").length;i++){
			$(".amount-box li").eq(i).click(function(){
				$(".pro-num").text($(this).text()) ;
				$(".pro-n").css({"display":"none"});
			})
		}
	})
	$(".amount-box").mouseleave(function(){
		$(".pro-n").css({"display":"none"});
	})
	
	
})
