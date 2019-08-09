// Yelp Api-Key
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"


function buildQueryUrl() {

    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
    let queryParams = {}
    queryParams.term = "restaurants"
    queryParams.location = 'berkeley'
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
        shortcut = response.businesses

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

    let spotifyApiKEY = `Bearer BQCaH-Xx4l_Yv_NT9FsKM6zX3SeLBVGnH68l3iKU9B6W1pyRQUMf6H0RhqItnpNt8vyHWwzKeGuQhheXJGednds0prngL3zNPzuBgVZnh50_VXbc-PLkYnLSIDbqPVsHJ4OcjIU6BQAN2Y_EhGaVeXO-Ew0uEVYs`
    let client_id = "20ca2da8c4a44e2db6dca0c2b59f7823";
    let client_secret = "9cea1b28e5ae495e816ab87d9a7250ba";
    let playlistName = "adele";

    function spotifyBuildQueryUrl() {

        let spotifyQueryURL = `https://api.spotify.com/v1/search`
        let queryParams = {}
        queryParams.name = `italian`
        queryParams.type =
            // queryParams.latitude = '37.871593' *WILL USE GOOGLE API FOR LOCATION*
            // queryParams.longitude ='-122.272743'*WILL USE GOOGLE API FOR LOCATION*
            queryParams.limit = 3
        return spotifyQueryURL + $.param(queryParams)

    }

    $.ajax({
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=mexican&type=playlist&limit=1`,

    }).then(function(response) {
        console.log(response)
    })


    // $.ajax({
    //     method: "POST",
    //     url: "https://accounts.spotify.com/api/token",
    //     headers: { 'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64')) },
    //     form: {
    //         grant_type: 'client_credentials'
    //     },
    //     json: true
    // }).then(function(response) {
    //     console.log(response.access_token);
    // })



    // let spotifyApiURL = "https://api.spotify.com/v1/";
    // let countryName = "Japanese"
    // let clientId = '20ca2da8c4a44e2db6dca0c2b59f7823';
    // let clientSecret = '9cea1b28e5ae495e816ab87d9a7250ba';
    // let encodedData = window.btoa(clientId + ':' + clientSecret);
    // let authorizationHeaderString = 'Authorization: Basic ' + encodedData;

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


});