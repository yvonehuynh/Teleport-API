const getTeleport = {};


const googleKey = "AIzaSyDVpmJDNELom9OyM38lybG-uIWytTgRbNY";

$(document).ready(function(){

    // autocomplete
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));
    
    var input = document.getElementById('searchTextField');
    var options = {
        bounds: defaultBounds,
        types: ['(cities)'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    // end autocomplete

    $(".main-search").on("submit", function(e){
        e.preventDefault();
       // const input = $("#searchTextField").val();
        console.log($("#searchTextField").val());
    })

});// end doc ready