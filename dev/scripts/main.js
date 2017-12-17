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
        getTeleport.displayScore(response);
    })// end .then promise
    .fail(function(){
        alert("information not found. Please search another city");
    }) // end .fail promise
}; // end ajax 

getTeleport.secondApiRequest = function(compareCity) {
    $.ajax({
        url: `https://api.teleport.org/api/urban_areas/slug:${compareCity}/scores/`,
        method: "GET",
        dataTYpe: "JSON"
    })
    .then(function(secondResponse){
        console.log(secondResponse);
        getTeleport.displaySecondScore(secondResponse);
    });
};
// progress bar
function progress(id, percentage) {
    $(`#${id}`).LineProgressbar({
        percentage: percentage*10,
        duration: 1000,
        fillBackgroundColor: '#3498db',
        backgroundColor: '#EEEEEE',
        radius: '0px',
        height: '10px',
        width: '100%'
    });
};

// progress bar
function progressCompare(id, percentage) {
    $(`#${id}`).LineProgressbar({
        percentage: percentage * 10,
        duration: 1000,
        fillBackgroundColor: '#000',
        backgroundColor: '#EEEEEE',
        radius: '0px',
        height: '10px',
        width: '100%'
    });
};
// display results on DOM
getTeleport.displayScore = function(response){
    let scoreArray = response;
    $(".city-score").append(
        `<p>${response.summary}</p>`
    )
    scoreArray.categories.forEach(function (newArray, index) {
        $(".city-score").append(
            `<li>
                <h2>${newArray.name}</h2>
                <p>${newArray.score_out_of_10}</p>
                <div id="${index}"></div>
            </li>`
        );
        progress(index, newArray.score_out_of_10);
    });
};

getTeleport.displaySecondScore = function (secondResponse) {
    let scoreArray = secondResponse;
    $(".score2").append(
        `<p>${secondResponse.summary}</p>`
    );
    scoreArray.categories.forEach(function (newArray, index) {
        $(".score2").append(
            `<li>
                <h2>${newArray.name}</h2>
                <p>${newArray.score_out_of_10}</p>
                <div id="${index}"></div>
            </li>`
        );
        progressCompare(index, newArray.score_out_of_10);
    });
};

// function to initialize api request via user input
/* const userInput = () => {
    // when form submits, get the value of input up to the first comma
    $(".main-search").on("submit", function (e) {
        e.preventDefault();
        let city = $("#searchTextField").val();
        city = city.substring(0, city.indexOf(",")).toLowerCase().replace(/ /, "-");
        console.log(city);
        getTeleport.apiRequest(city);
    });
};  */// end userInput funciton

const userInput = (form, input) => {
    // when form submits, get the value of input up to the first comma
    $(".main-search").on("submit", function (e) {
        e.preventDefault();
        let city = $("#searchTextField").val();
        city = city.substring(0, city.indexOf(",")).toLowerCase().replace(/ /, "-"); 
        console.log(city);
        getTeleport.apiRequest(city);
    });
};

const secondUserInput =()=> {
    // when form submits, get the value of input up to the first comma
    $(".second-search").on("submit", function (e) {
        e.preventDefault();
        let city = $("#secondTextField").val();
        city = city.substring(0, city.indexOf(",")).toLowerCase().replace(/ /, "-");
        console.log(city);
        getTeleport.secondApiRequest(city);
    });
};


function autocompleteInput(inputId){
    // autocomplete
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));
        
        var input = document.getElementById(inputId);
        var options = {
            bounds: defaultBounds,
            types: ['(regions)'],
        };
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        // end autocomplete
}

getTeleport.init=()=>{
/*     userInput(".main-search", "#searchTextField");
    userInput(".second-search", "#secondTextField"); */
    userInput();
    secondUserInput();
    autocompleteInput("searchTextField");
    autocompleteInput("secondTextField");
}; // end init


// start document ready
$(document).ready(function(){
    
    getTeleport.init();

});// end doc ready