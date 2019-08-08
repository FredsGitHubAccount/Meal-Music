// Yelp Api-Key
let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"

// Constructs yelp URL based on location & categories
function buildQueryUrl () {

let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
let queryParams = {}
queryParams.term = "restaurants"
queryParams.location = 'berkeley'
// queryParams.latitude = '37.871593' *WILL USE GOOGLE API FOR LOCATION*
// queryParams.longitude ='-122.272743'*WILL USE GOOGLE API FOR LOCATION*
queryParams.categories= $("#rest-input").val().trim()
queryParams.limit = 3
return queryURL + $.param(queryParams) 

}

$("#rest-search").on("click",function(event){

    $("#rest-holder").empty()
    
    event.preventDefault()
    let completeURL = buildQueryUrl()
    console.log(buildQueryUrl())

$.ajax({
    
    url: completeURL,
    headers: {"Authorization": apiKEY},
 
   
}).then(function(response){

    $("#rest-input").val("")
 
    let shortcut = response.businesses
    $("#restaurants-text").empty()
   
    for (let i = 0; i < shortcut.length; i++){
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

