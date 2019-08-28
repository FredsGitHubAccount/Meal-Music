// Yelp Api-Key & Global Variables
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"
let restLimit = ""
let restCategory = ""
let locationInput = ""
let shortcut = ""
let token = ""


const cuisines = [{
    cuisineName: "Japanese",
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
        "kaiseki",
        "noodles"
    ]
},{
    cuisineName: "America",
    foods: [
        "burgers",
        "steaks",
        "steak",
        "sandwiches",
        "fries",
        "burger",
        "pork",
        "bbq",
        "chicken",
        "hotdogs",
        "hotdog",
    ]
},{
    cuisineName: "Mexican",
    foods: [
        "taco",
        "tacos",
        "quesadilla",
        "salsa",
        "chipotle",
        "fajitas",
        "fajita",
        "quesadillas",
        "burrito",
        "burritos",
        "guacamole",
    ]
},{
    cuisineName: "Middle-Eastern",
    foods: [
        "kebab",
        "kebabs",
        "tabouleh",
        "shawarma",
        "hummus",
        "pita",
        "babaganoush",

    ]
}, {
    cuisineName: "Chinese",
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
    cuisineName: "Italian",
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
    let restaurantInput = $("#rest-input").val().trim();
    queryParams.categories = restaurantInput.toLowerCase()
    
    if (queryParams.categories < 1){
        $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
    }

    // redefining global variables
    restCategory = $("#rest-input").val().trim();
    locationInput = $("#zip-input").val().trim();

    
    queryParams.limit = 5 
    restLimit = queryParams.limit
    
    return queryURL + $.param(queryParams)

}

// removes class of the search button to pulse after multiple clicks
function classRemover() {
    $("#rest-search").removeClass("pulse")
}

// Function that will take a food name as an input and returns the cuisine of the food if it exists in our cuisines array, used for spotify api call
function foodToCuisine(food) {

    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].foods.indexOf(food) > -1) {

            console.log(`The food you searched for is in the ${cuisines[i].cuisineName} cuisine!`)
            return cuisines[i].cuisineName
        }
    }

    console.log(`The food you searched is not in our array!`)
    return food

}

