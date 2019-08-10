// Yelp Api-Key
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"

// Constructs yelp URL based on location & categories
function buildQueryUrl() {

    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
    let queryParams = {}

    queryParams.term = "restaurants"
    queryParams.location = $('#zip-input').val().trim();

    // queryParams.latitude = '37.871593' *WILL USE GOOGLE API FOR LOCATION*
    // queryParams.longitude ='-122.272743'*WILL USE GOOGLE API FOR LOCATION*
    queryParams.categories = $("#rest-input").val().trim()
    queryParams.limit = 3
    return queryURL + $.param(queryParams)

}

$("#rest-search").on("click", function(event) {

    $("#rest-holder").empty()



    event.preventDefault()
    let completeURL = buildQueryUrl()
    console.log(buildQueryUrl())

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
            // return cuisines[i].ciusineName
            console.log(`The food you searched for is in the ${cuisines[i].cuisineName} cuisine!`)
        }
        // } else {
        //     // return food
        //     console.log(`The food you searched is not in our array!`)
        // }
    }
}

// Tested foodToCuisine function in the console log and it works :D
foodToCuisine("mantou");
foodToCuisine("pizza");
foodToCuisine("sashimi");
foodToCuisine("soba");
foodToCuisine("peking duck");