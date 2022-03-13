$(document).ready(function(){
	function isValidEmail(emailID) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(emailID);
	}
	$('#btnForgot').on('click', function(e){
		e.preventDefault();
		var email = $('#txtEmail').val();
		$('#errTxt').text('');
		if(email != ''){
			if (!isValidEmail(email)){
				$('#errTxt').text('Please enter valid email');
			}else {
				$('#frm_forgot').submit();
				// $.ajax({
				// 	type : 'POST',
				// 	async: false,
				// 	url: 'sendPassword',
				// 	dataType: "json",
				// 	contentType: 'application/json; charset=utf-8',
				// 	data : { 'emailID' : email},
				// 	success: function(data) {
				// 		$('#errTxt').text('Email has been sent. Please check inbox');
				// 	},
				// 	error: function() {
				// 		alert("Error occured!!");
				// 	}
				// });
			}
		} else if (email == ""){
			$('#errTxt').text('Please enter email');
		}
	});
});