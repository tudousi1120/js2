$(function(){
	//修改注册方式
	$(".reg-inner>a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		console.log(index);
		//console.log($(".form").eq(index));
		$(".form").eq(index).css({"display":"block"}).siblings(".form").css({"display":"none"});
		$(".codenum").html(getRand());
		
		//要先判断是手机注册还是邮箱注册
		//手机号正则验证
		var regUesr= /^1(3|4|5|7|8|9)\d{9}$/;
		//邮箱正则验证
		var regEmail =  /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
		//只能使用数字字母下划线，且不能以数字开头，长度在8-16之间
		var regPsw = /^[a-zA-Z_]\w{7,15}$/;
		if(index == 1){
			$(".subm").click(function(e){
				e.preventDefault();
				var user = $(".user").val();
				var psw = $(".psw").val();
				console.log(index);
				if (!regEmail.test(user) || !regPsw.test(psw)) {
		            alert("邮箱地址或密码格式错误");
		       	} else {
		     		$(".regg").css({"display":"block"});
		     		$(".reg").css({"display":"none"});
		         	$(location).attr('href', 'index.html');
		       		//存本地
		       		localStorage.setItem(user,psw); 
		        }
			});
		}else{
			$(".subm").click(function(e){
				e.preventDefault();
				var user = $(".user").val();
				var psw = $(".psw").val();
				console.log(index);
				if (!regUesr.test(user) || !regPsw.test(psw)) {
		            alert("手机号或密码格式错误");
		       	} else {
		     		$(".regg").css({"display":"block"}).siblings(".reg").css({"display":"none"});
		         	$(location).attr('href', 'index.html');
		       		//存本地
		       		localStorage.setItem(user,psw); 
		        }
			});
		}
		
		
	})
	
	
		
	//随机验证码
	//点击更换
	$(".codenum").click(function(){
		$(this).html(getRand());
	});
	//打开页面生成
	var str = getRand()
	$(".codenum").html(str);
	function getRand(){
		var str = '';
		while(str.length<4){
			var num = Math.floor(Math.random()*74+48);
			if((num>=48&&num<=57)||(num>=65&&num<=90)||(num>=97&&num<=122)){
				var ch =  String.fromCharCode(num);
				str += ch;
			}
		}
		return str;
	}
	
})
