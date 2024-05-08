// var json = require('./parking.json');
// console.log(json);

async function loadJson() {


    //console.log(data);
}


async function loadLots() { //this populates the lots page with a quick view of each lot
    console.log("load lot function starts");
    let response = await fetch("https://oliver-shariff.github.io/SD330//parking.json");
    let data = await response.json();
    // console.log(data);
    // console.log(data['lots'][0].Name);
    // console.log(data['lots'].length);

    for (i = 0; i < data['lots'].length; i++) {
        let thisLot = data['lots'][i]
        let localDiv = "lotDiv" + i; // A new div is created for each lot
        let localMap = "mapImage" + i; // A new image is created for each lot
        let testMap = "https://www.marist.edu/documents/d/guest/marist-2d-pking-traffic-maps_2400x1600_map-only_2-232";
        document.getElementById("lotFeed").innerHTML += '<div id = "lotDiv' + i + '" class = "feedItem">';
        document.getElementById(localDiv).innerHTML += '<h1><a href="' + thisLot.Name + '.html">' + thisLot.Name + '</h1></a><p></p> '; //This header also creates a link for each lot
        document.getElementById(localDiv).innerHTML += ' <a id="mapImage' + i + '"> <img src="' + thisLot.Map + '" alt="CampusMap" class="lotMap"> </a><p></p>';
        
        document.getElementById(localDiv).innerHTML += '</div>';
    }
}

async function loadSpots() {// This function will load the info for each lots main page
    console.log("the load spot function starts")
    let response = await fetch("https://oliver-shariff.github.io/SD330//parking.json");
    let data = await response.json();
    for (i = 0; i < data['lots'].length; i++) {
        let thisLot = data['lots'][i]
        var title = document.title;
        console.log(title);
        if (title == thisLot.Name) { // only execute when page matches object
            let localDiv = "div" + data['lots'][i].Name; //this is a main div on each lots individual page
            console.log(localDiv);
            document.getElementById(localDiv).innerHTML += '<h1>' + thisLot.Name + '</h1>';
            document.getElementById(localDiv).innerHTML += '<a id="mapImage' + i + '"> <img src="' + thisLot.Map + '" class="fullMap"> </a><p></p>';
            document.getElementById(localDiv).innerHTML += thisLot.Comments + ". <p></p>";
            document.getElementById(localDiv).innerHTML += 'This lot opens at <strong>' + thisLot.Open + '</strong> and closes at <strong>' + thisLot.Close + '</strong>. <p></p>';
            if (thisLot.Spots) { // see if spots data is available for lot
                document.getElementById(localDiv).innerHTML += "This parking lot has the following spots: ";
                document.getElementById(localDiv).innerHTML += '<div id="spots' + thisLot.Name + '"></div>'
                for (i = 0; i < thisLot.Spots.length; i++) {
                    let localDiv = "spots" + thisLot.Name // div that holds all card
                    let cardDiv = "spotNum_" + i; //div for each card
                    let thisSpot = thisLot.Spots[i];

                    if (thisSpot.Availability == "open") {
                        document.getElementById(localDiv).innerHTML += '<div class="spotCardAvailable" id = "spotNum_' + i + '">';
                    }
                    else if(thisSpot.Availability == "filled"){
                        document.getElementById(localDiv).innerHTML += '<div class="spotCardFilled" id = "spotNum_' + i + '">';
                    }
                    else {
                        document.getElementById(localDiv).innerHTML += '<div class="spotCard" id = "spotNum_' + i + '">';
                    }
                    document.getElementById(cardDiv).innerHTML += "Availability: " + thisSpot.Availability + "<p></p>";
                    document.getElementById(cardDiv).innerHTML += "Number: " + thisSpot.Number + "<p></p>";
                    document.getElementById(cardDiv).innerHTML += "Type: " + thisSpot.Type + "<p></p>"
                    document.getElementById(cardDiv).innerHTML += "Handicap: " + thisSpot.Handicap + "<p></p>";

                    document.getElementById(localDiv).innerHTML += "</div>";




                    ;

                }
            }
            else{
                document.getElementById(localDiv).innerHTML += "<h1>These spots haven't been generated yet. Check out <a href = McCann.html> McCann </a></h1>";
            }



        }
    }

}

function routeLot() {
    alert("you picked a lot!")
}

window.addEventListener("load", loadLots);
window.addEventListener("load", loadSpots);