var placesServices;
var minRating = 1;
var place = document.getElementById('place').value;
var yelp_key = 'vhGs7ntrDsYquBIwzmouag';
var yelpURL = "http://api.yelp.com/business_review_search?callback=?";
var places = [];

function findPlaces(boxes, searchIndex) {
<<<<<<< HEAD
    placesServices = new google.maps.places.PlacesService(map);
    var request = {
        bounds: boxes[searchIndex],
        types: ['gas_station'],
    //keyword: place
}
placesServices.radarSearch(request, function (results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Request["+searchIndex+"] failed: "+status);
        return;
    }
    for (var i = 0; i < results.length; i++) {
        places.push(results[i]);
        getDeets(results[i]);
    }
    searchIndex++;
    if (searchIndex < boxes.length){
      findPlaces(boxes,searchIndex);
  }
});
}

function getDeets(business){
  var request =  {
    reference: business.reference
};
placesServices.getDetails(request, function(result, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      getRating(result.formatted_address);
  }else {
      var contentStr = "<h5>No Result, status="+status+"</h5>";
      infowindow.setContent(contentStr);
  }
});
}

function getRating(address){
    console.log("asdf");
    var yelp_params = {
        //"location": encodeURI(address),
        // "ywsid": yelp_key
        "lat": 40.729291,
        "long": -73.993671,
        "term": "pizza",
        "radius": .5,
        "limit": 50,
        "ywsid": yelp_key
    }
    $.getJSON(yelpURL, yelp_params, function(result) {
    console.log(result);  //call the Yelp API -'results' again is a problem?
    var locs = result.businesses;
    if (locs[0].avg_rating > 1){
      var marker = createMarker(result);
      markers.push(marker);
  }
})
}
=======
    var nowOpen = document.getElementById('checkbox1').value ;
    var maxPrice = document.getElementById('max-price').value || 4;
    var place = document.getElementById('place').value;
    placesServices = new google.maps.places.PlacesService(map);
    var request = {
        bounds: boxes[searchIndex],
        keyword: place,
        maxPriceLevel: maxPrice,
        openNow: nowOpen
    }
    placesServices.radarSearch(request, function (results, status) {

        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert("Request[" + searchIndex + "] failed: " + status);
            return;
        }
        for (var i = 0, result; result = results[i]; i++) {

            //if (result.rating != null){
            var marker = createMarker(result);

            markers.push(marker);
            //}
        }
        // console.log(placesServices.getDetails());

        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes, searchIndex);

    });
}
>>>>>>> 7b61b05c184df535d9377d820b8ee28a809ae46e
