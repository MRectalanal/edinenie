const socket = io.connect('185.20.227.161:8000');
socket.on('connect', function() {
	socket.emit('getIndexData');
	socket.on('setIndexData', (data)=> {
		for (var i=0; i<data.length; i++) {
			if (data.length-i == 1 && data.length%2 == 1) {
				$('.tiles').append('<div class="tile full_tile" style="background-image: url('+data[i].main_pic+');"><div class="tile_color" style="background-color: '+data[i].main_color+'"></div><div class="tile_text"><a href="project?'+data[i].name+'">'+data[i].title+'</a></div></div>');
			} else {
				$('.tiles').append('<div class="tile half_tile" style="background-image: url('+data[i].main_pic+');"><div class="tile_color" style="background-color: '+data[i].main_color+'"></div><div class="tile_text"><a href="project?'+data[i].name+'">'+data[i].title+'</a></div></div>');
			}
		}
	});
});