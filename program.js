var columns = 0;
const bracket = document.getElementById("bracket");
var members = [];
var total = 0;
var players;
var c1a = 0;
createInputs();

function createInputs() {
    players = document.getElementById("select").value;
    document.getElementById("inputs").innerHTML = "";
    var i = 0;
    while (i < players) {
        i = i + 1;
        var input = document.createElement("input");
        input.setAttribute("class", "playerNames");
        input.setAttribute("id", "input" + i);
        input.setAttribute("placeholder", "Player " + i);
        document.getElementById("inputs").appendChild(input);
    }
}

document.getElementById("randomize").onclick = function () {
    var i = 0;
    while (i < players) {
        i = i + 1;
        var player = document.getElementById("input" + i).value;
        if (player == "") {
            members = [];
            return;
        }
        members.push(player);
    }
    document.getElementById("create").style.display = "none";
    document.getElementById("randomize").style.display = "none";
    document.getElementById("edit").style.display = "inline";
    document.getElementById("switch").style.display = "inline";
    document.getElementById("rerandomize").style.display = "inline";
    document.getElementById("lock").style.display = "inline";
    var title = document.createElement("h1");
    title.innerHTML = document.getElementById("tournamentTitle").value;
    document.getElementById("title").appendChild(title);

    generate();
    format();
}

function generate() {
    var x = players;
    //addMatch(column, amount of matches, people per match);
    //addLine(type [1 or 2], column);
    if (x == 2) {
        //Group 2
        createColumns(1)
        addMatch(1, 1, 2);
    };
    if (x == 4) {
        //Group 4
        createColumns(2)
        addMatch(1, 2, 2);
        addLine(1, 1);
        addMatch(2, 1, 0);
    };
    if (x == 6) {
        //Group 6
        createColumns(3);
        addMatch(1, 2, 2);
        addLine(2, 1);
        addLine(2, 1);
        addMatch(2, 2, 1);
        addLine(1, 2);
        addMatch(3, 1, 0);
    }
    if (x == 8) {
        //Group 8
        createColumns(3)
        addMatch(1, 4, 2);
        addLine(1, 1);
        addLine(1, 1)
        addMatch(2, 2, 0);
        addLine(1, 2);
        addMatch(3, 1, 0);

    };
    if (x == 10) {
        //Group 10
        createColumns(4);
        addMatch(1, 2, 2);
        addLine(2, 1);
        addLine(2, 1);
        addMatch(2, 2, 1);
        addMatch(2, 2, 2)
        addLine(1, 2);
        addLine(1, 2);
        addMatch(3, 2, 0);
        addLine(1, 3);
        addMatch(4, 1, 0);
    }
    if (x == 12) {
        //Group 12
        createColumns(4);
        addMatch(1, 4, 2);
        addLine(2, 1);
        addLine(2, 1);
        addLine(2, 1);
        addLine(2, 1);
        addMatch(2, 4, 1);
        addLine(1, 2);
        addLine(1, 2);
        addMatch(3, 2, 0);
        addLine(1, 3);
        addMatch(4, 1, 0);
    }
}
function createColumns(amount) {
    var i = 0;
    while (i < amount) {
        i = i + 1;
        var section = document.createElement("div");
        section.setAttribute("id", "column" + i);
        section.setAttribute("class", "column")
        bracket.appendChild(section);
        if (i + 1 <= amount) {
            var lines = document.createElement("div");
            lines.setAttribute("id", "line-container" + i);
            lines.setAttribute("class", "line-containers");
            bracket.appendChild(lines);
        }
    }
}

function addMatch(column, amount, people) {
    var i = 0;
    while (i < amount) {
        i = i + 1;
        total = total + 1;
        var section = document.getElementById("column" + column);
        var match = document.createElement("div");
        var line = document.createElement("hr");
        var p1 = document.createElement("p");
        p1.setAttribute("class", "playerSlot");
        var p2 = document.createElement("p");
        p2.setAttribute("class", "playerSlot");
        if (people == 0) {
            p1 = document.createElement("pre");
            p1.setAttribute("class", "playerSlot");
            p2 = document.createElement("pre");
            p2.setAttribute("class", "playerSlot");
            p1.innerHTML = " ";
            p2.innerHTML = " ";
        }
        if (people == 1) {
            p1.setAttribute("id", "random" + total);
            p1.innerHTML = matchmake();
            p2 = document.createElement("pre");
            p2.setAttribute("class", "playerSlot");
            p2.innerHTML = " ";
        }
        if (people == 2) {
            p1.setAttribute("id", "random" + total);
            total = total + 1;
            p2.setAttribute("id", "random" + total);
            p1.innerHTML = matchmake();
            p2.innerHTML = matchmake();
        }

        match.appendChild(p1);
        match.appendChild(line);
        match.appendChild(p2);
        match.setAttribute("id", "match" + i);
        match.setAttribute("class", "match");
        section.appendChild(match);

        if (column == 1) {
            c1a = c1a + 1;
        }
    }
}

