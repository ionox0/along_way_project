var placesServices;

$("nav #filter").click(function() {
    $(".filterForm").addClass("shown");
});
             $("#hide").click(function() {
    $(".filterForm").removeClass("shown");
});


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
            console.log("boxes " + searchIndex + ", result: " + i + " " + result);
            //getRating(result);
            createMarker(result);
          }
        }
        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes, searchIndex);
    });
}

/*
function getRating(inputPlace){
  console.log(inputPlace);
  var place = inputPlace;
  var request = {
    reference: place.reference
  };

  placesServices.getDetails(request, function(place, status) {

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
      console.log(results);
      if (results.businesses[0].avg_rating > 4){        //set to a slider value
        createMarker(place);
      }
    });
  });
}
*/
