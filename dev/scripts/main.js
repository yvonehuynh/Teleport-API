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
        types: ['(regions)'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    // end autocomplete


    // when form submits, get the value of input up to the first comma
    $(".main-search").on("submit", function(e){
        e.preventDefault();
       // const input = $("#searchTextField").val();
       let input = $("#searchTextField").val();
       input = input.substring(0, input.indexOf(","));
        /* console.log($("#searchTextField").val()); */
        console.log(input);
    })

});// end doc ready