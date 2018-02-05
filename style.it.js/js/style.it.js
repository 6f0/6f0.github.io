jQuery(document).ready(function($){
	console.log("Document ready!");
	// https://scotch.io/quick-tips/how-to-encode-and-decode-strings-with-base64-in-javascript
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var style_it_cookie = readCookie("style_it");

	if ( style_it_cookie ) {
		var style_it_css = Base64.decode( style_it_cookie );
		$('head').append( '<style type="text/css" id="style_it_head">' + style_it_css + '</style>' );
	}

	$("#submit_style").on("click", function(e) {
		e.preventDefault();
		var style_it_css = $("#style_it_css").val();
		$("head").append( '<style type="text/css" id="style_it_head">' + style_it_css + '</style>' );
		// maybe a slight timeout would be nice
		var encoded_style = Base64.encode(style_it_css);
		createCookie("style_it", encoded_style, 30);
		$(".modal").hide();
		$(".modal-background").hide();
	});

	$("#us-link").click(function(e){
		e.preventDefault();
		$(".modal").show();
		$(".modal-background").show();
		$("#style_it_css").focus();
	});

	$(".cancel-link").click(function(e){
		e.preventDefault();
		$(".modal").hide();
		$(".modal-background").hide();
	});

	$(document).keyup(function(e){
	    if(e.keyCode === 27){
	    	$(".modal").hide();
			$(".modal-background").hide();
	    }
	});

	$(".kill_style_it").on("click", function(e) {
		e.preventDefault();
		eraseCookie("style_it");
		$("#style_it_head").remove();
	});
});

// http://stackoverflow.com/a/24103596
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}