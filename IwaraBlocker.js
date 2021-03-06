(function() {
    hideCancer();
    
    function hideCancer() {
        var allElements = document.querySelectorAll("div.views-column"),
            filepath = browser.extension.getURL("blocklist.txt");
            
        var text = readText(filepath).split(/[\r\n]+/);
        for (var i = 0, maxi = allElements.length; i < maxi; i++) {
            for (var j = 0, maxj = text.length; j < maxj; j++) { 
                var re = new RegExp("username\">".concat(text[j].trim(), "</a>"), "ig");
                var matches = re.exec(allElements[i].innerHTML);
                if (matches) {
                    console.log("Blocking " + text[j].trim());
                    allElements[i].style.display = "none";
                } else if (allElements[i].innerHTML.includes("虫")) {
                    console.log("Generic '虫' block");
                    allElements[i].style.display = "none";
                } else if (allElements[i].innerHTML.toLowerCase().includes("insect")) {
                    console.log("Generic 'insect' block");
                    allElements[i].style.display = "none";
                }
            }
        }
    }
    
    function readText(filename) {
        var rawFile = new XMLHttpRequest(), text;
        rawFile.open("get", filename, false);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) text = rawFile.responseText;
            }
        }
        rawFile.send(null);
        return text;
    }
}());