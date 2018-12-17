const socket = io.connect('185.20.227.161');
// const socket = io.connect('localhost:8080');
socket.on('connect', function() {
	socket.emit('getIndexData');
	socket.on('setIndexData', (data)=> {
		var data0 = new Array();
		var data1 = new Array();
		var place;
		for (var i=0; i<data.length; i++) {
			if (data[i].realized) data1[data1.length] = data[i];
			else data0[data0.length] = data[i];
		}
		for (var i=0; i<data0.length; i++) {
			place = ".tiles_unrealized";
			if (data0.length-i == 1 && data0.length%2 == 1) {
				$(place).append('<div class="tile full_tile" style="background-image: url('+data0[i].main_pic+');"><div class="tile_color" style="background-color: '+data0[i].main_color+'"></div><div class="tile_text"><a href="project?'+data0[i].name+'">'+data0[i].title+'</a></div></div>');
			} else {
				$(place).append('<div class="tile half_tile" style="background-image: url('+data0[i].main_pic+');"><div class="tile_color" style="background-color: '+data0[i].main_color+'"></div><div class="tile_text"><a href="project?'+data0[i].name+'">'+data0[i].title+'</a></div></div>');
			}
		}
		for (var i=0; i<data1.length; i++) {
			place = ".tiles_realized";
			if (data1.length-i == 1 && data1.length%2 == 1) {
				$(place).append('<div class="tile full_tile" style="background-image: url('+data1[i].main_pic+');"><div class="tile_color" style="background-color: '+data1[i].main_color+'"></div><div class="tile_text"><a href="project?'+data1[i].name+'">'+data1[i].title+'</a></div></div>');
			} else {
				$(place).append('<div class="tile half_tile" style="background-image: url('+data1[i].main_pic+');"><div class="tile_color" style="background-color: '+data1[i].main_color+'"></div><div class="tile_text"><a href="project?'+data1[i].name+'">'+data1[i].title+'</a></div></div>');
			}
		}
	});
});