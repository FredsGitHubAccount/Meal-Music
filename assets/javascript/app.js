let apiKEY = "Bearer lhxtMMrJKWK0-jlsuWz-Nr_TLtpMP00yllbOkFIDCP3GE9RQpZ0i9DBLzwNhvI5jsRPTZcQzoKAgoXiQbk1RkN_nokEXjigC5mozh90EGcO6217_NOGZtSxpm_hIXXYx"

function buildQueryUrl () {

let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
let queryParams = {}
queryParams.term = "restaurants"
queryParams.location = 'Berkeley'
return queryURL + $.param(queryParams) 

}

console.log(buildQueryUrl())

let completeURL = buildQueryUrl()

$.ajax({
    
    url: completeURL,
    headers: {"Authorization": apiKEY},
 
   
}).then(function(response){

    let shortcut = response.businesses
    
    for (let i = 0; i < shortcut.length; i++){
        console.log(shortcut[i].name)
     
        for(let j = 0; j<shortcut[i].categories.length;j++){
            console.log(shortcut[i].categories[j].title)
            console.log(shortcut[i].categories[j].alias)
        }
    }
    
})

