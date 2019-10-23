
//Input Functions
function getFrequencies_Clicked() {
    var input = getInput();
    if (input != "") {
        var freqs = getLetterFrequencies(input, 0);
        var output = getSortedFrequencyOutput(freqs, 0);
        freqs = getLetterFrequencies(input, 0);
        var ctx = document.getElementById("frequencyChart");
        if (frequencyChart != null) {
            frequencyChart.destroy();
        }
        frequencyChart = createFrequencyGraph(ctx, freqs, 0);
        document.getElementById("letterFrequencies").innerHTML = output;
        showFrequenciesMenu();
    }
}
function showFrequenciesMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#frequencies").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideFrequenciesMenu() {
    $("#frequencies")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "";
            });
}

function calculateIOC_Clicked() {
    var input = getInput();
    if (input != "") {
        var IOC = calculateIOC(input);
        document.getElementById("ioc").innerHTML = "Index of Coincidence is: " + IOC;
        $("#ioc").fadeIn();
    }
}

function stripAlphabets_Clicked() {
    var input = getInput();
    if (input != "") {
        var alphabets = document.getElementById("spinner").value;
        if (alphabets.length == 0 || isNaN(alphabets) || alphabets < 0) {
            $("#inputWarning").fadeIn();
            document.getElementById("inputWarning").innerHTML = "Number of Alphabets must be greater than or equal to one.";
        } else {
            var freqs = getLetterFrequencies(input, alphabets);
            var strips = getAlphabetStrips(input, alphabets);
            showAlphabetsMenu();
            for (var i = 0; i < alphabets; i++) {
                createAlphabetTab(i);
                createAlphabetTabContent(i, freqs, strips);
            }
        }
    }
}
function showAlphabetsMenu() {
    $("#mainmenu")
    .fadeOut(800,
        function () { //hide first div
            $("#alphabets").fadeIn(); //show second div when first div is fully hidden.
            document.getElementById("navbutton").style.display = "none";
        });
}
function hideAlphabetsMenu() {
    $("#alphabets")
    .fadeOut(800,
        function () { //hide first div
            $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
            for (var i = 0; i < alphabetTabs.length; i++) {
                alphabetTabs[i].parentElement.removeChild(alphabetTabs[i]);
                alphabetTabContents[i].parentElement.removeChild(alphabetTabContents[i]);
                alphabetCharts[i].destroy();
            }
            alphabetTabs = new Array();
            alphabetTabContents = new Array();
            alphabetCharts = new Array();
            document.getElementById("navbutton").style.display = "";
        });
}
function createAlphabetTab(index) {
    var tab = document.createElement("li");
    if (index == 0) {
        tab.className = "active";
    }
    document.getElementById("alphabetTabs").appendChild(tab);
    var tabTitle = document.createElement("a");
    tabTitle.href = "#" + (index + 1);
    tabTitle.setAttribute("data-toggle", "tab");
    tabTitle.innerHTML = "Strip " + (index + 1);
    tab.appendChild(tabTitle);
    alphabetTabs[index] = tab;
}
function createAlphabetTabContent(index, freqs, strips) {
    var tabContent = document.createElement("div");
    if (index == 0) {
        tabContent.className = "tab-pane active col-md-12";
    } else {
        tabContent.className = "tab-pane col-md-12";
    }
    tabContent.id = (index + 1);

    var container = document.createElement("div");
    container.style.display = "flex";
    tabContent.appendChild(container);
    var letters = document.createElement("p");
    letters.className = "lead";
    letters.style.textAlign = "center";
    letters.innerHTML = "Letters";
    letters.style.marginRight = "10px";
    letters.style.width = "50%";
    container.appendChild(letters);
    letters = document.createElement("p");
    letters.className = "lead";
    letters.style.textAlign = "center";
    letters.style.width = "50%";
    letters.innerHTML = "Letter Frequencies";
    letters.style.marginLeft = "10px";
    container.appendChild(letters);

    tabContent.appendChild(document.createElement("br"));

    container = document.createElement("div");
    container.style.display = "flex";
    tabContent.appendChild(container);

    letters = document.createElement("pre");
    letters.style.width = "50%";
    letters.style.marginRight = "10px";
    letters.style.whiteSpace = "pre-wrap";
    letters.style.wordBreak = "break-word";
    letters.innerHTML = strips[index] + "\n\nIndex of Coincidence: " + calculateIOC(strips[index]);
    container.appendChild(letters);


    letters = document.createElement("pre");
    letters.style.whiteSpace = "pre-wrap";
    letters.style.wordBreak = "break-word";
    letters.style.marginLeft = "10px";
    letters.style.width = "50%";
    var freqBackup = JSON.parse(JSON.stringify(freqs));
    letters.innerHTML = getSortedFrequencyOutput(freqs, index);
    container.appendChild(letters);
    freqs = freqBackup;

    document.getElementById("alphabetTabContents").appendChild(tabContent);

    var ctx = document.createElement("canvas");
    tabContent.appendChild(ctx);
    alphabetCharts[index] = createFrequencyGraph(ctx, freqs, index);

    alphabetTabContents[index] = tabContent;
}



