// Yelp Api-Key
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"

// Constructs yelp URL based on location & categories
function buildQueryUrl() {

    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
    let queryParams = {}
    queryParams.term = "restaurants"
    queryParams.location = $('#zip-input').val().trim();
    queryParams.categories = $("#rest-input").val().trim();
    queryParams.limit = 5
    return queryURL + $.param(queryParams)

}

// When clicking the search bar trigger an event
$("#rest-search").on("click", function (event) {
    // Clear the rest holder div
    $("#rest-holder").empty()


// Prevent page from refreshing
    event.preventDefault()

    // complete url will be generated with the buildQueryUrl function
    let completeURL = buildQueryUrl()
    console.log(buildQueryUrl())

// ajaxcall
    $.ajax({

        url: completeURL,
        headers: { "Authorization": apiKEY },


    }).then(function (response) {

        // clears the fields
        $("#rest-input").val("")
        $('#zip-input').val("")

        // created a shortcut for clean code
        let shortcut = response.businesses
        
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
            let restWebsite = $(`<h5><a href=${shortcut[i].url}>${shortcut[i].name} Website</a></h5>`)

            // adding content to our newly created div
            restDiv.append(restTitle)
            restDiv.append(restRating)
            restDiv.append(restImg)
            restDiv.append(restAdress)
            restDiv.append(restWebsite)
            
            // adding newly created div to the holder
            $("#rest-holder").append(restDiv)

        }
    })


})

