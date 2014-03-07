var placesServices;
var allPlaces = [];

function findPlaces(boxes, searchIndex) {
    placesServices = new google.maps.places.PlacesService(map);
    var nowOpen = document.getElementById('checkbox1').value ;
    var maxPrice = document.getElementById('max-price').value || 4;
    var place = document.getElementById('place').value;
    var request = {
        bounds: boxes[searchIndex],
        keyword: place,
        maxPriceLevel: maxPrice,
        openNow: nowOpen
    };
    placesServices.radarSearch(request, function (results, status) {
      //console.log(results);
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Request[" + searchIndex + "] failed: " + status);
        }else{
          for (var i = 0, result; result = results[i]; i++) {
            //console.log("boxes " + searchIndex + ", result: " + i + " " + result);
            //console.log(result);
            allPlaces.push(result);
            //createMarker(result);
          }
        }
        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes, searchIndex);
    });
    //getRating(allPlaces, 0);
}


function getRating(places, index){
  var place = places[index];
  var request = {
    reference: place.reference
  };

  placesServices.getDetails(request, function(place, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Request[" + searchIndex + "] failed: " + status);
    }else{
      //console.log(place.name);
      var address = place.formatted_address;
      var name = place.name;
      var yelp_key = "vhGs7ntrDsYquBIwzmouag";
      var yelpURL = "http://api.yelp.com/business_review_search?callback=?";
      var yelp_params = {
          "location": address,
          "id": name,
          "ywsid": yelp_key
      };
      //console.log(yelp_params);
      $.getJSON(yelpURL, yelp_params, function(results) {
        //console.log(results.name);
        if (results.businesses[0].avg_rating > 4){        //set to a slider value
          //console.log(results.businesses[0].avg_rating);
          createMarker(place);
        }
      });
    }
  });
  index++;
  if (index < places.length){
    getRating(places, index)
  }
}

//move findPlaces2 back to desktop dude
