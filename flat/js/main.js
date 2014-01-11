$(document).ready(function(){

  var clip = new ZeroClipboard( document.getElementById("copy"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-2"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-3"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-4"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-5"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-6"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-7"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-8"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-9"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-1"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-10"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-11"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-12"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-13"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-14"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-15"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-16"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-17"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-18"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-19"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );
  var clip = new ZeroClipboard( document.getElementById("copy-20"), {
    moviePath: "./js/ZeroClipboard.swf"
  } );

  clip.on( 'load', function(client) {
    // alert( "movie is loaded" );
  } );
  var timer;
  clip.on( 'complete', function(client, args) {
    //this.style.display = 'none'; // "this" is the element that was clicked
    $('.alertBox').show().css('background-color', args.text).text("Copied " + args.text + " to the clipboard.");
    clearTimeout(timer);   
    timer = setTimeout(function(){
      $('.alertBox').slideUp();
     },3000);
  } );
});