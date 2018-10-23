$(document).ready(() => {
	window.onscroll=()=>{$('.logo').css("margin-bottom",((window.pageYOffset||document.documentElement.scrollTop)/1.5)+"px");}
	$('.tiles').on('mouseenter', '.tile', tileMEnter);
	$('.tiles').on('mouseleave', '.tile', tileMLeave);
	function tileMEnter(event){$(this).children('.tile_color').css("opacity", "0.8")}
	function tileMLeave(event){$(this).children('.tile_color').css("opacity", "0.3")}
	$('body').on('click', '.img_expand', expand_img);
	function expand_img(event) {
		$('body').append('<div class="popup"><img class="popup_img" src="'+$(this).attr('src')+'"/></div>');
		var img_num;
		var all_imgs=Array.from($('.img_expand'));
		for (var i = 0; i < all_imgs.length; i++)if(all_imgs[i].attributes.src.nodeValue==$('.popup_img').attr('src'))img_num=i;
		$('body').on('click','.popup',remove_this);
		$(document).keyup(function(e){if(e.keyCode==27){$('.popup').remove()}});
		$(document).keyup(function(e){if(e.keyCode==39){img_num=(img_num+1)%all_imgs.length;$('.popup_img').attr('src', all_imgs[img_num].attributes.src.nodeValue)}});
		$(document).keyup(function(e){if(e.keyCode==37){img_num=(img_num-1+all_imgs.length)%all_imgs.length;$('.popup_img').attr('src', all_imgs[img_num].attributes.src.nodeValue)}});
	}
	function remove_this(event){$(this).remove()}
	$('.footer_sec').append('<div class="footer_left"><p class="footer_text_head">Контакты</p><p>г. Советская Гавань, ул. Совгаванская 0, оф. 420</p><p>+ 7 (000) 000-00-00</p></div><div class="footer_right"><div class="logo_img footer_logo"><img src="img/logo.png"/></div><div class="logo_text footer_logo"><div class="logo_text_main"><p>Фонд «Единение»</p></div></div></div>');
	$('body').on('click','.footer_logo',()=>{window.location.href="/"});
});