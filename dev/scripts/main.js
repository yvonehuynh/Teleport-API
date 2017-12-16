const getTeleport = {};

const googleKey = "AIzaSyDVpmJDNELom9OyM38lybG-uIWytTgRbNY";

// get AJAX request based on User's location
getTeleport.apiRequest = function(city){
    $.ajax({
        url: `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`,
        method: "GET",
        dataTYpe: "JSON"
    })
    .then(function(response){
        console.log(response);
        getTeleport.displayScore(response);
    })// end .then promise
    .fail(function(){
        alert("information not found. Please search another city");
    }) // end .fail promise
}; // end ajax request

getTeleport.displayScore = function(response){
    let scoreArray = response;
    $(".city-score").append(
        `<p>${response.summary}</p>`
    )
    scoreArray = scoreArray.categories.map(function(newArray){
        console.log(newArray);
        $(".city-score").append(
            `<li>
                <h2>${newArray.name}</h2>
                <p>${newArray.score_out_of_10}</p>
            </li>`
        )
    });
};

// function to initialize api request via user input
const userInput = () => {
    // when form submits, get the value of input up to the first comma
    $(".main-search").on("submit", function (e) {
        e.preventDefault();
        let city = $("#searchTextField").val();
        city = city.substring(0, city.indexOf(",")).toLowerCase().replace(/ /, "-");
        console.log(city);
        getTeleport.apiRequest(city);
    });
}; // end userInput funciton

getTeleport.init=()=>{
    userInput();
}; // end init


// start document ready
$(document).ready(function(){

    getTeleport.init();

    // autocomplete
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));
    
    var input = document.getElementById('searchTextField');
    var options = {
        bounds: defaultBounds,
        types: ['(regions)'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    // end autocomplete

});// end doc ready