function addLine(type, div) {
    var line = document.createElement("div");
    line.setAttribute("class", "line");
    line.setAttribute("style", "margin-bottom: 30px;")
    if (type == 1) {

    }
    if (type == 2) {
        line.setAttribute("style", "border-bottom: 0px; height: 37px; margin-bottom: 20px;");
    }
    document.getElementById("line-container" + div).appendChild(line);
}

function matchmake() {
    var all = members;
    var player = all[Math.floor(Math.random() * all.length)];
    all.splice(all.indexOf(player), 1);
    return player;
}

function format() {
    var i = 2;
    var hc1 = c1a * 45 + (c1a - 1) * 10;
    hc1 = hc1 / 4;
    while (document.getElementById("column" + i) != null) {
        if (i > 2) { hc1 = hc1 + 30 };
        if (i == 2 && players == 12) {
            hc1 = hc1 - 25;
        }
        if (i == 3 && players == 12) {
            hc1 = hc1 + 20;
        }
        if (players == 10 && i == 3) {
            hc1 = hc1 + 25;
        }
        document.getElementById("column" + i).style.marginTop = hc1 + "px";
        i = i + 1;
    }
    i = 1;
    var margin = 25;
    while (document.getElementById("line-container" + i) != null) {
        if (i > 1) {
            margin = margin + 25;
            if (players == 4 || players == 8) {
                margin = margin + 25;
            }
            if (players == 12 && i == 3) {
                margin = margin + 25;
            }
            if (players == 10 && i == 3) {
                margin = margin + 25;
            }
        };

        document.getElementById("line-container" + i).style.marginTop = margin + "px";
        i = i + 1;
    }
}

var switchb = false;
var switching = false;
var locking = false;
var edit = false;
var switch1;
var switch2;
var locked = [];

document.getElementById("edit").onclick = function () {
    if (edit == false && switchb == false && locking == false) {
        edit = true;
        var i = 1;
        while (document.getElementById("random" + i) != null) {
            var text = document.getElementById("random" + i).innerHTML;
            if (text != " ") {
                var input = document.createElement("input");
                input.setAttribute("id", "editinput" + i)
                input.setAttribute("class", "playerInput");
                input.setAttribute("value", text);
                input.setAttribute("placeholder", "Player");
                document.getElementById("random" + i).parentNode.replaceChild(input, document.getElementById("random" + i));
            }
            i = i + 1;
        }
        var boxes = document.getElementsByClassName("playerSlot");
        var extraboxes = Array.from(boxes);
        i = 0;
        console.log(extraboxes);
        while (extraboxes[i] != null && extraboxes[i].innerHTML == " ") {
            var input = document.createElement("input");
            input.setAttribute("id", "extraeditinput" + i)
            input.setAttribute("class", "playerInput");
            input.setAttribute("placeholder", "Empty Slot");
            extraboxes[i].parentNode.replaceChild(input, extraboxes[i]);
            i = i + 1;
        }
        return;
    }
    if (edit == true) {
        edit = false;
        var a = 1;
        while (document.getElementById("editinput" + a) != null) {
            if (document.getElementById("editinput" + a).value == "" || document.getElementById("editinput" + a).value == " ") {
                document.getElementById("editinput" + a).setAttribute("style", "border: 1px solid red;");
                var blank = true;
            }
            a = a + 1;
        }
        if (blank == true) {
            blank = false;
            edit = true;
            return;
        };
        var i = 1;
        while (document.getElementById("editinput" + i) != null) {
            var value = document.getElementById("editinput" + i).value;
            var player = document.createElement("p");
            player.setAttribute("id", "random" + i);
            player.innerHTML = value;
            player.setAttribute("class", "playerSlot");
            if (locked.indexOf("random" + i) >= 0) { player.style.color = "lightgray"; }
            document.getElementById("editinput" + i).parentNode.replaceChild(player, document.getElementById("editinput" + i));
            i = i + 1
        }
        a = 0;
        while (document.getElementById("extraeditinput" + a) != null) {
            if (document.getElementById("extraeditinput" + a).value == "" || document.getElementById("extraeditinput" + a).value == " ") {
                var pre = document.createElement("pre");
                pre.innerHTML = " ";
                pre.setAttribute("class", "playerSlot");
                document.getElementById("extraeditinput" + a).parentNode.replaceChild(pre, document.getElementById("extraeditinput" + a));
            }
            a = a + 1;
        }
        var b = 0;
        while (document.getElementById("extraeditinput" + b) != null) {
            var value = document.getElementById("extraeditinput" + b).value;
            var player = document.createElement("p");
            player.innerHTML = value;
            player.setAttribute("class", "playerSlot");
            player.setAttribute("id", "random" + i);
            locked.push("random" + i);
            if (locked.indexOf("random" + i) >= 0) { player.style.color = "lightgray"; }
            document.getElementById("extraeditinput" + b).parentNode.replaceChild(player, document.getElementById("extraeditinput" + b));
            b = b + 1;
            i = i + 1;
        }
    }
    return;
}

