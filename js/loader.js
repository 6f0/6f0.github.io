function loadScripts() {
    var scripts= ["https://bmcculley.github.io/js/jquery.min.js", "https://bmcculley.github.io/js/app.js"];
    for (var i = 0; i < scripts.length; i++) {
        setTimeout(function() {
            var script = document.createElement("script");
            script.src = scripts[i];
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
        }, 500);
    }
}