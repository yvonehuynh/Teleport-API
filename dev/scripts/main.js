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
    });
};

const userInput = () => {
    // when form submits, get the value of input up to the first comma
    $(".main-search").on("submit", function (e) {
        e.preventDefault();
        let city = $("#searchTextField").val();
        city = city.substring(0, city.indexOf(",")).toLowerCase();
        console.log(city);
        getTeleport.apiRequest(city);
    });
};

getTeleport.init=()=>{
    userInput();
};

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