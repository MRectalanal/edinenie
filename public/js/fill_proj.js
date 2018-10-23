$(document).ready(() => {
	const socket = io.connect('185.20.227.161:8000');
	function get_cookie(c){
		var results=document.cookie.match('(^|;) ?'+c+'=([^;]*)(;|$)');
		if(results)return(unescape(results[2]));
		else return null;
	}
	var current_link = get_cookie("proj_name")+'_proj';
	socket.emit('getProjectData', current_link);
	socket.on('setProjectData', (data)=> {
		$('head').append('<title>'+data.title+' | Благотворительный фонд «Единение»</title>');
		$('#first_backgr').attr('src', data.main_pic);
		$('.project_title').append('<p>'+data.title+'</p>');
		for (var i=0; i<data.sections.length; i++) {
			if(!i){
				$('.footer_sec').before('<section class="'+data.sections[i].sec_type+' second_sec" id="sec'+i+'"></section>');
			} else {
				$('.footer_sec').before('<section class="'+data.sections[i].sec_type+'" id="sec'+i+'"></section>');
			}
			if (data.sections[i].background_color) {
				$('section#sec'+i).css("background-color", data.sections[i].background_color);
			}
			if (data.sections[i].sec_type == "text_sec") {
				$('section#sec'+i).append('<p class="content_header text_header">'+data.sections[i].sec_title+'</p>');
				for (var j=0; j<data.sections[i].content.length; j++) {
					var item =data.sections[i].content[j];
					switch (item.type) {
						case 'txt':
							$('section#sec'+i).append('<p>'+item.txt+'</p>');
							break;
						case 'txt&img':
							$('section#sec'+i).append('<p><img src="'+item.img+'" class="img_in_text img_expand" align="'+item.img_align+'">'+item.txt+'</p>');
							break;
						case 'images_block_3':
							$('section#sec'+i).append('<div class="images_block images_block_3"><img src="'+item.img1+'" class="img_expand"><img src="'+item.img2+'" class="img_expand"><img src="'+item.img3+'" class="img_expand"></div>');
							break;
					}
				}
			} else if (data.sections[i].sec_type == "donate_sec") {
				$('section#sec'+i).append('<p id="donate" class="content_header donate_header">'+data.sections[i].sec_title+'</p><p class="narrow_text">Вы можете оставить добровольное пожертвование любым удобным для Вас способом:</p><div class="donate_button" onclick="window.location.replace(\''+data.sections[i].donate_link+'\');"><span class="donate_button_icon">&#10084;</span><span> Отправить пожертвование</span></div>');
			}
		}
	});
	socket.on('setError404', ()=> {
		window.location.replace('./404');
	});
});