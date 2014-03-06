var placesServices;
var minRating = 1;
var markers = [];

function findPlaces(boxes, searchIndex) {

  var place = document.getElementById('place').value;

  placesServices = new google.maps.places.PlacesService(map);
  var yelp_key = 'vhGs7ntrDsYquBIwzmouag';
  //var yelp_key = 'iWptnI0ceS0oW8qboR1XGg';
  var yelpURL = "http://api.yelp.com/business_review_search?callback=?";

  var request = {
    bounds: boxes[searchIndex],
    keyword: place
  }

  var googlePlacesReferences = [];
  var placesAddresses = [];
  var address;

  placesServices.radarSearch(request, function (googleResults, status) {

    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Request["+searchIndex+"] failed: "+status);
        return;
    }

    for (var i = 0; i < googleResults.length; i++) {

      googlePlacesReferences.push(googleResults[i].reference)

    }

    var request =  {
        reference: result.reference
    };

    placesServices.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            placesAddresses.push(place.formatted_address);
            address = place.formatted_address;
            //console.log(placesAddresses);
        }else {
            var contentStr = "<h5>No Result, status="+status+"</h5>";
            infowindow.setContent(contentStr);
        }
    });
    setTimeout(function(){console.log(placesAddresses)},5000);



    // console.log(placesServices.getDetails());

    var yelp_params = {
        // "term": "pizza",
        "location": encodeURI(address),
        // "ywsid": yelp_key
        "term": "pizza",
        "radius": .5,
        "limit": 50,
        "ywsid": yelp_key
    }

    $.getJSON(yelpURL, yelp_params, function(yelpResults) {  //call the Yelp API -'results' again is a problem?
        console.log(i + " " + yelpResults.businesses[0]);
        console.log(yelpResults.businesses[0].avg_rating);
        var locs = yelpResults.businesses;
        if (locs.businesses[0].avg_rating > 1){
            var marker = createMarker(result);
            markers.push(marker);
        }
    })

    searchIndex++;
    if (searchIndex < boxes.length){
      findPlaces(boxes,searchIndex);
    }

  });

  console.log(placesAddresses);

}

