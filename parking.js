// var json = require('./parking.json');
// console.log(json);

async function loadJson() {


    //console.log(data);
}


async function loadLots() {
    console.log("load lot function starts");
    let response = await fetch("./parking.json");
    let data = await response.json();
    console.log(data);
    console.log(data['lots'][0].Name);
    console.log(data['lots'].length);

    for (i = 0; i < data['lots'].length; i++) {
        let thisLot = data['lots'][i]
        let localDiv = "lotDiv" + i; // A new div is created for each lot
        let localMap = "mapImage" + i; // A new image is created for each lot
        document.getElementById("lotFeed").innerHTML += '<div id = "lotDiv' + i + '">';
        document.getElementById(localDiv).innerHTML += "<h1>" + thisLot.Name + "</h1><p></p> ";
        document.getElementById(localDiv).innerHTML += ' <a id="mapImage'+ i + '"> <img src="' + thisLot.Map + '" alt="CampusMap" class="lotMap"> </a><p></p>';
        document.getElementById(localDiv).innerHTML += thisLot.Comments;
        document.getElementById(localDiv).innerHTML += '</div>';
        document.getElementById(localMap).addEventListener("click", routeLot);
    }
}
function routeLot(){
    alert("you picked a lot!")
}

window.addEventListener("load", loadLots);