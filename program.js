var columns = 0;
const bracket = document.getElementById("bracket");
var members = [];
var total = 0;
var players;
var c1a = 0;
var edit = false;
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
document.getElementById("randomize").onclick = function() {
    document.getElementById("create").style.display = "none";
    document.getElementById("randomize").style.display = "none";
    document.getElementById("edit").style.display = "inline";
    var title = document.createElement("h1");
    title.innerHTML = document.getElementById("tournamentTitle").value;
    document.getElementById("title").appendChild(title);
    var i = 0;
    while(i < players) {
        i = i + 1;
        var player = document.getElementById("input" + i).value;
        members.push(player);
    }
    generate();
    format();
}
function generate() {
    var x = players;
    if (x == 2) {
        //Group 2
        createColumns(1)
        addMatch(1, 1, 2);
    };
    if (x == 4) {
        //Group 4
        createColumns(2)
        addMatch(1, 2, 2);
        addMatch(2, 1, 0);
    };
    if (x == 6) {
        //Group 6
        createColumns(3);
        addMatch(1, 2, 2);
        addMatch(2, 2, 1);
        addMatch(3, 1, 0);
    }
    if (x == 8) {
        //Group 8
        createColumns(3)
        addMatch(1, 4, 2);
        addMatch(2, 2, 0);
        addMatch(3, 1, 0);

    };
    if (x == 10) {
        //Group 10
        createColumns(4);
        addMatch(1, 2, 2);
        addMatch(2, 2, 1);
        addMatch(2, 2, 2)
        addMatch(3, 2, 0);
        addMatch(4, 1, 0);
    }
    if (x == 12) {
        //Group 12
        createColumns(4);
        addMatch(1, 4, 2);
        addMatch(2, 4, 1);
        addMatch(3, 2, 0);
        addMatch(4, 1, 0);
    }
}
function createColumns(amount) {
    var i = 0;
    while (i < amount) {
        i = i + 1;
        var section = document.createElement("div");
        section.setAttribute("id", "column" + i);
        bracket.appendChild(section);
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
            line.style.marginTop = "10px";
        }
        if (people == 1) {
            p1.setAttribute("id", "random" + total);
            p1.innerHTML = matchmake();
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

function matchmake() {
    var player = members[Math.floor(Math.random() * members.length)];
    members.splice(members.indexOf(player), 1);
    return player;
}

function format() {
    var i = 2;
    var hc1 = c1a * 45 + (c1a - 1) * 10;
    hc1 = hc1 / 4;
    while (document.getElementById("column" + i) != null) {
        if (i > 2) {hc1 = hc1 + 30};
        document.getElementById("column" + i).style.marginTop = hc1 + "px";
        i = i + 1;
    }
}

document.getElementById("edit").onclick = function() {
    if (edit == false) {
        edit = true;
        var i = 1;
        while(document.getElementById("random" + i) != null) {
            var text = document.getElementById("random" + i).innerHTML;
            if (text != "") {
                document.getElementById("random" + i).innerHTML = "formatting";
                var input = document.createElement("input");
                input.setAttribute("id", "editinput" + i)
                input.setAttribute("class", "playerInput");
                input.setAttribute("value", text);
                input.setAttribute("placeholder", "Player Name");
                document.getElementById("random" + i).parentNode.replaceChild(input, document.getElementById("random" + i));
            }
            i = i + 1;
        }
        return;
    }
    if (edit == true) {
        edit = false;
        var a = 1;
        while(document.getElementById("editinput" + a) != null) {
            if (document.getElementById("editinput" + a).value == "") {
                console.log("q")
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
        while(document.getElementById("editinput" + i) != null) {
            var value = document.getElementById("editinput" + i).value;
            var player = document.createElement("p");
            player.setAttribute("id", "random" + i);
            player.innerHTML = value;
            player.setAttribute("class", "playerSlot");
            document.getElementById("editinput" + i).parentNode.replaceChild(player, document.getElementById("editinput" + i));
            i = i + 1
        }
    }
    return;
}