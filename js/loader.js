function loadStyle() {
    var linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/css/minimal.min.css";
    document.head.appendChild(linkElement);
}