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
$("#rest-search").on("click", function (event) {
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


    }).then(function (response) {

        // created a shortcut for clean code
        let shortcut = response.businesses

        // Validates a response, if not gives an error
        if (shortcut.length < 1) {
            $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
        }

        // If valid, dom manipulate
        else {

            // clears the fields
            $("#rest-input").val("")
            $('#zip-input').val("")

            // empty the placeholder text
            $("#restaurants-text").empty()

            // loop through the responses
            for (let i = 0; i < shortcut.length; i++) {
                console.log(shortcut[i].name)
                console.log(shortcut[i].categories[0].title)

                // created a shortcut for image url
                let imgURL = shortcut[i].image_url

                // dom manipulation
                let restDiv = $(`<div class="shadow jumbotron bg-white rounded new-rest" style="margin:25px">`)
                let restTitle = $(`<h2>${shortcut[i].name}</h2>`)
                let restRating = $(`<h3>Rating : ${shortcut[i].rating} out of 5 stars!</h3>`)
                let restImg = $("<img>")
                restImg.attr("src", imgURL)
                restImg.addClass("img-fluid rounded newImg")
                let restAdress = $(`<h5>Address : ${shortcut[i].location.display_address}</h5>`)
                let restWebsite = $(`<h5><a href=${shortcut[i].url}>${shortcut[i].name}'s Website</a></h5>`)

                // adding content to our newly created div
                restDiv.append(restTitle)
                restDiv.append(restRating)
                restDiv.append(restImg)
                restDiv.append(restAdress)
                restDiv.append(restWebsite)

                // adding newly created div to the holder
                $("#rest-holder").append(restDiv)

            }


            $("#restaurants-text").append(`<h2 style="margin-bottom:75px;">The Top ${restLimit} Restaurants Near You</h2>`)
        }

    })


})

// removes class of the search button to pulse after multiple clicks
function classRemover() {
    $("#rest-search").removeClass("pulse")
}