$(document).ready(() => {
	const socket = io.connect('185.20.227.161');
	// const socket = io.connect('localhost:8080');
	function get_cookie(c){
		var results=document.cookie.match('(^|;) ?'+c+'=([^;]*)(;|$)');
		if(results)return(unescape(results[2]));
		else return null;
	}
	var current_link = get_cookie("proj_name")+'_proj';
	socket.emit('getQuote');
	socket.on('setQuote', (data)=> {
		$('.charity_quote_text')[0].textContent = data.text;
		$('.charity_quote_author>cite')[0].textContent = data.author;
	});
	if (current_link != "/charity_proj") {
		socket.emit('getProjectData', current_link);
		$('input[name=proj_name]').attr('value', current_link);
	} else {
		$('#first_backgr').attr('src', "img/videoposter.png");
		$('input[name=proj_name]').attr('value', 'default');
	}
	socket.on('setProjectData', (data)=> {
		$('#first_backgr').attr('src', data.main_pic);
	});
	socket.on('setError404', ()=> {
		window.location.replace('./404');
	});
});