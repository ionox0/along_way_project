var placesServices;
var minRating = 1;
var place = document.getElementById('place').value;
var yelp_key = 'vhGs7ntrDsYquBIwzmouag';
var yelpURL = "http://api.yelp.com/business_review_search?callback=?";

function findPlaces(boxes, searchIndex) {
  placesServices = new google.maps.places.PlacesService(map);
  var request = {
    bounds: boxes[searchIndex],
    keyword: place
  }
  placesServices.radarSearch(request, function (results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Request["+searchIndex+"] failed: "+status);
        return;
    }
    for (var i = 0; i < results.length; i++) {
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

  var yelp_params = {
        // "term": "pizza",
        "location": encodeURI(address),
        // "ywsid": yelp_key
        "term": "pizza",
        "radius": .5,
        "limit": 50,
        "ywsid": yelp_key
      }

  $.getJSON(yelpURL, yelp_params, function(results) {  //call the Yelp API -'results' again is a problem?
    var locs = results.businesses;
    if (locs[0].avg_rating > 1){
      var marker = createMarker(result);
      markers.push(marker);
    }
  })
}
