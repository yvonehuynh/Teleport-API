const getTeleport = {};

const googleKey = "AIzaSyDVpmJDNELom9OyM38lybG-uIWytTgRbNY";

function getWidget(elementClass, city){
    $(`${elementClass}`).append(
        `<a class="teleport-widget-link" href="https://teleport.org/cities/${city}/">Job salary calculator - ${city}</a><script async class="teleport-widget-script" data-url="https://teleport.org/cities/${city}/widget/salaries/?currency=USD" data-max-width="100%" data-height: "900px" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>`,
        `<a class="teleport-widget-link" href="https://teleport.org/cities/${city}/">Costs of living - ${city}</a><script async class="teleport-widget-script" data-url="https://teleport.org/cities/${city}/widget/costs/?currency=USD" data-max-width="100%" data-height: "900px" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>`
    );
};

// get AJAX request based on User's location
getTeleport.apiRequest = function(city){
    $.ajax({
        url: `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`,
        method: "GET",
        dataTYpe: "JSON"
    })
    .then(function(response){
        getTeleport.displayScore(response);
        getWidget(".city-score", city);
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
        getWidget(".score2", compareCity);
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
        `<div class="description">
        <p>${response.summary}</p>
        </div>`
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
    $(".refresh-link-container").show();
    $(".compare-link-container").show();
};

getTeleport.displaySecondScore = function (secondResponse) {
    let scoreArray = secondResponse;
    $(".score2").append(
        `<div class="description">
        <p>${secondResponse.summary}</p>
        </div>`
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
    userInput();
    secondUserInput();
    autocompleteInput("searchTextField");
    autocompleteInput("secondTextField");
    $("#first-aside").css({
        display: "none"
    });
    $(".refresh-link-container").hide();
    $(".compare-link-container").hide();
}; // end init


// start document ready
$(document).ready(function(){
    
    getTeleport.init();
    $(".compare-link").on("click", function(e){
        e.preventDefault();
        $("#first-aside").css({
            display: "block"
        });
        $(".aside").css({
            width: "48%"
        });
        $(".info-container").css({
            display: "flex",
            "flex-direction": "row-reverse",
            "justify-content": "space-between"
        });
        window.scrollTo(0, 0);
        $(".compare-link-container").hide();
    });
    $(".refresh-link-container a").on("click", function(e){
        e.preventDefault();
        window.location.reload(false); 
    })
});// end doc ready