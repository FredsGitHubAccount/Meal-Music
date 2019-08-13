// Yelp Api-Key
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"
let restLimit = ""

// Constructs yelp URL based on location & categories
function buildQueryUrl() {

    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
    let queryParams = {}
    queryParams.term = "restaurants"
    queryParams.location = $('#zip-input').val().trim();

    // form validation
    if (queryParams.location < 1) {
        $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
    }
    queryParams.categories = $("#rest-input").val().trim();
    queryParams.limit = 5
    restLimit = queryParams.limit
    return queryURL + $.param(queryParams)

}

// When clicking the search bar trigger an event
$("#rest-search").on("click", function(event) {
    // Clear the rest holder div
    $("#rest-holder").empty()


    // Prevent page from refreshing
    event.preventDefault()

    $("#rest-search").addClass('pulse')

    setTimeout(classRemover, 2000)


    // complete url will be generated with the buildQueryUrl function
    let completeURL = buildQueryUrl()
    console.log(buildQueryUrl())

    // Ajaxcall
    $.ajax({

        url: completeURL,
        headers: { "Authorization": apiKEY },


    }).then(function(response) {

        $("#rest-input").val("")
        $('#zip-input').val("")

        let shortcut = response.businesses
        $("#restaurants-text").empty()

        for (let i = 0; i < shortcut.length; i++) {
            console.log(shortcut[i].name)
            console.log(shortcut[i].categories[0].title)

            let imgURL = shortcut[i].image_url

            let restDiv = $(`<div class="shadow jumbotron bg-white rounded new-rest" style="margin:25px">`)
            let restTitle = $(`<h2>${shortcut[i].name}</h2>`)
            let restRating = $(`<h3>Rating : ${shortcut[i].rating} out of 5 stars!</h3>`)
            let restImg = $("<img>")
            restImg.attr("src", imgURL)
            restImg.addClass("img-fluid rounded newImg")
            let restAdress = $(`<h5>Address : ${shortcut[i].location.display_address}</h5>`)
            let restWebsite = $(`<h5><a href=${shortcut[i].url}>${shortcut[i].name} Website</a></h5>`)

            restDiv.append(restTitle)
            restDiv.append(restRating)
            restDiv.append(restImg)
            restDiv.append(restAdress)
            restDiv.append(restWebsite)
            $("#rest-holder").append(restDiv)

        }


    })




    let playlist = foodToCuisine($("#rest-input").val().trim())
    $.ajax({
        method: "GET",
        url: `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=${playlist}&type=playlist&limit=1`,
        headers: { "Authorization": 'Bearer BQBMe67v-YpBUQUxKjpJPUpEFZ3eLBzAnhOMqUm1bxZ4cCBH6x7h2N2oWLr7Yx1UfkmoaWmW_BvdTrny_MXKWhJKi7H8hObY_4QhvyM4izIYbKyS5qgaT0g4sIMxPvHcnRQmKPlcxxEiDqGIawjpDBizV7t0mKbqPWKDuwEFpbC-1XleQCUr168B6cT2SA' },



    }).then(function(response) {
        console.log(response)



        let imgURL = response.playlists.items[0].images[0].url

        let playListDiv = $(`<div class="shadow jumbotron bg-white rounded new-rest" style="margin:25px">`)
        let playListName = $(`<h2>${response.playlists.items[0].name}</h2>`)
        let playListLink = $(`<h5><a href=${response.playlists.items[0].uri}>Link to the playlist</a></h5>`)

        let playListImg = $("<img>")
        playListImg.attr("src", imgURL)
        playListImg.addClass("img-fluid rounded newImg")

        let playListButton = $(`<iframe src="https://open.spotify.com/playlist/5QjgJ20xSbkyfDY2iPERtz?si=RvarDQQ4TEK2yuNljJP3EQ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)


        playListDiv.append(playListName)
        playListDiv.append(playListImg)
        playListDiv.append(playListLink)
            // playListDiv.append(playListButton)

        $("#playlist-holder").append(playListDiv)



    })


})

// Our array that contains some of the most common foods from different kinds of cuisines
const cuisines = [{
    cuisineName: "japanese",
    foods: [
        "sushi",
        "sashimi",
        "nigiri",
        "roll",
        "ramen",
        "chicken teriyaki",
        "chicken katsu",
        "tempura",
        "yakitori",
        "miso soup",
        "udon",
        "soba",
        "sukiyaki",
        "kaiseki"
    ]
}, {
    cuisineName: "chinese",
    foods: [
        "dumpling",
        "peking duck",
        "chow mein",
        "congee",
        "mantou",
        "char siu",
        "fried rice",
        "mapo doufu",
        "baozi",
        "wonton",
        "spring roll",
        "jiaozi",
        "zongzi",
        "youtiao"
    ]
}, {
    cuisineName: "italian",
    foods: [
        "pizza",
        "pasta",
        "risotto",
        "buridda",
        "cappon magro",
        "bottarga",
        "lasagna",
        "fiorentina steak",
        "ribollita",
        "polenta",
        "ossobuco",
        "carbonara",
        "truffles",
        "aracini",
        "gelato",
        "digestivo"
    ]
}]


// Function that will take a food name as an input and returns the cuisine of the food if it exists in our cuisines array
function foodToCuisine(food) {

    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].foods.indexOf(food) > -1) {
            return cuisines[i].cuisineName
                //console.log(`The food you searched for is in the ${cuisines[i].cuisineName} cuisine!`)

        } else {
            return food
                // console.log(`The food you searched is not in our array!`)
        }
    }
}

// Tested foodToCuisine function in the console log and it works :D
foodToCuisine("mantou");
foodToCuisine("pizza");
foodToCuisine("sashimi");
foodToCuisine("soba");
foodToCuisine("peking duck");



let CLIENT_ID = '20ca2da8c4a44e2db6dca0c2b59f7823';
let CLIENT_SECRET = '9cea1b28e5ae495e816ab87d9a7250ba';



// var encodedData = window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);
// var authorizationHeaderString = 'Authorization: Basic ' + encodedData;

// $.ajax({
//     method: "POST",
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//         'Authorization': 'Basic ' + (CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
//     },
//     form: {
//         grant_type: `client_credentials`
//     },
//     json: true
// }).then(function(response) {
//     console.log(response.access_token);


// })


// function spotifyBuildQueryUrl() {

//     let spotifyQueryURL = `https://api.spotify.com/v1/search`
//     let queryParams = {}
//     queryParams.name = `italian`
//     queryParams.type =
//         // queryParams.latitude = '37.871593' *WILL USE GOOGLE API FOR LOCATION*
//         // queryParams.longitude ='-122.272743'*WILL USE GOOGLE API FOR LOCATION*
//         queryParams.limit = 3
//     return spotifyQueryURL + $.param(queryParams)

// }






// $.ajax({
//     method: "POST",
//     url: "https://accounts.spotify.com/api/token",
//     headers: { `content-type`: 'application/x-www-form-urlencoded' },
//     form: {
//         grant_type: 'client_credentials',
//         client_id: '20ca2da8c4a44e2db6dca0c2b59f7823',
//         client_secret: '9cea1b28e5ae495e816ab87d9a7250ba',
//     }

// }).then(function(response) {
//     console.log(response);
// })

// $.ajax({
//     method: "GET",
//     url: `${spotifyApiURL}search`,
//     dataType: "json",
//     data: {
//         q: countryName,
//         type: "playlist"
//     }
// }).then(function(response) {
//     console.log(response);
// })


// });
// removes class of the search button to pulse after multiple clicks
function classRemover() {
    $("#rest-search").removeClass("pulse")
}