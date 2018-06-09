function loadScripts() {
    var scripts= ["/js/jquery.min.js", "/js/app.js"];
    for (var i = 0; i < scripts.length; i++) {
        setTimeout(function() {
            var script = document.createElement("script");
            script.src = scripts[i];
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
        }, 500);
    }
    var linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/css/minimal.min.css";
    document.head.appendChild(linkElement);
}