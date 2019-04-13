$(function(){
	//登录
	$(".subm").click(function(){
		var user = $("#user").val();
		var psw = $("#psw").val()
		var result = localStorage.getItem(user);
		//验证密码是否正确
		if(psw == result){
			$(location).attr('href','index.html');
		}else{
			//$(".login-tip").css({"display":"block"});
			alert("用户名或密码错误");
		}
	})
	
	
})
