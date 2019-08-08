let shortcut = ""
let queryURL = ""
let queryParams = ""

let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"


function buildQueryUrl () {

queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
queryParams = {}
queryParams.term = "restaurants"
queryParams.location = 'Berkeley'
// queryParams.latitude = '37.871593' *WILL USE GOOGLE API FOR LOCATION*
// queryParams.longitude ='-122.272743'*WILL USE GOOGLE API FOR LOCATION*
queryParams.categories = $("#rest-input").val().trim()
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

    shortcut = response.businesses
    
    for (let i = 0; i < shortcut.length; i++){
        console.log(shortcut[i].name)
        console.log(shortcut[i].categories[0].title)

        let imgURL = shortcut[i].image_url

        let restDiv = $(`<div class="shadow p-3 mb-5 jumbotron bg-white rounded rest-image" style="margin:25px">`)
        let restTitle = $(`<h2>${shortcut[i].name}</h2>`)
        restDiv.append(restTitle)
        let restImg = $("<img>")
        restImg.attr("src", imgURL)
        restImg.addClass("img-fluid rounded")
        restDiv.append(restImg)
    
        $("#rest-holder").append(restDiv)
         
    }
  
    
})

    
})

