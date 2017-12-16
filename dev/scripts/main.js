const getTeleport = {};


const googleKey = "AIzaSyDVpmJDNELom9OyM38lybG-uIWytTgRbNY";

/* getTeleport.userInput = function({userInput}){
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=${googleKey}`,
        method: "GET",
        dataType: "JSONP"
    })
    .then(function(info){
        console.log(info);
    })
} */






$(document).ready(function(){
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));
    
    var input = document.getElementById('searchTextField');
    var options = {
        bounds: defaultBounds,
        types: ['(cities)'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);


});// end doc ready