function getNGraphs_Clicked() {
    var input = getInput();
    if (input != "") {
        var ngraphs = document.getElementById("spinner2").value;
        if (ngraphs.length == 0 || isNaN(ngraphs) || ngraphs < 0) {
            $("#inputWarning").fadeIn();
            document.getElementById("inputWarning").innerHTML = "Number of N-Graphs must be greater than or equal to one.";
        } else {
            showNGraphsMenu();
            document.getElementById("ngraphalphabetical").innerHTML = getNGraphsAlphabetically(input, ngraphs);
            document.getElementById("ngraphmostfrequent").innerHTML = getNGraphsByFrequency(input, ngraphs);
        }
    }
}
function showNGraphsMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#ngraphs").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideNGraphsMenu() {
    $("#ngraphs")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "";
            });
}

function runShifter_Clicked() {
    var input = getInput();
    if (input != "") {
        var labels = new Array();
        var values = new Array();
        var vals = getShifterValues(input);
        var output = "";
        for (var i = 1; i < vals.length; i++) {
            output += "Shift " + i + ": " + vals[i] + "\n";
            labels.push("Shift: " + i);
            values.push(vals[i]);
        }
        document.getElementById("shiftertext").innerHTML = output;
        shifterChart = createGraph(document.getElementById("shiftercanvas"), labels, values, "Number of Coincidences", true);
        showShifterMenu();
    }
}
function showShifterMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#shifter").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideShifterMenu() {
    $("#shifter")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                shifterChart.destroy();
                document.getElementById("navbutton").style.display = "";
            });
}




//Input Checking Functions
function getKeyword() {
    var keyword = document.getElementById("keyword").value;
    if (keyword.length > 0 && (!/[^a-zA-Z]/.test(keyword))) {
        $("#inputWarning").fadeOut();
        return keyword.toUpperCase();
    }
    $("#inputWarning").fadeIn();
    document.getElementById("inputWarning").innerHTML = "Keyword must be provided and only consist of characters ranging from A-Z.";
    return "";
}
function getInput() {
    var input = document.getElementById("input").value;
    if (input.length > 0) {
        $("#inputWarning").fadeOut();
        return input;
    }
    $("#inputWarning").fadeIn();
    document.getElementById("inputWarning").innerHTML = "Input must be provided.";
    return "";
}

$(document).ready(function () {
    $('[data-toggle=offcanvas]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
    $("#input").on('input', function (e) {
        $("#ioc").fadeOut();
    });
    $("#spinner").spinner({
        min: 1
    });
    $("#spinner2").spinner({
        min: 1
    });
    $("#spinner").width(100);
    $("#spinner2").width(100);
    document.getElementById("stripalphabets").addEventListener("click", function (e) {
        e = window.event || e;
        if (this === e.target) {
            // put your code here
            stripAlphabets_Clicked();
        }
    });
    document.getElementById("getngraphs").addEventListener("click", function (e) {
        e = window.event || e;
        if (this === e.target) {
            // put your code here
            getNGraphs_Clicked();
        }
    });
});

function tableCreate(table = [[1, 2, 3]]) {
    var body = document.getElementById('cipherModalBody');
    console.log(body);
    var tbl = document.createElement('table');
    tbl.setAttribute("class", "table table-bordered");
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < table.length; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < table[i].length; j++) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('\u0020'))
        i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }


//Case Statement for encryption
$(document).ready(function(){
    $('#cipherSelect li').on('click', function() {
        $('#selected').text(this.getAttribute("value"));
        switch (this.getAttribute("value")){
            case 'ADFGVX':
                break;
            case 'Affine':
                break;
            case 'AutoKey':
                break;
            case 'Caesar':
                break;
            case 'Columnar Transposition':
                tableCreate();
                $("#cipherModal").modal('show');
                break;
            case 'Hill':
                break;
            case 'Keyword':
                break;
            case 'Playfair':
                break;

      }

    });
});