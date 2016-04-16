function init(){
	var bgr = document.getElementById('transparent_bgr');
		bgr.addEventListener('click', function(){
				unshowForm();
		});

	var cancelForm = document.getElementById('form_login');
	var cancelForm2 = document.getElementById('form_registration');
	
	if(cancelForm){
		cancelForm.addEventListener('click', function(e){
			e.stopPropagation();
		})
	}
	if(cancelForm2){
		cancelForm2.addEventListener('click', function(e){
			e.stopPropagation();
		})
	}
	
}


function unshowForm(){
	document.getElementById('transparent_bgr').style.display = 'none';
		
}


// TODO
/**
 * pass category menu back to normal layout from responsive layout 
 */
function showMenuCat(){
	var display = document.getElementById('left_sidebar');
	
	if(display.style.display === 'none' || display.style.display === ''){
		display.style.display = 'block';		
	} else {
		display.style.display = 'none';		
	}
	
}

function showForm(){
	var container = document.getElementById('transparent_bgr');
	container.style.display = 'block';
}

function toggleForm(t){
		if(t == 'login') {
			document.getElementById('form_login').style.display = 'block';
			document.getElementById('form_registration').style.display = 'none';	
		}
		if(t == 'registration'){
			document.getElementById('form_login').style.display = 'none';
			document.getElementById('form_registration').style.display = 'block';
		}		
}

//TODO: edit form style for responsive layout
/**
 * registration 
 * */
 
function registration(){
	return checkRegister();
}

function checkRegister() {
	var name = document.forms['form_registration']['username_reg'];
	var email = document.forms['form_registration']['email'];
	var pass = document.forms['form_registration']['password_reg'];
	var pass2 = document.forms['form_registration']['password_2'];
	
	var email_pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	// >1 [abc], > 1 [ABC], > 1[0-9]
	var pass_pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,50}/;
	
	if(name.value === ''){
		alert('please provide your name');
		name.focus();
		return false;
	} else if(email.value === '' || !email_pattern.test(email.value)){
		alert('please provide your valid email');
		email.focus();
	} else if(pass.value === '' || !pass_pattern.test(pass.value)){
		alert('please provide a valid password');
		pass.focus();
	} else if(pass2.value === '' || pass2.value !== pass.value){
		alert('Your password is not the same');
		pass2.focus();
	}
	else {
		//alert('success');
		return true;
	}
	return false;
}

function getAjax(func){
	var ajax;
	if(window.XMLHttpRequest){
		// IE7+, Firefox, Chrome, Opera, Safari
		ajax = new XMLHttpRequest();
	} else { //IE6, IE5 
		ajax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	ajax.onreadystatechange = func;
	return ajax;
}

function callAjax(ajax, open, header, send){
	ajax.open(open[0], open[1], open[2]);
	ajax.setRequestHeader(header[0], header[1]);
	ajax.send(send);	
}

function checkUsername(e){
	var name = e.value;
	var ajax = getAjax(function() {
		if(ajax.readyState == 4 && ajax.status == 200){
			var response = ajax.responseText;	
					
			if(response != "-1"){
				alert('username unavailable');
				e.value = '';
				e.focus();
			}
		}
	});
	
	var user = {
		username: name	
	};
	//alert('user='+JSON.stringify(user));
	callAjax(ajax, ['POST', 'user/success.php', true], ['Content-type', 'application/x-www-form-urlencoded'], 'user='+JSON.stringify(user));
}

//TODO: edit form style for responsive layout
/**
 * login
 **/
function login(){
	//alert('login');
	return checkUser();
	
	function checkUser(){
		var user = document.forms['form_login']['username'].value;
		var password = document.forms['form_login']['password'].value;
		
		//alert(user);
		if((user === '' || password === '') || (user !== 'lina' || password !=='password')){
			alert('please provide your correct login data');
			return false;
		} else {
			//alert('success');
			storageData(user, password);
			window.location = 'user/index.html';
		}
		
		return false;
	};
	
}

function storageData(username, password){
	if(typeof(Storage) !== 'undefined'){
		localStorage.setItem('username', username);
		localStorage.setItem('password', password);
	} else {
		alert('no local storage supported');
	}
}

/*
- check authorization for authorized area (user folder)
 */
function checkLogin(){
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	
	if(!username && !password){
		window.location = '../index.html';
		alert('you have to login in order to access this area');
		
	} else {
		document.getElementById('user').innerHTML = username;
	}
}

