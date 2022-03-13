$(document).ready(function(){
	function isValidEmail(emailID) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(emailID);
	}
	function validEmail(){
		var $eml = $('#Email');
		var email = $eml.val();
		var etxtID = $eml.data('err');
		if($('#'+etxtID).text()!= '' || $('#'+etxtID).text()== 'Please enter valid email' || $('#'+etxtID).text()== 'Email exists. Please check.')
		$('#'+etxtID).text('');
		if(email != ''){
			if (!isValidEmail(email)){
				$('#'+etxtID).text('Please enter valid email');
				return false;
			}
            //else {
                //return false;
				// $.ajax({
				// 	type : 'POST',
				// 	async: false,
				// 	url: 'userExists',
				// 	dataType: "json",
				// 	contentType: 'application/json; charset=utf-8',
				// 	data : { 'emailID' : email},
				// 	success: function(data) {
				// 		$('#'+etxtID).text('Email exists. Please check.');
				// 		return false;
				// 	},
				// 	error: function() {
				// 		alert("Error occured!!");
				// 		return false;
				// 	}
				// });
			//}
		} else if (email == ""){
			$('#'+etxtID).text('Please enter email');
			return false;
		}
		return true;
	}
	function validPassword()
	{
		var pwd = $('#Password').val();
		var dupPwd = $('#DupPassword').val();
		if(pwd != '' && dupPwd != '' && pwd == dupPwd)
		return true;
		else
		return false;
	}
	$('#Password, #DupPassword').on('keydown focus focusout keyup keypress', function(){
		$('#err_DupPassword').text('');
		var validPWD = validPassword();
		if(!validPWD)
		$('#err_DupPassword').text('Please type exact password as above');
	});
	$('#btnRegister').on('click', function(e){
		e.preventDefault();
        var bSubmit = true;
		$('.req').each(function(index){
			var $this = $(this);
			var errID = $this.data('err');
			$('#'+errID).text('');
			if($this.val() == '')
			{
				$('#'+errID).text( $this.attr('placeholder') + ' is required');
                bSubmit = false;
			}
		});
		var validEml = validEmail();
		var validPWD = validPassword();
		if(!validPWD)
        {
            bSubmit = false;
            $('#err_DupPassword').text('Please type exact password as above');
        }
        if(!validEml) bSubmit = false;
		if(bSubmit)
        $('#formRegister').submit();
	});


	$('#btnForgot').on('click', function(e){
		e.preventDefault();
		var email = $('#txtEmail').val();
		$('#errTxt').text('');
		if(email != ''){
			if (!isValidEmail(email)){
				$('#errTxt').text('Please enter valid email');
			}else {
				$.ajax({
					type : 'POST',
					async: false,
					url: 'sendPassword',
					dataType: "json",
					contentType: 'application/json; charset=utf-8',
					data : { 'emailID' : email},
					success: function(data) {
						$('#errTxt').text('Email has been sent. Please check inbox');
					},
					error: function() {
						alert("Error occured!!");
					}
				});
			}
		} else if (email == ""){
			$('#errTxt').text('Please enter email');
		}
	});
});