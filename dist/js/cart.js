
function Cart(){
	//判断cart是否有数据
	if(getCookie("cart")){
		this.cartData = JSON.parse(getCookie("cart"));
	}else{
		this.cartData = {};
	}
}
//直接点击加入购物车按钮的话，正常是+1，也可能一次加入的数量不是1
//在购物车页面的数量展示框里的那个值是一个最终的值，而不是累加的值
//tm 来表示是累加还是最终值 true
Cart.prototype.addData = function(id,num,tm){
	//判断是否有id物品,计数
	if(!this.cartData[id] || tm){
		this.cartData[id] = num;
	}else{
		this.cartData[id] = Number(this.cartData[id]) + num;
	}
	//转换，存储
	setCookie("cart",JSON.stringify(this.cartData),7);
}
//购物车展示数据
Cart.prototype.showData = function(domID){
	var str = "";
	var data = JSON.parse(localStorage.getItem("data"));
	for(var id in this.cartData){
		str += `<tr class="item"  data-id="${id}">
			<td align="center">
				<input class="checkbox jcki" type="checkbox">
			</td>
			<td class="p-numbered">${id}</td>
			<td class="p-img">
				<a href="#"class="in_b">
					<img src="${data[id].url}" width="50" height="50" class="vm" />	
				</a>				
			</td>
			<td class="p-name">
				<h2>
					<a href="detail.html" target="_blank" >${data[id].title}</a>
				</h2>
			</td>
			<td class="p-price">
				￥<span class="price">${data[id].price}</span>
			</td>
			<td class="p-quantity">
				<div class="p-form">
				<a href="#" class="minus">-</a>
				<input type="text" class="quantity-text" value="${this.cartData[id]}" >
				<a href="#" class="plus">+</a>
				</div>
			</td>
			<td class="p-total">
							￥<a class="p-tpr">${this.cartData[id]*data[id].price}</a>
						</td>
			<td class="p-remove">
				<a class="cart-remove">删除</a>
			</td>`;
	}
	this.oCartList = $id(domID);
	this.oCartList.innerHTML = str;
	this.aCheckBox = $class('jcki');
	this.aCheckAll = $class('checkAll');
	var aMinus = $class('minus');
	var aNums =$class('quantity-text');
	var aPlus = $class('plus');
	var aDelBtn = $class('cart-remove');
	var aPerPrice = $class('price');
	this.aTotalPrice = $class('p-tpr');
	  	/*for(let i = 0;i<$(".item").length;i++){
			//商品数量减
			$(".minus").click(function(){
				let id = $(this).parents(".item").attr("data-id");
				//判断临界值
				if($(".quantity-text").text()<=1){
					$(".quantity-text").text("1");
				}
				$(".quantity-text").text()--;
				var st = Number($(".quantity-text").text())*Number($(".price").text());
				$(".total_price").text(st);
				this.addData(id,-1,false);
			});
			//商品数量加
			$(".plus").click(function(){
				let id = $(this).parents(".item").attr("data-id");
				$(".quantity-text").text()++;
				var st = Number($(".quantity-text").text())*Number($(".price").text());
				$(".total_price").text(st);
				this.addData(id,1,false);
			});
			//
			$(".quantity-text").click(function(){
				let id = $(this).parents(".item").attr("data-id");
				var st = Number($(".quantity-text").text())*Number($(".price").text());
				$(".total_price").text(st);
				this.addData(id,1,false);
			});
			//删除
			$(".cart-remove").click(function(){
				$(this).parents(".item").remove();
				i--;
			});
			//全选
			$("#checkAll").click(function(){
				$(".item .jcki").prop("checked",$(this).prop("checked"));
			});
			
		}
	})*/
	
	for(let i = 0;i<aMinus.length;i++){
		aMinus[i].onclick = ()=>{
			//获取其父节点的属性节点data-id
			let id = aMinus[i].parentNode.parentNode.parentNode.getAttribute('data-id');
			//判断aNums[i].value临界值
			if(aNums[i].value <= 1){
				alert("最少购买一件商品");
				return;
			}
			aNums[i].value --;
			this.aTotalPrice[i].innerHTML = aNums[i].value*aPerPrice[i].innerHTML;
			this.addData(id,-1,false);
			this.getTotalPrice();
		}
		
		aPlus[i].onclick = ()=>{
			let id = aMinus[i].parentNode.parentNode.parentNode.getAttribute('data-id');
			aNums[i].value ++;
			this.aTotalPrice[i].innerHTML = aNums[i].value*aPerPrice[i].innerHTML;
			this.addData(id,1,false);
		}
		
		aNums[i].onclick = ()=>{
			let id = aMinus[i].parentNode.parentNode.parentNode.getAttribute('data-id');
			this.aTotalPrice[i].innerHTML = aNums[i].value*aPerPrice[i].innerHTML;
			this.addData(id,aNums[i].value,true);
		}
		//删除
		aDelBtn[i].onclick = ()=>{
			let id = aMinus[i].parentNode.parentNode.parentNode.getAttribute('data-id');
			this.removeCart(id,aDelBtn[i].parentNode.parentNode);
			i--;
		}
	}
}

Cart.prototype.removeCart = function(id,domObj){
	//删除数据
	delete this.cartData[id];
	//存cookie
	setCookie("cart",JSON.stringify(this.cartData),7);
	//删dom对象
	this.oCartList.removeChild(domObj);
}

Cart.prototype.getTotalPrice = function(){
	var sums = 0;
	for(let i = 0; i < this.aCheckBox.length; i++){
		//判断是否被选中
		if(this.aCheckBox[i].checked == true){
			//this.aTotalPrice[i].innerHTML为字符串，要转为数值类型
			sums += Number($(".p-tpr").eq(i).text()) ;
		}
	}
	$(".total_price").text(sums);
}


function $id(id){
	return document.getElementById(id);
}
function $class(oClass){
	return document.getElementsByClassName(oClass);
}

function setCookie(name, val, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + val + ";expires=" + oDate;
}

function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] == name) {
			return newArr[1];
		}
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}