function switchingFunction() {
    if (switchb == false && edit == false && locking == false) {
        switchb = true;
        var i = 1;
        while (document.getElementById("random" + i) != null) {
            var text = document.getElementById("random" + i).innerHTML;
            if (text != " ") {
                var button = document.createElement("button");
                button.setAttribute("id", "switchbutton" + i)
                button.setAttribute("class", "playerInput");
                button.setAttribute("style", "text-align: left;")
                button.setAttribute("onclick", "switchf(this.id);")
                button.innerHTML = text;
                document.getElementById("random" + i).parentNode.replaceChild(button, document.getElementById("random" + i));
            }
            i = i + 1;
        }
        return;
    }
    if (switchb == true) {
        switchb = false;
        var i = 1;
        while (document.getElementById("switchbutton" + i) != null) {
            var value = document.getElementById("switchbutton" + i).innerHTML;
            var player = document.createElement("p");
            player.setAttribute("id", "random" + i);
            player.innerHTML = value;
            player.setAttribute("class", "playerSlot");
            if (locked.indexOf("random" + i) >= 0) { player.style.color = "lightgray"; }
            document.getElementById("switchbutton" + i).parentNode.replaceChild(player, document.getElementById("switchbutton" + i));

            i = i + 1
        }
    }
    return;
}

function switchf(id) {
    if (switching == false) {
        button = document.getElementById(id);
        button.disabled = true;
        button.style.background = "#8c8c8c";
        switch1 = button;
        switching = true;
        return;
    }
    if (switching == true) {
        switch2 = document.getElementById(id);
        var text1 = switch1.innerHTML;
        var text2 = switch2.innerHTML;
        switch1.innerHTML = text2;
        switch2.innerHTML = text1;
        switching = false;
        switchingFunction();
        return;
    }
}

document.getElementById("rerandomize").onclick = function () {
    if (edit == false && switchb == false && locking == false) {
        var i = 1;
        var randomize = [];
        while (document.getElementById("random" + i) != null) {
            if (locked.indexOf("random" + i) == -1) {
                randomize.push(document.getElementById("random" + i).innerHTML);
            }
            i = i + 1
        }
        i = 1;
        while (document.getElementById("random" + i) != null) {
            if (locked.indexOf("random" + i) == -1) {
                var player = randomize[Math.floor(Math.random() * randomize.length)];
                document.getElementById("random" + i).innerHTML = player;
                randomize.splice(randomize.indexOf(player), 1);
            }
            i = i + 1
        }
    }
}

function startLocking() {
    if (switchb == false && edit == false && locking == false) {
        locking = true;
        var i = 1;
        while (document.getElementById("random" + i) != null) {
            var text = document.getElementById("random" + i).innerHTML;
            if (text != " ") {
                var button = document.createElement("button");
                button.setAttribute("id", "lockbutton" + i)
                button.setAttribute("class", "playerInput");
                button.setAttribute("style", "text-align: left;")
                button.setAttribute("onclick", "lock(this.id);")
                button.innerHTML = text;
                document.getElementById("random" + i).parentNode.replaceChild(button, document.getElementById("random" + i));
            };
            i = i + 1;
        }
        return;
    }
    if (locking == true) {
        locking = false;
        var i = 1;
        while (document.getElementById("lockbutton" + i) != null) {
            var value = document.getElementById("lockbutton" + i).innerHTML;
            var player = document.createElement("p");
            player.setAttribute("id", "random" + i);
            player.innerHTML = value;
            player.setAttribute("class", "playerSlot");
            if (locked.indexOf("random" + i) >= 0) { player.style.color = "lightgray"; }
            document.getElementById("lockbutton" + i).parentNode.replaceChild(player, document.getElementById("lockbutton" + i));
            i = i + 1
        }
    }
    return;
}

function lock(id) {
    startLocking();
    newid = id.replace("lockbutton", "random");
    slot = document.getElementById(newid);

    if (locked.indexOf(newid) == -1) {
        locked.push(newid);
        slot.style.color = "lightgray";
        return;
    }
    if (locked.indexOf(newid) >= 0) {
        locked.splice(locked.indexOf(newid), 1);
        console.log(locked);
        slot.style.color = "white";
        return;
    }
}