// When clicking the search bar trigger an event
$("#rest-search").on("click", function (event) {

    // Clear the rest holder div
    $("#rest-holder").empty()


    // Prevent page from refreshing
    event.preventDefault()

    // dynamically give the button a pulse style
    $("#rest-search").addClass('pulse')
    setTimeout(classRemover, 2000)


    // complete url will be generated with the buildQueryUrl function
    let completeURL = buildQueryUrl().toLowerCase()
    console.log(completeURL)

    // Ajaxcall
    $.ajax({

        url: completeURL,
        headers: { "Authorization": apiKEY },


    }).then(function (response) {

        // created a shortcut for clean code
        shortcut = response.businesses

        // Validates a response, if not gives an error
        if ((shortcut.length < 1) || (restCategory < 1) || (locationInput < 1)) {
            $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
            return;
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
    
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';
    
    // Set token
    let _token = hash.access_token;
    
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    
    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = '1bba61329aa440ab915d8a99af8525c2';
    const redirectUri = 'https://fredsgithubaccount.github.io/Meal-Music/'
    const scopes = [
      'user-top-read'
    ];
    
    // If there is no token, redirect to Spotify authorization
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }
    let playListCon = $("#rest-input").val().trim()
    playListCon = playListCon.toLowerCase()
    let playlist = foodToCuisine(playListCon)
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${playlist+" traditional"}&type=playlist&limit=1`,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        success: function(data) { 
          // Do something with the returned data
  
              console.log(response)
            $("#playlist-text").empty()
          
    
    
            if((restCategory < 1) || (locationInput < 1) ||(response.playlists.length<1)){
                $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
                $("#playlist-text").html(`<h2 class="wrong-input">**We Could Not Find A Playlist**</h2>`)
                return;
            }
         
            else {
            let playListDiv = $(`<div class="shadow jumbotron bg-white rounded new-playlist animated fadeInDownBig" style="margin:25px">`);
          
    
            let playListTitle = $(`<h2 style="margin-bottom:55px">`)
            playListTitle.html(`Here Is Your Playlist!`)
            console.log(response.playlists.items[0].external_urls.spotify)
            
    
            let playListPlayer = $(`<iframe width="100%" height="400" frameborder="5" allowtransparency="true" allow="encrypted-media">`)
            playListPlayer.addClass("player")
            playListSrc = response.playlists.items[0].external_urls.spotify
           
            let sliced = playListSrc.split("/").pop();
    
            playListPlayer.attr("src",`https://open.spotify.com/embed/playlist/${sliced}`)
            
          
            playListDiv.append(playListTitle)
            playListDiv.append(playListPlayer)
          
            $("#playlist-holder").html(playListDiv)
    
            // let playListImg = $("<img>")
            // playListImg.attr("src", response.playlists.items[0].images[0].url)
            // playListImg.addClass("img-fluid rounded newImg")
            // playListDiv.append(playListLink)
            }
     
     
        }
     });
     

    // ajax call for the playlist, token expires every hour
    
    console.log(playlist)
    // $.ajax({
    //     method: "GET",
    //     url: `https://api.spotify.com/v1/search?q=${playlist+" traditional"}&type=playlist&limit=1`,
    //     headers: { "Authorization": `Bearer ${"BQBgD0TdngrjXtQkRZL7I19mFUF51B9MU0EfrrqVlvb0x03b_HgpzHVCT0iCZlOMKWP_7xd7mbiCxntEs5ZlmLSlSym7JmdhRWdpPekhgYoRhMH_Uw8CEIlpDRZtiLXF02ROJeZnp_Z-JVGQNpBd-Xzk8t10lDQ-Hp4qWGei_CuOTkJ7qNj_LuG7ToINzNtP2ab9QA"}`},



    // }).then(function (response) {
    //     console.log(response)
    //     $("#playlist-text").empty()
      


    //     if((restCategory < 1) || (locationInput < 1) ||(response.playlists.length<1)){
    //         $("#restaurants-text").html(`<h2 class="wrong-input">**You Must Fill Out Valid Fields**</h2>`)
    //         $("#playlist-text").html(`<h2 class="wrong-input">**We Could Not Find A Playlist**</h2>`)
    //         return;
    //     }
     
    //     else {
    //     let playListDiv = $(`<div class="shadow jumbotron bg-white rounded new-playlist animated fadeInDownBig" style="margin:25px">`);
      

    //     let playListTitle = $(`<h2 style="margin-bottom:55px">`)
    //     playListTitle.html(`Here Is Your Playlist!`)
    //     console.log(response.playlists.items[0].external_urls.spotify)
        

    //     let playListPlayer = $(`<iframe width="100%" height="400" frameborder="5" allowtransparency="true" allow="encrypted-media">`)
    //     playListPlayer.addClass("player")
    //     playListSrc = response.playlists.items[0].external_urls.spotify
       
    //     let sliced = playListSrc.split("/").pop();

    //     playListPlayer.attr("src",`https://open.spotify.com/embed/playlist/${sliced}`)
        
      
    //     playListDiv.append(playListTitle)
    //     playListDiv.append(playListPlayer)
      
    //     $("#playlist-holder").html(playListDiv)

    //     // let playListImg = $("<img>")
    //     // playListImg.attr("src", response.playlists.items[0].images[0].url)
    //     // playListImg.addClass("img-fluid rounded newImg")
    //     // playListDiv.append(playListLink)
    //     }
    })

// })


        // testing token gain
    // let clientID = "1bba61329aa440ab915d8a99af8525c2"
    // let secretID = "9a028d6b6d004deaa9f524eb00d151a2"
    // $.ajax({
    //     method: "GET",
    //     url: "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize",
    //     data: {
    //                 "grant_type":    "authorization_code",
    //                 "code":          "/authorize endpoint",
    //                 "redirect_uri":  "https://developer.spotify.com/documentation/general/guides/authorization-guide/",
    //                 "client_secret": secretID,
    //                 "client_id":     clientID,
    //                 "Authorization": `Basic base64 encoded ${clientID}:${secretID}`
    //               },
    
    // }).then(function(res) {
    //      token = (res.access_token);


    // })
