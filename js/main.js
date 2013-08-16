require(["lib/jquery", "modules/guitar", "modules/music"], function ($, Guitar, MUSIC_UTILS) {
	var guitar = new Guitar($("#container"));
	guitar.render();

    window.guitar = guitar;
    window.MUSIC_UTILS = MUSIC_UTILS;

});