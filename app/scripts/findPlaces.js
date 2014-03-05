var placesServices;
var minRating = 1;
var markers = [];

function findPlaces(boxes, searchIndex) {

  var place = document.getElementById('place').value;
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
    for (var i = 0, result; result = results[i]; i++) {

      //if (result.rating != null){
        var marker = createMarker(result);

        markers.push(marker);
      //}
    }
    console.log(placesServices.getDetails());

    searchIndex++;
    if (searchIndex < boxes.length)
      findPlaces(boxes,searchIndex);

  });
}
